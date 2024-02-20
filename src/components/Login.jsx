import {useState, useContext, useRef} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import userServices from '../services/userServices';
import { LoginContext } from '../App';
import { BiError } from 'react-icons/bi';
import 'react-toastify/dist/ReactToastify.css';
import { FaLock } from 'react-icons/fa';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import OtpInput from 'react-otp-input';
import Meta from './Meta';
import { useSnackbar } from 'notistack';


const Login = () => {
	const {state} = useLocation();
	const redirectState = useRef(state);
    const navigate = useNavigate();
	const [initialLogin, setInitialLogin] = useState(redirectState?.current?.newRegisteredUser);
    const [data, setData] = useState({email:"", password:"", initial_code:""}); 
	const [err,seterr] = useState({hasError: false, message:""});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [wait, setWait] = useState(false);
	const [useOtp, setUseOtp] = useState(false);
	const [otp, setOtp] = useState('');
	const [forgotOtp, setForgotOtp] = useState("")
    const {loggerData, setLoggerData} = useContext(LoginContext);
	const { enqueueSnackbar } = useSnackbar();
	const [resend, setResend] = useState(false);
	const [forgot, setForgot] = useState(false);
	const [pwdWrng,setPwdWrng]=useState(false);
	const [forgotData, setForgotData] = useState({new_password:"", confirm_password:"", email:""});

	const handleForgotPassowordWithOTP = async (e) => {
		try {
			e.preventDefault();
			if(!forgotOtp){
				if(resend){
					return seterr({hasError:true, message:"Please provide the OTP. That was sent to your registered email."});
				} else {
					return seterr({hasError:true, message:"Please click the OTP button to begin resetting your password."});
				}
			} 
			if(!forgotData?.email){
				return seterr({hasError:true, message:"Email is required."});
			}
			if(!forgotData?.new_password || !forgotData?.confirm_password){
				return seterr({hasError:true, message:"Passwords cannot be empty."});
			} 
			if( forgotData?.new_password !== forgotData?.confirm_password){
				seterr({hasError:true, message:"Passwords do not match"});
				setPwdWrng(true);
				return;
			}
			const result = await userServices.handleChangePassword({...forgotData, otp:forgotOtp});
			if(result?.status === 200){
				enqueueSnackbar('Passwords have been reset successfully. Please login using the updated passwords now.', { variant:"customSuccess" });
				setForgot(false);
				setResend(false);
				seterr("");
			}
		} catch (error) {
			console.log(error);
			if(error?.response?.status === 403){
				seterr({hasError:true, message:error?.response?.data?.message});
			}
		}
	}

	
	const handleForgotPassoword = async () => {
		// check if email is valid
		try {
			if(!data?.email){
				throw new Error('Email is Required');
			} else {
				// call the backend 
				const result = await userServices.handleForgotPassoword(data?.email);
				if(result?.status === 200) {
					enqueueSnackbar('Email Sent!', {
						autoHideDuration:2000,
						variant:'customSuccess',
						
					});
				}
			}

		} catch (error) {
			console.log(error);
			setWait(false);
			enqueueSnackbar(error?.response?.data?.message, {
				autoHideDuration:2000,
				variant:'customError',
			});
		}
	}

	async function getOTP() {
		try {
			seterr({hasError:false, message:""})
			if(!data?.email){
				return seterr({hasError:true, message:"Please enter your email."})
			}
			setWait(true);
			const result = await userServices.getOTP(data?.email);
			if(result?.status === 200){
				setWait(false);
				setResend(true);
				enqueueSnackbar('OTP Sent on mail!', {
					autoHideDuration:2000,
					variant:'customSuccess',
					
				});
			}
		} catch (error) {
			setWait(false);
			enqueueSnackbar(error?.response?.data?.message, {
				autoHideDuration:3000,
				variant:'customError',
				
			});
			console.log('Some Error Occurred', error.message);
		}
	}
	async function getForgotOTP() {
		try {
			if(!forgotData?.email){
				throw new Error('Email is Required');
			}
			setWait(true);
			const result = await userServices.handleForgotPassoword(forgotData?.email);
			if(result?.status === 200){
				setWait(false);
				setResend(true);
				enqueueSnackbar('OTP Sent on email! Please check your email to get the OTP for resetting the password.', {
					autoHideDuration:2000,
					variant:'customSuccess',
					
				});
			}
		} catch (error) {
			setWait(false);
			enqueueSnackbar(error?.response?.data?.message, {
				autoHideDuration:3000,
				variant:'customError',
				
			});
			console.log('Some Error Occurred', error.message);
		}
	}

	/**
	 * Login Using OTP Start
	 */
	async function loginWithOTP(e) {
		try {
			e.preventDefault();
			if(!otp){
				return seterr({hasError:true, message:"Please enter the OTP."});
			} else {
				const userData = JSON.parse(sessionStorage.getItem('userData'));
				const template_id = sessionStorage.getItem('template_id');
				const log_result = await userServices.loginWithOTP({ email:data?.email, otp, userData:userData, template_id:template_id});
				sessionStorage.removeItem('userData');
				sessionStorage.removeItem('template_id');
				if(log_result.status === 200){
					if(redirectState.current?.draft_data){
						const draft_result = await userServices.saveToDrafts(log_result?.data?.user_id, log_result?.data?.email, log_result?.data?.access_token, redirectState.current.template_id, redirectState.current.cta_data, redirectState.current.draft_data, redirectState.current?.userData );
						if(draft_result?.status === 201){
							setLoggerData(prev => ({...prev, userData:log_result?.data?.userData, template_id:log_result?.data?.template_id, username:log_result?.data?.username, email:log_result?.data?.email, access_token:log_result?.data?.access_token, user_id:log_result?.data?.user_id, isLoggedIn:true, newUser:log_result?.data?.newUser}));
							
							enqueueSnackbar('Logged In!', {
								autoHideDuration:2000,
								variant:'customSuccess',
								
							});
							setTimeout(()=>{
								navigate('/drafts');
							},1000);
						}
					}
					if(redirectState.current?.redirectToCreate|| sessionStorage.getItem("gotofinish") === "true"){
						sessionStorage.removeItem("gotofinish")
						setLoggerData(prev => ({...prev, userData:log_result?.data?.userData, template_id:log_result?.data?.template_id, username:log_result?.data?.username, email:log_result?.data?.email, access_token:log_result?.data?.access_token, user_id:log_result?.data?.user_id, isLoggedIn:true, newUser:log_result?.data?.newUser}));
						enqueueSnackbar('Logged In!', {
							autoHideDuration:2000,
							variant:'customSuccess',
						});
						const node_text = sessionStorage.getItem("template_data");
						sessionStorage.removeItem("template_data");
						setTimeout(()=>{
							navigate('/finish', {state:{tabber:'filter-cta', template_data:node_text}});
						},1000)
						
					} else if (redirectState.current?.backToEditing){
						setLoggerData(prev => ({...prev, userData:log_result?.data?.userData, template_id:log_result?.data?.template_id, username:log_result?.data?.username, email:log_result?.data?.email, access_token:log_result?.data?.access_token, user_id:log_result?.data?.user_id, isLoggedIn:true, newUser:log_result?.data?.newUser}));
						
						enqueueSnackbar('Logged In!', {
							autoHideDuration:2000,
							variant:'customSuccess',
						});
						setTimeout(()=>{
							navigate('/create', {state:{tabber:'filter-details'}});
						},1000);
					}
					 else {
						setLoggerData(prev => ({...prev, userData:log_result?.data?.userData, template_id:log_result?.data?.template_id, username:log_result?.data?.username, email:log_result?.data?.email, access_token:log_result?.data?.access_token, user_id:log_result?.data?.user_id, isLoggedIn:true, newUser:log_result?.data?.newUser}));
						enqueueSnackbar('Logged In!', {
							autoHideDuration:2000,
							variant:'customSuccess',
							
						});
						setTimeout(()=>{
							navigate('/');
						},1000)
					}
				}
			}
		} catch (error) {
			enqueueSnackbar(error?.response?.data?.message, {
				autoHideDuration:2000,
				variant:'customError',
				
			});
		}
	}

	async function handleUseOTP(e) {
		seterr({hasError:false, message:""});
		if(e.button === 0 || e.button === 1){
			setUseOtp(true);
		}
	}

	/**
	 * Login Using Password Start
	 */

	async function handleSubmit(e) {
        try {
			e.preventDefault();
			setLoading(true);
			seterr(prev => ({message:"",hasError:false}));
			let userData;
			let template_id;
			let node_text;
			if(sessionStorage.getItem("userData")){
				userData = JSON.parse(sessionStorage.getItem('userData'));
				sessionStorage.removeItem('userData');
			} else {
				userData = state?.modifiedUserData;
			}

			if(sessionStorage.getItem('template_id')){
				template_id = sessionStorage.getItem('template_id');		
				sessionStorage.removeItem('template_id');
			} else {
				template_id = state?.template_id;
			}

			const log_result = await userServices.login({...data, userData:userData, template_id:template_id});
			console.log('BEFORE LOGIN', userData);
			if(log_result?.data?.success === true && log_result?.status === 200){
				// if draft_data present save to drafts
				if(redirectState?.current?.draft_data){
					const draft_result = await userServices.saveToDrafts(log_result?.data?.user_id, log_result?.data?.email, log_result?.data?.access_token, redirectState.current.template_id, redirectState.current.cta_data, redirectState.current.draft_data, redirectState.current?.userData );
					if(draft_result?.status === 201){
						setLoggerData(prev => ({...prev, userData:log_result?.data?.userData, template_id:log_result?.data?.template_id, username:log_result?.data?.username, email:log_result?.data?.email, access_token:log_result?.data?.access_token, user_id:log_result?.data?.user_id, isLoggedIn:true, newUser:log_result?.data?.newUser}));
						enqueueSnackbar('Logged In!', {
							autoHideDuration:2000,
							variant:'customSuccess',
							
						});
						setTimeout(()=>{
							navigate('/drafts');
						},1000);
					}
				}
				else if(redirectState.current?.redirectToCreate || sessionStorage.getItem("gotofinish") === "true"){
					setLoggerData(prev => ({...prev, userData:log_result?.data?.userData, template_id:log_result?.data?.template_id, username:log_result?.data?.username, email:log_result?.data?.email, access_token:log_result?.data?.access_token, user_id:log_result?.data?.user_id, isLoggedIn:true, newUser:log_result?.data?.newUser}));
					sessionStorage.removeItem("gotofinish");
					enqueueSnackbar('Logged In!', {
						autoHideDuration:2000,
						variant:'customSuccess',
					});
					
					if(sessionStorage.getItem("template_data")){
						node_text = sessionStorage.getItem("template_data");
						sessionStorage.removeItem("template_data");
					} else {
						node_text = state?.template_data;
					}
					
					setTimeout(()=>{
						navigate('/finish', {state:{tabber:'filter-cta', template_data:node_text, userData:userData, template_id:template_id }});
					},1000);
				} else if (redirectState.current?.backToEditing){
					setLoggerData(prev => ({...prev, userData:log_result?.data?.userData, template_id:log_result?.data?.template_id, username:log_result?.data?.username, email:log_result?.data?.email, access_token:log_result?.data?.access_token, user_id:log_result?.data?.user_id, isLoggedIn:true, newUser:log_result?.data?.newUser}));
					
					enqueueSnackbar('Logged In!', {
						autoHideDuration:2000,
						variant:'customSuccess',
					});
					setTimeout(()=>{
						navigate('/create', {state:{tabber:'filter-details'}});
					},1000);
				}
				else{
					setLoggerData(prev => ({...prev, userData:log_result?.data?.userData, template_id:log_result?.data?.template_id, username:log_result?.data?.username, email:log_result?.data?.email, access_token:log_result?.data?.access_token, user_id:log_result?.data?.user_id, isLoggedIn:true, newUser:log_result?.data?.newUser}));
					
					enqueueSnackbar('Logged In!', {
						autoHideDuration:2000,
						variant:'customSuccess',
						
					});

					setTimeout(()=>{
						navigate('/');
					},1000);
				}
			}
		} catch (error) {
			console.log('Some error occurred.',error.message);
			setLoading(false);
			if(error?.response?.status === 403){
				seterr({hasError:true, message:error?.response?.data?.message});
				if(error?.response?.data?.verificationPending){
					setInitialLogin(true);
				}
			}
			else if(error?.response?.status === 400){
				seterr({hasError:true, message:error?.response?.data?.message});
			} else {
				seterr({hasError:true, message:'Some Error Occurred'});
			}
		}
    }

	/**
	 * Login Using Handle Login Ends
	 */

  return (
    <>
	<Meta 
		title="Login | Email Signatures"
		desc=""
		keywords=""
	/>
	<section className="login-wr clearfix">
		<div className="login-side-blk left">
			<div className="login-side-logo">
				<figure>
					<Link to="/">
						<img className="img-generic" src={loggerData?.layout_data?.logo ? loggerData?.layout_data?.logo : "/assets/images/Email_Sign_Logo.svg"} alt="Email Signature Logo"/>
					</Link>
				</figure>
			</div>
			<div className="e-sign-comn-box e-sign-first-box">
				<Link data-tagname="anchor" to='/signature-templates'>
					<div className="banner-img-icon">
						<img className="img-generic" src="/assets/images/35000_Template_Icon.svg" alt="35000 Template Icon"/> 
					</div>
					<div className="banner-img-text">
						<h5>Professional Templates</h5>
						<p className='para'>Check Now</p>
					</div>
				</Link>
			</div>
			<div className="e-sign-comn-box e-sign-second-box banner-img-second">
			<Link to="/" state={{scrollToTestimonial:true}}>
					<div className="banner-img-icon">
						<img className="img-generic" src="/assets/images/Highly_Rated_Icon.svg" alt="Highly Rated Icon"/> 
					</div>
					<div className="banner-img-text">
						<h5>Highly Rated</h5>
						<img className="img-generic" src="/assets/images/Review_Star.svg" alt="Review Star"/>
					</div>
				</Link>
			</div>
		</div>
		<div className="login-form-blk right">
			<div className="center-wr">
				<div className="login-form-con">
					<div className="login-heading">
						<h3>{forgot ? 'Reset Password':'Login'}</h3>
						{
							forgot && 
							<div style={{backgroundColor:'#FDF0F0',borderRadius:'10px', padding:'10px', display:'flex', alignItems:'start',justifyContent:'start', marginTop:'20px'}}>
								<p>We will send you an <strong>OTP</strong> on your registered email. Use that OTP to reset your password.</p>
							</div>
						}
					</div>
					{useOtp ?
						<div className="login-form">
							{err.hasError && 
								<div className="warning flex-center-center">
								<BiError/>
								<div style={{fontSize:'16px', color:"#CD1818", fontWeight:'500'}}>{err.message}</div>
								</div>
							}
							<form onSubmit={loginWithOTP}>
								<div className="login-form-username form-field">
									<label className="fieldset">Registered Email</label>
									<input maxLength={50} value={data?.email || ""} style={{color:'black'}} onChange={(e)=>{setData(prev=>({...prev, email:e.target.value})); seterr({hasError:false, message:""})}} type="text" name="username" placeholder="Enter your email"/>
									<button type='button' className='opt-button' onClick={getOTP}>{wait ? 
										'Please Wait...': resend ? 'Resend':'Get OTP'}</button>
								</div>
								<div className="opt-input-container">
									<OtpInput
										value={otp}
										onChange={setOtp}
										numInputs={5}
										inputType='text'
										containerStyle={{display:'flex', justifyContent:'center'}}
										inputStyle={'otp-input-field'}
										renderSeparator={<span style={{margin:'0px 10px'}}>°</span>}
										renderInput={(props) => <input {...props} />}
									/>
								</div>
								
								<div className="login-form-submit-btn">
									<input type="submit" name="submit-btn" value={isLoading ? 'Logging In...':'Login'} />
								</div>
							</form>
							<div className="seperate-or">
								<p className='para'>Or</p>
							</div>
							<div onMouseDown={(e)=>{ if(e.button === 0 || e.button === 1) { setUseOtp(false); seterr({hasError:false, message:""}); }}} className='login-with-otp' style={{justifyContent:'center', display:'flex'}}>
								<FaLock className='opt-lock-icon'/>
								<span>Login Using Password</span>
							</div>
							<div className="new-user-register">
								<p className='para'>New User? <Link to={{pathname:"/register", state:redirectState.current}}>Register Here</Link></p>
							</div>
						</div>
							:
						forgot ? 
						<div className="login-form">
							{err.hasError && 
								<div className="warning flex-center-center">
									<BiError/>
									<div style={{fontSize:'16px', color:"#CD1818", fontWeight:'500'}}>{err.message}</div>
								</div>
							}
							<form onSubmit={handleForgotPassowordWithOTP}>
								<div className="login-form-username form-field">
									<label className="fieldset">Registered Email</label>
									<input maxLength={50} value={forgotData?.email} style={{color:'black'}} onChange={(e)=>{setForgotData(prev=>({...prev, email:e.target.value})); seterr({hasError:false, message:""}); }} type="text" name="username" placeholder="Enter your email"/>
									<button type='button' className='opt-button' onClick={getForgotOTP}>{wait ? 
										'Please Wait...': resend ? 'Resend':'Get OTP'}</button>
								</div>
								<div className="opt-input-container">
									<OtpInput
										value={forgotOtp}
										onChange={setForgotOtp}
										numInputs={5}
										inputType='text'
										containerStyle={{display:'flex', justifyContent:'center'}}
										inputStyle={'otp-input-field'}
										renderSeparator={<span style={{margin:'0px 10px'}}>°</span>}
										renderInput={(props) => <input {...props} />}
									/>
								</div>
								<div className="login-form-password form-field">
									<div className='password-eye' onClick={()=>{setShowPassword(prev => !prev)}} style={{fontSize:'22px', color:"#949494"}} >{showPassword ? <AiOutlineEyeInvisible />:<AiOutlineEye />}</div>
									<label className="fieldset">New Password</label>
									<input autoComplete='new-password' maxLength={50} value={forgotData?.new_password || ""} style={{color:'black'}} onChange={(e)=>{setForgotData(prev=>({...prev, new_password:e.target.value}))}} type={showPassword ? "text":"password"} name="login-password" placeholder="Password should be 8 characters"/>
								</div>
								<div className="login-form-password form-field">
									<label className="fieldset">Confirm Password</label>
									<input autoComplete='confirm-new-password' maxLength={50} value={forgotData?.confirm_password || ""} style={{color:'black'}} onChange={(e)=>{setForgotData(prev=>({...prev, confirm_password:e.target.value}))}} type={showPassword ? "text":"password"} name="login-password" placeholder="Password should be 8 characters"/>
								</div>
								<p style={{marginTop:'10px', color:pwdWrng?'#D83F31':"#808080", textAlign:'left', fontSize:pwdWrng?'14px':'12px', fontWeight:'normal'}}>NOTE: The password must be atleast 8 characters long. It must have atleast one special character, atleast one lowercase and uppercase letter, and atleast one digit.</p>
								<div className="login-form-submit-btn">
									<input type="submit" name="submit-btn" value={isLoading ? 'Logging In...':'Login'} />
								</div>
							</form>
							<div className="seperate-or">
								<p className='para'>Or</p>
							</div>
							<div onMouseDown={(e)=>{if(e.button === 0 || e.button === 1) setForgot(false)}} className='login-with-otp' style={{justifyContent:'center', display:'flex'}}>
								<FaLock className='opt-lock-icon'/>
								<span>Continue With Password</span>
							</div>
							<div className="new-user-register">
								<p className='para'>New User? <Link to={{pathname:"/register", state:redirectState.current}} >Register Here</Link></p>
							</div>
						</div>
						:
						<div className="login-form">
							{err.hasError && 
								<div className="warning flex-center-center">
								<BiError/>
								<div style={{fontSize:'16px', color:"#CD1818", fontWeight:'500'}}>{err.message}</div>
								</div>
							}
							
							<form onSubmit={handleSubmit}>
								<div className="login-form-username form-field">
									<label className="fieldset">Email</label>
									<input maxLength={50} value={data?.email || ""} style={{color:'black'}} onChange={(e)=>{setData(prev=>({...prev, email:e.target.value})); seterr({hasError:false, message:""}) }} type="text" name="username" placeholder="Enter your email"/>
								</div>
								<div className="login-form-password form-field">
									<div className='password-eye' onClick={()=>{setShowPassword(prev => !prev)}} style={{fontSize:'22px', color:"#949494"}} >{showPassword ? <AiOutlineEyeInvisible />:<AiOutlineEye />}</div>
									<label className="fieldset">Password</label>
									<input maxLength={50} value={data?.password || ""} style={{color:'black'}} onChange={(e)=>{setData(prev=>({...prev, password:e.target.value})); seterr({hasError:false, message:""});}} type={showPassword ? "text":"password"} name="login-password" placeholder="Password should be 8 characters"/>
								</div>
								
								<div className="forgot-password-btn" style={{cursor:"pointer"}} onMouseDown={(e)=>{if(e.button === 0 || e.button === 1) setForgot(true)}}>
									<span>Forgot Password?</span>
								</div>
								<div className="login-form-submit-btn">
									<input type="submit" name="submit-btn" value={isLoading ? 'Logging In...':'Login'} />
								</div>
							</form>
							<div className="seperate-or">
								<p className='para'>Or</p>
							</div>
							<div onMouseDown={handleUseOTP} className='login-with-otp' style={{justifyContent:'center', display:'flex'}}>
								<FaLock className='opt-lock-icon'/>
								<span>Login Using OTP</span>
							</div>
							<div className="new-user-register">
								<p className='para'>New User? <Link to="/register" state={redirectState.current}>Register Here</Link></p>
							</div>
						</div>
					}
				</div>
			</div>
			<div className="banner-outer-box">
			<Link data-tagname="anchor" to='/signature-templates'>
					<div className="banner-img-icon e-sign-comn-box">
						<img className="img-generic" src="/assets/images/login-outer-box-icon.svg" alt="150 Business Icon"/>
					</div>
					<div id='banner-img-txt' className="banner-img-text">
						<h5>Device Compatibility</h5>
						<p className='para'>Check Categories</p>
					</div>
				</Link>
			</div>
		</div>
	</section>
    </>
  )
}

export default Login
import { Link } from "react-router-dom";
import { useState, useContext, useRef } from 'react';
import userServices from "../services/userServices";
import { BiError } from 'react-icons/bi';
import { FcApproval } from 'react-icons/fc';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../App";
import { useSnackbar } from 'notistack';
import Meta from "./Meta";
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import OTPInput from "react-otp-input";
import { ColorRing } from "react-loader-spinner";
import lodash from "lodash";

const Register = () => {

	const { state } = useLocation();
	const redirectState = useRef(state);
	const [emailVerified, setEmailVerified] = useState(false);
	const [verificationOTPSent, setVerificationOTPSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { loggerData } = useContext(LoginContext);
	const [registerDetails, setRegisterDetails] = useState({});
	const [err, seterr] = useState('');
	const [success, setSuccess] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const [showPassword, setShowPassword] = useState(false);
	const [pwdWrng, setPwdWrng] = useState(false);
	const [wait, setWait] = useState(false);
	const [isDisabled, setDisabled] = useState(false);
    const [timer, setTimer] = useState(60); // 60 seconds
	const [showResetPasswordButton, setShowResetPasswordButton] = useState(false);

	const handleOTPInput = (val) => {
		setRegisterDetails(prev => ({ ...prev, initial_code: val }));
		if (val?.length === 5) {
			// call the OTP verification in backend wait for the result;
			verifyOTP(val);
		}
	}

	async function verifyOTP(otp) {
		try {
			console.log("Verify OTP Function called.");
			const result = await userServices.verifyOTP(registerDetails?.email, otp);
			console.log(result);
			if (result?.status === 200) {
				setEmailVerified(true);
				enqueueSnackbar("OTP Verification Successfull.", { variant: "customSuccess" });
				seterr("");
			}
		} catch (error) {
			console.log(error);
			seterr(error?.response?.data?.message);
		}
	}

	async function verifyEmailForRegistration(e) {
		try {
			setLoading(true);
			seterr("");
			const res = await userServices.verifyEmail(registerDetails?.email);
			if (res.status === 200) {
				enqueueSnackbar("OTP for email verification has been sent to your email address!", { variant: "customSuccess" });
				setVerificationOTPSent(true);
				setLoading(false);
				setDisabled(true);
                let interval = setInterval(() => {
                    setTimer(prev => {
                        if (prev <= 1) {
                            clearInterval(interval);
                            setDisabled(false);
                            return 60; // Reset to 60 seconds
                        }
                        return prev - 1;
                    });
                }, 1000);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
			if (error?.response?.status === 400 && error?.response?.data?.passwordNotSet) {
				setShowResetPasswordButton(true);
			}
			seterr(error?.response?.data?.message);
		}
	}

	async function handleRegister(e) {
		e.preventDefault();
		setLoading(true);
		seterr("");
		if (!registerDetails?.email || registerDetails?.email === "") {
			seterr('Email is Required');
			setLoading(false);
			return;
		}
		if (verificationOTPSent && !registerDetails?.initial_code) {
			setLoading(false);
			return seterr("Please Enter the verification OTP to continue registration.");
		} else if (!verificationOTPSent) {
			setLoading(false);
			return seterr("Please Verify your email to continue registration");
		}
		else if (!registerDetails?.password || registerDetails.password !== registerDetails.conf_password) {
			seterr('Passwords do not match');
			setPwdWrng(true);
			setLoading(false);
			return;
		}
		else if (registerDetails.password === registerDetails.conf_password) {
			try {
				const result = await userServices.register(registerDetails);
				if (result?.data?.success === true && result?.data?.message === "User Registered Successfully.") {

					seterr("");
					setSuccess(true);
					setLoading(false);
					console.log('Navigating to Login, Register done.', redirectState.current);
					enqueueSnackbar("Registered Successfully. Redirecting to Login Page...", { variant: "customSuccess" });
				}
			} catch (error) {
				if (error?.response?.status === 400) {
					setLoading(false);
					seterr(error?.response?.data?.message);
					if(error?.response?.data?.verify){
						setDisabled(false);
						setEmailVerified(false);
					}
				} else {
					setLoading(false);
					enqueueSnackbar('Failed to Register!', {
						autoHideDuration: 2000,
						variant: 'customError',

					});
				}
			}
		}
	}



	const debouncedVerificationEmail = lodash.debounce((e) => { verifyEmailForRegistration(e); }, 1000);

	return (
		<>
			<Meta
				title="Register | Email Signatures"
				desc=""
				keywords=""
			/>
			<section className="login-wr clearfix">
				<div className="login-side-blk left">
					<ToastContainer />
					<div className="login-side-logo">
						<figure>
							<Link to="/">
								<img className="img-generic" src={loggerData?.layout_data?.logo ? loggerData?.layout_data?.logo : "/assets/images/Email_Sign_Logo.svg"} alt="Email Signature Logo" />
							</Link>
						</figure>
					</div>
					<div className="e-sign-comn-box e-sign-first-box">
						<Link to="/signature-templates">
							<div className="banner-img-icon">
								<img className="img-generic" src="/assets/images/35000_Template_Icon.svg" alt="35000 Template Icon" />
							</div>
							<Link to={"/signature-templates"} id="professional-templates-id">
								<div className="banner-img-text">
									<h5>Professional Templates</h5>
									<p className='para'>Check Now</p>
								</div>
							</Link>
						</Link>
					</div>
					<div className="e-sign-comn-box e-sign-second-box banner-img-second">
						<Link to="/" state={{ scrollToTestimonial: true }}>
							<div className="banner-img-icon">
								<img className="img-generic" src="/assets/images/Highly_Rated_Icon.svg" alt="Highly Rated Icon" />
							</div>
							<div className="banner-img-text">
								<h5>Highly Rated</h5>
								<img className="img-generic" src="/assets/images/Review_Star.svg" alt="Review Star" />
							</div>
						</Link>
					</div>
				</div>
				<div className="login-form-blk right">
					<div className="center-wr">
						{!success ?
							<div className="login-form-con">
								<div className="login-heading">
									<h3>Register</h3>
								</div>
								<div className="login-form">
									{err &&
										<div className="warning flex-center-center">
											<BiError />
											<div style={{ fontSize: '16px', color: "#CD1818", fontWeight: '500' }}>{err}</div>
										</div>
									}
									{	
										<form onSubmit={(e) => { handleRegister(e) }}>
											<div style={{ display: "flex", alignItems: "center", justifyContent: "start", width: "100%" }}>
												<div className="login-form-username form-field" style={{ paddingBottom: "25px", width: "80%" }}>
													<label className="fieldset">Email</label>
													<input style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }} maxLength={50} required onChange={(e) => { setRegisterDetails(prev => ({ ...prev, email: e.target.value })); setVerificationOTPSent(false); setDisabled(false) }} type="text" name="register-name" placeholder="Enter your email" />
												</div>
												<button type="button" onClick={() => { if (!emailVerified) { debouncedVerificationEmail() } }} style={{ width: "20%", padding: "10px 5px", lineHeight: "32px", backgroundColor: emailVerified ? "#186F65" : "rgba(0,0,0,0.11)", color: emailVerified && 'white', borderTopRightRadius: "5px", borderBottomRightRadius: "5px", border: "none", outline: 'none', display: isDisabled === false ? "block" : emailVerified ? "block" : "none" }}>{emailVerified ? 'Verified' : 'Verify Email'}</button>
												{
													(verificationOTPSent && !emailVerified) &&
													<button type="button" onClick={() => {}} style={{ width: "20%", padding: "10px 5px", lineHeight: "32px", backgroundColor: emailVerified ? "#186F65" : "rgba(0,0,0,0.11)", color: emailVerified && 'white', borderTopRightRadius: "5px", borderBottomRightRadius: "5px", border: "none", outline: 'none', display: isDisabled === false ? "none" : "block" }}>
													{`00:${timer}`}
													</button>
												}
											</div>
											<div className="opt-input-container" style={{ marginTop: '25px', display: verificationOTPSent ? emailVerified ? "none" : "block" : "none" }}>
												<OTPInput
													value={registerDetails?.initial_code}
													onChange={handleOTPInput}
													numInputs={5}
													inputType="text"
													containerStyle={{ display: 'flex', justifyContent: 'center' }}
													inputStyle={'otp-input-field'}
													renderSeparator={<span style={{ margin: '0px 10px' }}>°</span>}
													renderInput={(props) => <input {...props} />}
												/>
											</div>
											<div className="login-form-password form-field">
												<div className='password-eye' onClick={() => { setShowPassword(prev => !prev) }} style={{ fontSize: '22px', color: "#949494" }} >{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</div>
												<label className="fieldset">Password</label>
												<input autoComplete="new-password" maxLength={50} required onChange={(e) => { setRegisterDetails(prev => ({ ...prev, password: e.target.value })) }} type={showPassword ? "text" : "password"} name="register-password" placeholder="Password should be 8 characters" />
											</div>
											<div className="login-form-password form-field">
												<label className="fieldset">Confirm Password</label>
												<input autoComplete="confirm-password" onPaste={(e) => { e.preventDefault(); }} maxLength={50} required onChange={(e) => { setRegisterDetails(prev => ({ ...prev, conf_password: e.target.value })) }} type={showPassword ? "text" : "password"} name="register-c-password" placeholder="Password should be 8 characters" />
											</div>
											<p style={{ marginTop: '10px', color: pwdWrng ? '#D83F31' : "#808080", textAlign: 'left', fontSize: pwdWrng ? '14px' : '12px', fontWeight: 'normal' }}>NOTE: The password must be atleast 8 characters long. It must have atleast one special character, atleast one lowercase and uppercase letter, and atleast one digit.</p>

											<div className="login-form-submit-btn">
												<button type="submit" name="submit-btn">{loading ?
													<ColorRing
														visible={true}
														height="50"
														width="50"
														ariaLabel="blocks-loading"
														wrapperStyle={{}}
														wrapperClass="blocks-wrapper"
														colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
													/>
													:
													"Register"
												}</button>
											</div>
										</form>
									}
									<div className="new-user-register">
										<p className='para'>Already a User? <Link to="/login" state={redirectState.current}>Login Here</Link></p>
									</div>
								</div>
							</div>
							:
							<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
								<div style={{ width: '40%', alignSelf: 'center' }}>
									<h2><span style={{ marginRight: '5px' }} ><FcApproval /></span>Registered Successfully!</h2>
									<h3>Let's dive right in <span style={{ color: '#6440FB' }}>Email Signatures</span></h3>
									<h2 onClick={() => { navigate('/login', { state: { ...redirectState.current, newRegisteredUser: true } }) }} style={{ marginTop: '30px' }} className="site-btn">Login</h2>
								</div>
							</div>
						}
					</div>
					<div className="banner-outer-box">
						<Link to={"/signature-templates"}>
							<div className="banner-img-icon e-sign-comn-box">
								<img className="img-generic" src="/assets/images/login-outer-box-icon.svg" alt="150 Business Icon" />
							</div>

							<div className="banner-img-text" id="banner-img-text">
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

export default Register
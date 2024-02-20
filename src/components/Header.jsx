import {useContext, useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { LoginContext } from '../App'
import { Dropdown } from 'antd'
import { AiOutlineUser, AiOutlineMenu, AiOutlineIdcard, AiOutlineCloseSquare, AiOutlineClose, AiOutlinePoweroff } from 'react-icons/ai'
import userServices from '../services/userServices'
import Drawer from 'rc-drawer'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import 'react-toastify/dist/ReactToastify.css';
import '../drawer.css'
import { useSnackbar } from 'notistack';
import {modifyUserCTA, modifyUserData} from "../utility/dataModify"


const 	Header = (props) => {

	const location  = useLocation();
	const [showBrowseTemplates, setShowBrowseTemplates] = useState(true);
	const [showProcedure, setShowProcedure] = useState(false);
	const [showSavedTemplates, setShowSavedTemplates] = useState(true);
	const [openDrawer, setOpenDrawer] = useState(false);
    const {loggerData, setLoggerData} = useContext(LoginContext);
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();


	const items = [
		{
		  key: '1',
		  label: (
			<div>{loggerData?.username}</div>
		  ),
		},
		{
		  key: '2',
		  danger: true,
		  label: <div onClick={handleLogout} >Logout</div>,
		},
	  ];

	function clearCookie(cookieName) {
		document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	}

	function handleLoginRedirect(e) {
		if(e.button===0||e.button===1){
			if(props?.source === "create"){
				const modifiedUserData = modifyUserData(props.userData, props.initialValues, props.socialChecker);
				const modifiedUserCTA = modifyUserCTA(props.userData, props.setCtaDisplay);
				navigate('/login', { state: { redirectToCreate: false, modifiedUserData:{...modifiedUserData, ...modifiedUserCTA}, template_id: props.template_id, template_data:props.template_data, backToEditing:true } }); 
			} else {
				navigate('/login');
			}
		}
	}

	useEffect(()=>{
		if(props.source === 'create'){
			setShowProcedure(true);
		} else if(props.source === 'drafts'){
			setShowSavedTemplates(true);
		}
	},[location.pathname])

	async function handleLogout() {
		try {
			await userServices.logout(loggerData?.email, loggerData?.access_token);
			clearCookie('access_token');
			setLoggerData(prev => ({...prev, access_token:"", email:"", username:"", user_id:"", isLoggedIn: false, userData:{}, template_id:"" }));
			enqueueSnackbar('Logged Out!', {
				autoHideDuration:2000,
				variant:'customSuccess',
				
			});
			navigate("/");
		} catch (error) {
			console.log('Some error occurred : \n:',error.message);
			clearCookie('access_token');
			setLoggerData(prev => ({...prev, access_token:"", email:"", username:"", user_id:"", isLoggedIn: false, userData:{}, template_id:"" }));
			enqueueSnackbar('Logged Out!', {
				autoHideDuration:2000,
				variant:'customSuccess',
				
			});
			navigate("/");
		}
	}

	
  return (
	<header id="es-header" className="header-wr">
		<div className="center-wr">
			<div className="header-content clearfix">
				<div className="header-logo left">
					<Link to="/">
						<img className="img-generic" src={loggerData?.layout_data?.logo ? loggerData?.layout_data?.logo : "/assets/images/Email_Sign_Logo.svg"} alt="Email Signature Logo"/>
					</Link>
				</div>
					<div className='mobile-menu' style={{position:'absolute', right:'10px'}}>
						<div onClick={()=>{setOpenDrawer(true)}}><AiOutlineMenu className='header-menu-icon'/></div>
					</div>
					<Drawer
						className='drawer-layout'
						open={openDrawer}
						width="100%"
						handler={false}
						level={null}
						autoFocus={false}
						showMask={true}
						maskClosable={true}
						onClose={() => setOpenDrawer(false)}
					>
						<dix className='drawer-layout-close' onClick={()=>{setOpenDrawer(false)}}><AiOutlineClose style={{fontSize:'22px'}}/></dix>
						<div className='drawer-layout-heading'>
							<Link to="/">
								<img width={'200px'} className="img-generic" src={loggerData?.layout_data?.logo ? loggerData?.layout_data?.logo : "assets/images/Email_Sign_Logo.svg"} alt="Email Signature Logo"/>
							</Link>
						</div>
						<Link to="/signature-templates" style={{width:'100%'}}><div className='drawer-layout-item'><span><AiOutlineIdcard style={{fontSize:'22px', color:"#9a78ff"}}/></span>Templates</div></Link>
						{/* <Link to="/procedure" style={{width:'100%'}}><div className='drawer-layout-item'><span><AiOutlineIdcard style={{fontSize:'22px', color:"#9a78ff"}}/></span>Steps To Add</div></Link> */}
						{
							loggerData?.isLoggedIn ? 
							<>
							<Link to="/drafts" style={{width:'100%'}}><div className='drawer-layout-item'><span><AiOutlineIdcard style={{fontSize:'22px', color:"#9a78ff"}}/></span>Drafts</div></Link>
							<div className='drawer-layout-item' onClick={handleLogout}><span><AiOutlineCloseSquare style={{fontSize:'22px', color:"#9a78ff"}}/></span>Logout</div>
							</>
							:
							<Link to="/login" style={{width:'100%'}}><div className='drawer-layout-item'><span><AiOutlineUser style={{fontSize:'22px', color:"#9a78ff"}}/></span>Log In</div></Link>
						}
					</Drawer>
				<div className="header-btn-blk right" style={{width:'60%'}}>
					{showBrowseTemplates &&
						<div className="header-browse-btn header-btn">
						<Link to="/signature-templates" className="sitee-btn" style={{borderBottom:location?.pathname?.startsWith("/signature-templates") && "2px solid white"}}>Browse Templates</Link>
					</div>}
					{/* <div className="header-browse-btn header-btn">
						<Link to="/procedure" className="sitee-btn" style={{borderBottom:location?.pathname?.startsWith("/procedure") && "2px solid white"}}>Steps To Add</Link>
					</div> */}
					
					<div  className="header-login-btn header-btn" style={{width:"30%"}}>
						{
                            loggerData.isLoggedIn ? 
                            <div className='logged-in flex-center-start' style={{gap:'25px', position:'relative'}}>
								{
									showSavedTemplates && (
										<div className='saved-templates-btn' style={{ width:'80%', display:'flex', alignItems:'center', gap:'10px', padding:'10px', cursor:'pointer',borderRadius:"5px", borderBottom:location?.pathname?.startsWith("/drafts") && "2px solid white"}} onClick={()=>{navigate('/drafts')}} >
											<div>Saved Templates</div>
										</div>
									)
								}
								{/* <div className='header-dektop-menu-button-inner'>
									<AiOutlineUser style={{fontSize:'18px'}}/>  
									<p>{loggerData?.username}</p>
								</div> */}
								<Dropdown
									arrow
									menu={{
										items,
									}}
								>
									<div className='header-dektop-menu-button-inner-two'>
										<AiOutlineUser style={{fontSize:'18px'}}/>  
									</div>
								</Dropdown>
								
                            </div>
                            :
                            <div className="site-btn lgn-btn" onMouseDown={handleLoginRedirect}>
							<span>
								<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g>
										<path d="M14.3096 22C14.2696 21.9252 14.1884 21.9372 14.1248 21.9175C13.7635 21.8058 13.4459 21.5844 13.2162 21.284C12.9865 20.9835 12.856 20.619 12.843 20.2411C12.8335 19.9763 12.8288 19.7106 12.843 19.4467C12.8507 19.2872 12.8086 19.2434 12.6444 19.2447C11.7417 19.2537 10.839 19.2498 9.93635 19.249C8.43188 19.249 7.34222 18.1576 7.33706 16.6514C7.33706 16.2433 7.33706 15.8353 7.33706 15.4272C7.33921 14.9729 7.6242 14.6586 8.02482 14.6629C8.42544 14.6672 8.70785 14.9866 8.71042 15.4367C8.71257 15.845 8.71042 16.2534 8.71042 16.6609C8.71515 17.3942 9.1897 17.87 9.91915 17.8718C10.8141 17.8739 11.709 17.867 12.6035 17.8769C12.7867 17.8769 12.8404 17.8425 12.84 17.6469C12.8334 13.0221 12.8308 8.3975 12.8322 3.7732C12.8322 2.9926 13.143 2.39554 13.8312 2.03275C14.261 1.80665 14.745 1.7108 15.2011 1.54617C15.3425 1.5029 15.479 1.44529 15.6086 1.37423H9.97375C9.17165 1.37423 8.71386 1.83416 8.71214 2.6397C8.71214 3.05493 8.71945 3.47059 8.70914 3.88625C8.70011 4.25979 8.45467 4.52715 8.10004 4.57831C7.79915 4.62129 7.4845 4.42657 7.37575 4.12568C7.36093 4.09335 7.35163 4.05877 7.34824 4.02337C7.3448 3.36571 7.26227 2.70073 7.38865 2.05295C7.59067 1.02132 8.23287 0.364945 9.2473 0.0756582C9.30275 0.0597539 9.38013 0.0756583 9.41022 -0.000854492H20.4104C20.4238 0.0124708 20.4362 0.0361121 20.4513 0.0378315C20.8811 0.0919922 21.2271 0.304767 21.5259 0.611678C21.7799 0.875604 21.8938 1.20917 22.0022 1.54617V18.6915C21.9446 18.7035 21.9562 18.7568 21.9454 18.7938C21.7481 19.4605 21.3157 19.8929 20.6559 20.11C19.6672 20.4354 18.6846 20.7689 17.6981 21.0965C16.7848 21.3997 15.8704 21.7005 14.9548 21.9991L14.3096 22ZM20.6258 10.076C20.6258 7.37604 20.6258 4.67631 20.6258 1.97687C20.6258 1.46449 20.3679 1.27837 19.8787 1.44128L14.6789 3.17657C14.2774 3.31069 14.2125 3.40095 14.2125 3.82951C14.2125 9.22151 14.2125 14.6138 14.2125 20.0064C14.2125 20.5269 14.479 20.7186 14.9707 20.5544L20.1508 18.8269C20.5454 18.6953 20.6236 18.587 20.6236 18.1752L20.6258 10.076Z" fill="#6440FB"/>
										<path d="M-6.06381e-05 9.40938C0.210564 9.00962 0.553583 8.92666 0.981711 8.92967C3.21692 8.94428 5.44954 8.93655 7.68732 8.93655C7.70108 8.85058 7.62715 8.82737 7.58803 8.78782C6.89082 8.0876 6.18716 7.3934 5.49338 6.68974C5.09621 6.28654 5.26428 5.6508 5.79428 5.51969C6.07024 5.45178 6.29677 5.54978 6.49278 5.74665C7.31149 6.56852 8.13164 7.38895 8.95322 8.20796C9.25197 8.50627 9.55286 8.80329 9.85203 9.10161C10.1731 9.42184 10.1757 9.82289 9.8559 10.1427C8.74174 11.256 7.62715 12.3693 6.51212 13.4826C6.31138 13.6838 6.08571 13.7977 5.79944 13.7293C5.26685 13.6004 5.09406 12.9642 5.48823 12.5614C5.98857 12.0495 6.49923 11.5474 7.00559 11.0411L7.73633 10.3103H7.46982C5.30726 10.3103 3.1447 10.3022 0.982141 10.3172C0.552294 10.3202 0.211856 10.2347 -0.000488281 9.83751L-6.06381e-05 9.40938Z" fill="#6440FB"/>
									</g>
									<defs>
										<clipPath id="clip0_480_4">
											<rect width="22" height="22" fill="white"/>
										</clipPath>
									</defs>
								</svg>
							</span>
							<span>Login/Sign Up</span>
						    </div>
                        }
					</div>
				</div>
			</div>
		</div>
	</header>
  )
}

export default Header
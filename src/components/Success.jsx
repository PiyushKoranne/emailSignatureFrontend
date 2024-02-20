import React, {useState, useEffect, useContext, useReducer, useRef} from 'react';
import "./css/success.css";
import { LoginContext } from '../App';
import Meta from './Meta';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './Header';
import Footer from './Footer';
import FallBack from './FallBack';
import { FcGoogle } from 'react-icons/fc';
import {enqueueSnackbar} from "notistack";
import userServices from "../services/userServices";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyTabs from './SucessTabber';
import parse, { attributesToProps, domToReact } from 'html-react-parser'
import reactDOMServer from 'react-dom/server';
import { Link } from 'react-router-dom';

const Success = () => {	
	const navigate = useNavigate();
	const {loggerData, setLoggerData} = useContext(LoginContext);
	const [gmailStatus, setGmailStatus] = useState(false);
	const [userData, setUserData] = useState({});
	const userDataRef = useRef(null);
	const loggerRef = useRef(null);
	const [gmailData,setGmailData] = useState(null);
	const sign_ref = useRef(null);

	function getSignature() {
		try {
			console.log('Get Signature Called', sign_ref.current);
			if (sign_ref.current) {
				console.log(sign_ref?.current);
				const temp = sign_ref.current.replace(/(\r\n|\n|\r)/gm, "");
				try {
					const node = parse(temp);
					const node_text = reactDOMServer.renderToString(node);
					sign_ref.current = node_text;
					return node;

				} catch (error) {
					return <></>;
				}
			} else {
				return <></>;
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handleNavigatetoCreate = () => {
		try {
			navigate('/create', {
				state:{
					userData:userData,
					gmailStatus:gmailStatus,
					tabber:'filter-details'
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function handleRefresh() {
		try {
			console.log('Handle Refresh Function called:');
			const log_result = await userServices.refresh();
			if (log_result.status === 200) {
				console.log('Silent Refresh --[SUCCESS]');
				console.log('Local Storage UserData',localStorage.getItem('userData'));
				if(localStorage.getItem('userData')){
					const local_user = JSON.parse(localStorage.getItem('userData'));
					console.log('Local User Data:',local_user);
					setUserData(local_user);
					userDataRef.current = local_user;	
					setLoggerData(prev => ({ ...prev, 
						username: log_result?.data?.username, 
						email: log_result?.data?.email, 
						access_token: log_result?.data?.access_token, 
						user_id: log_result?.data?.user_id, 
						isLoggedIn: true, 
						template_id:localStorage.getItem('template_id'),
						userData:{...local_user} }));
					loggerRef.current = { username: log_result?.data?.username, email: log_result?.data?.email, access_token: log_result?.data?.access_token, user_id: log_result?.data?.user_id, isLoggedIn: true, userData:{...local_user} };
				}
			}
		} catch (error) {
			console.log('Silent Refresh --[FAILED]');
			console.log(error);
		}
	}

	function handleOpenGmail() {
		try {
			const gmailUrl = 'https://mail.google.com/mail/u/';
			const urlWithAuthuser = `${gmailUrl}?authuser=${loggerData?.email}`;
			window.open(urlWithAuthuser, '_blank');
		} catch (error) {
			console.log(error);
		}
	}

	useEffect( () => {
		if(loggerData?.isLoggedIn){
			userServices.getGmailData( 
				loggerData?.email, loggerData?.access_token
			).then((data)=>{
				console.log("getting gmail data",data);
				if(data.status===200){
					setGmailData(data?.data?.gmailData?.signature);
					sign_ref.current = data?.data?.gmailData?.signature;
				}
			})
		}

		let urlparam = new URLSearchParams(window.location.search);
		let success = urlparam.get('success');
		if (success === 'true') {
			handleRefresh();
			enqueueSnackbar('Signature Added To Your Gmail', {
				variant: 'customSuccess',
			});
			setGmailStatus(true);
		}
		else if (success === 'false') {
			handleRefresh();
			enqueueSnackbar('Failed to add to Gmail', {	
				variant: 'customError',
			});
			setGmailStatus(false);
		} else {
			handleRefresh();
		}
	}, [window.location.pathname,loggerData?.isLoggedIn]);

  return (
	<ErrorBoundary FallbackComponent={<FallBack/>}>
		<Meta 
			title="Gmail | Email Signatures"
			desc=""
			keywords=""
		/>	
		<Header />
		<section className="page-banner-wr sucess-pg" style={{backgroundColor:"#f5f5f5"}}>
			<div className="center-wr">
				<div className='content-container'>
					<div className='message-container'>
						<img src="/assets/images/icons8-tick.svg" alt="sucess/failure" />
						<h5>Woohoo! Your Signature has been added to your gmail account!</h5>
					</div>
					<div className='template-container'>
						<div className='template-img-wr' id='customScroll' style={{overflowY:"scroll", width:"fit-content"}}>
						{	getSignature() }
						</div>
						<div className='template-details'>
							<p>
								Hey <strong>{`${loggerData?.userData?.fullName}!`}</strong> Your template created {new Date().toLocaleDateString()} has been added to your gmail account. Make a lasting impression with more email signatures in your emails.
							</p>
							<div className='create-container'>
								<button onClick={handleOpenGmail}>
									<FcGoogle style={{fontSize:"24px"}} />
									Open Gmail
								</button>
								<button onClick={handleNavigatetoCreate}>
									Back to Editing
								</button>
							</div>
							<div className='tabber-container'>
					<Link to="/procedure/gmail"> <div className='tabber-icon' style={{padding:"10px",backgroundColor:'white', borderRadius:'10px',  display:'flex', alignItems:'center', justifyContent:'center'}}><img width={'75%'} src="/assets/images/icons8-gmail.svg" alt="" /></div></Link>
					<Link to="/procedure/outlook"> <div className='tabber-icon' style={{padding:"10px",backgroundColor:'white', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}><img width={'75%'} src="/assets/images/icons8-outlook.svg" alt="" /></div></Link>
					<Link to="/procedure/apple"> <div className='tabber-icon' style={{padding:"10px",backgroundColor:'white', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}><img width={'75%'} src="/assets/images/icons8-apple-logo.svg" alt="" /></div></Link>
					</div>
						</div>
					</div>
					
				</div>
			</div>
		</section>
		<Footer loggerData={loggerData} />
	</ErrorBoundary>
  )
}

export default Success
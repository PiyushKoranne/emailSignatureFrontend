import React, { useState, useEffect, useContext, useReducer, useRef } from 'react';
import parse, { attributesToProps, domToReact } from 'html-react-parser'
import "./css/success.css";
import { LoginContext } from '../App';
import Meta from './Meta';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './Header';
import Footer from './Footer';
import FallBack from './FallBack';
import { TiArrowBack } from 'react-icons/ti';
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from 'react-router-dom';
import userServices from "../services/userServices";
import { useSnackbar } from 'notistack';
import reactDOMServer from 'react-dom/server';
import FullScreenLoader from './common/FullScreenLoader';


function FinishPage() {
	const navigate = useNavigate();
	const { loggerData, setLoggerData } = useContext(LoginContext);
	const { enqueueSnackbar } = useSnackbar();
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [chosenTemplateData, setChosenTemplateData] = useState({});
	const { state } = useLocation();
	const loggerRef = useRef(null);
	const sign_ref = useRef(null);
	const [saving, setSaving] = useState(false);
	const preCode = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><html><head><title>Email Signature</title><meta content="text/html; charset=utf-8" http-equiv="Content-Type"><style type="text/css">*{margin:0px;padding:0px;box-sizing:content-box;} .ii a[href]{ color:#000 !important; text-decoration:none !important;} table{border-collapse:separate}a,a:link,a:visited{text-decoration:none;color:#010505}a:hover{text-decoration:underline}.t_cht,h2,h2 a,h2 a:visited,h3,h3 a,h3 a:visited,h4,h5,h6{color:#000!important}.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td{line-height:100%}.ExternalClass{width:100%}</style></head><body>`;
	const postCode = `</body></html>`;

	useEffect(() => {
		if (state?.template_data) {
			sign_ref.current = state?.template_data;
		}
		if (loggerData?.userData) {
			setUserData(loggerData?.userData);
		} else if(state?.userData){
			setUserData(state?.userData);
		}
		if(loggerData?.template_id){
			getTemplateData();
		}
		console.log("### FIRST USEEFFECT RAN ###");
		console.log("LOGGER: ",loggerData);
		console.log("USER: ",userData);
		console.log("STATE: ",state);

	}, [loggerData?.userData?.length, loggerData?.template_id])

	const getTemplateData = async () => {
		try {
			if(loggerData?.template_id){
				const template_data = await userServices.getTemplateById({ template_id: loggerData?.template_id });
				setChosenTemplateData(template_data?.data?.data);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async function handleSave() {
		try {
			setSaving(true);
			const result = await userServices.saveToDrafts(loggerData?.user_id, loggerData?.email, loggerData?.access_token, chosenTemplateData._id, chosenTemplateData.cta_data, sign_ref.current, { ...loggerData?.userData });
			if (result.status === 201) {
				setSaving(false);
				enqueueSnackbar('Saved!', {
					variant: 'customSuccess',
				});
			}
		} catch (error) {
			console.log('Some error occurred.', error);
			setSaving(false);
			enqueueSnackbar('Failed to save template', {
				variant: 'customError',
			});
		}
	}

	const copyWithStyle = () => {
		try {
			if (loggerData?.isLoggedIn) {
				// before copying also save this to the users profile
				userServices.addUserData(loggerData?.user_id, loggerData?.email, loggerData?.access_token, loggerData?.userData, chosenTemplateData?._id)
					.then(res => {})
					.catch((err) => {});

				userServices.saveToDrafts(loggerData?.user_id, loggerData?.email, loggerData?.access_token, chosenTemplateData._id, chosenTemplateData.cta_data, sign_ref.current, { ...loggerData?.userData })
					.then(res => {})
					.catch((err) => {})
				const temp = document.createElement("div");
				temp.setAttribute("contentEditable", true);
				const node = parse(sign_ref.current.replace(/(\r\n|\n|\r)/gm, ""), {
					replace: replaceElementsWithDisplayNone
				});
				const node_text = reactDOMServer.renderToString(node);
				// pre and post codes added for outlook and other mails 
				temp.innerHTML = preCode + node_text + postCode;
				temp.style.position = 'fixed';
				temp.style.bottom = 0;
				temp.style.left = 0;
				temp.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
				document.body.appendChild(temp);
				temp.focus();
				document.execCommand("copy");
				document.body.removeChild(temp);
				enqueueSnackbar("Signature Copied to clipboard!", { variant: "customSuccess"});
			}
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Oops! failed to copy signature', { variant: 'customWarning' });
		}
	};

	function copyTextPlain(e) {
		try {
			if (loggerData?.isLoggedIn) {
				
				e.stopPropagation();
				userServices.addUserData(loggerData?.user_id, loggerData?.email, loggerData?.access_token, loggerData?.userData, chosenTemplateData?._id)
					.then(res => { });
				if (window.getSelection) {
					let range = document.createRange();
					const textArea = document.createElement('input');
					// before passing value remove display nones
					const node = parse(sign_ref.current.replace(/(\r\n|\n|\r)/gm, ""), {
						replace: replaceElementsWithDisplayNone
					});
					const node_text = reactDOMServer.renderToString(node);
					textArea.value = node_text;
					document.body.appendChild(textArea);
					textArea.select();
					document.execCommand('copy');
					document.body.removeChild(textArea);
				}
			}
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Oops! failed to copy signature', { variant: 'customWarning' });
		}
	}

	const handleGmailSignature = async () => {
		try {
			setLoading(true);
			if (loggerData?.isLoggedIn) {
				
				userServices.addUserData(loggerData?.user_id, loggerData?.email, loggerData?.access_token, loggerData?.userData, chosenTemplateData?._id)
					.then(res => { })
					.catch((err) => { })

				userServices.saveToDrafts(loggerData?.user_id, loggerData?.email, loggerData?.access_token, chosenTemplateData._id, chosenTemplateData.cta_data, sign_ref.current, { ...loggerData?.userData })
					.then(res => {})
					.catch((err) => {})

				const node = parse(sign_ref.current.replace(/(\r\n|\n|\r)/gm, ""), {
					replace: replaceElementsWithDisplayNone
				});
				const node_text = reactDOMServer.renderToString(node);
				const result = await userServices.gmailAuth(node_text, loggerData?.email, chosenTemplateData?._id,);
				if (result?.status === 200) {
					// before redirect store all the state data and the chosen tempalte in the localstorage
					sessionStorage.setItem('userData', JSON.stringify(loggerData?.userData));
					sessionStorage.setItem('template_id', chosenTemplateData?._id);
					setLoading(false);
					window.location.href = result?.data?.authUrl;
				}
			}
		} catch (error) {
			console.log('Some error occurred.', error);
			setLoading(false);
			enqueueSnackbar('Gmail Error', {
				variant: 'customError',
			});
		}
	}

	const replaceElementsWithDisplayNone = (node) => {
		if (node.attribs && node.attribs.id) {
			if (node.attribs.id === 'profile-pic') {
				if (!loggerData?.userData?.profileImage) {
					node.attribs.src = process.env.REACT_APP_BACKEND_URL + '/profile/dummy_avatar.png';
				}
			}
		}
		if (node.type === 'tag' && node.attribs && node.attribs.style) {
			const styles = node.attribs.style.split(';').map(style => style.trim());
			if (styles.includes('display: none') || styles.includes('display:none')) {
				return <></>; // Return null to remove the element
			}
		}
		return node;
	};

	const handleNavigatetoCreate = () => {
		try {
			navigate('/create', {
				state:{
					userData:userData,
					tabber:'filter-details',
					template_id:loggerData?.template_id
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(()=>{
		if(loggerData?.isLoggedIn){
			setLoggerData(prev =>({...prev, newUser:false}));
		}
	},[])

	return (

		<ErrorBoundary FallbackComponent={<FallBack />}>
			<Meta
				title="Gmail | Email Signatures"
				desc=""
				keywords=""
			/>
			<Header />
			<FullScreenLoader loading={loading} />
			<section className='finish-pg-cont' id='coolBtn' style={{paddingTop:"100px", paddingBottom:"200px"}}>
				<div className='center-wr'>
					<div className='heading-container for-cursive' style={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: 'center', padding: "0px 25px 40px" }}>
						<h4><span style={{ paddingRight: '9px' }}>End with Elegance</span> Elevate Every Email with EmailSignature!</h4>
					</div>
					<div className='temp-cont' id='finishScroll'>
						<div className='template-img-wr' style={{backgroundColor:sign_ref?.current && "transparent"}}>
							{ sign_ref?.current &&
								parse(sign_ref.current)
							}
						</div>
					</div>
					<div className='fin-res' style={{ display: 'flex', justifyContent: 'space-evenly', width: '76%', margin: '0 auto' }}>
						<button className="button2" onClick={handleNavigatetoCreate}>
							<img src="/assets/images/backIcon.png" alt="back" />
							<span>Continue Editing</span>
						</button>
						<button className="button2" onClick={handleSave}>
							<img src="/assets/images/saveIcon.svg" alt="save" />
							<span>Save Signature</span>
						</button>
						<button className="button2" onClick={copyWithStyle}>
							<img src="/assets/images/copyIcon.png" alt="copy" />
							<span>Copy Signature</span>
						</button>
						<button className="button2" onClick={handleGmailSignature}>
							<img src="/assets/images/googleIcon.svg" alt="google" />
							<span>Add To Gmail</span>
						</button>
					</div>
				</div>
			</section>

			<Footer loggerData={loggerData} />
		</ErrorBoundary>
	)
}
export default FinishPage;
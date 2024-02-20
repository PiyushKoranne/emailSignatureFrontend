"use client";
import './style.css'
import './responsive.css'
import { Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Create from './components/Create';
import SignatureTemplates from './components/SignatureTemplates';
import {useState, createContext, useEffect} from 'react'
import Drafts from './components/Drafts';
import userServices from './services/userServices';
import { ErrorBoundary } from 'react-error-boundary';
import FallBack from './components/FallBack';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import {SnackbarProvider} from 'notistack';
import Success from './components/Success';
import CustomSnackBar from './components/common/CustomSnackbar';
import { useCookies } from 'react-cookie';
import FinishPage from './components/FinishPage';
import About from './components/About';
import GmailProcedure from './components/GmailProcedure';
import OutlookProcedure from './components/OutlookProcedure';
import AppleProcedure from './components/AppleProcedure';
import PageNotFound from './components/PageNotFound';
import Sitemap from './components/Sitemap';

export const LoginContext = createContext(null);

function App() {
	const [loggerData, setLoggerData] = useState({isLoggedIn:false});
	const [cookies, setCookie, removeCookie] = useCookies(['jwt','access_token']);

	const fetchLayoutData = async () => {
		try {
			const result = await userServices.getLayoutData();
			if(result.status === 200){
				console.log("LAYOUT RESULT ", result)
				setLoggerData(prev=>({...prev, layout_data: {...result?.data?.layout_data, logo:process.env.REACT_APP_BACKEND_URL+'/logo/'+result?.data?.layout_data?.logo}}))
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(()=>{
		fetchLayoutData()
	},[])

	const handleUserRefresh = async () => {
		try {
			console.log("HANDLE USER REFRESH")
			const log_result = await userServices.refreshUser();
			console.log(log_result);
			if(log_result.status === 200) {
				console.log("++++++++++++ SUCCESS +++++++++++++");
				setLoggerData(prev => ({...prev, userData:log_result?.data?.userData, template_id:log_result?.data?.template_id, username:log_result?.data?.username, email:log_result?.data?.email, access_token:log_result?.data?.access_token, user_id:log_result?.data?.user_id, isLoggedIn:log_result?.data?.is_logged_in}));
			}
		} catch (error) {
			console.log(error);
			if(error?.response?.status === 403){
				removeCookie('access_token');
				removeCookie('jwt');
				sessionStorage.removeItem("userData");
				sessionStorage.removeItem("template_id");
				setLoggerData(prev => ({...prev, access_token:"", email:"", username:"", user_id:"", isLoggedIn: false, userData:{}, template_id:"" }));
			}
		}
	} 

	useEffect(()=>{
		handleUserRefresh();
	},[])
	
  return (
    <>
	<LoginContext.Provider value={{loggerData, setLoggerData}}>
		<ErrorBoundary FallbackComponent={FallBack}>
			<SnackbarProvider
				anchorOrigin={{
					horizontal:'center',
					vertical:'bottom'
				}}
				autoHideDuration={2000}
				maxSnack={1}
				Components={{
					customWarning:CustomSnackBar,
					customSuccess:CustomSnackBar,
					customError:CustomSnackBar
				}}
			>
			<Routes>
				<Route exact path='/' errorElement={<FallBack />} element={<Landing />} />
				<Route path='/about-us' element={<About />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/create' element={<Create/>} />
				<Route path='/success' element={<Success/>} />
				<Route path='/signature-templates' element={<SignatureTemplates />} />
				<Route path='/drafts' element={<Drafts/>} />
				<Route path="/procedure/gmail" element={<GmailProcedure />} />
				<Route path="/procedure/outlook" element={<OutlookProcedure />} />
				<Route path="/procedure/apple" element={<AppleProcedure />} />
				<Route path='/privacy-policy' element={<PrivacyPolicy />} />
				<Route path='/terms-of-service' element={<TermsOfService />} />
				<Route path='/finish' element={<FinishPage />} />
				<Route path='/sitemap' element={<Sitemap />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
			</SnackbarProvider>
		</ErrorBoundary>
	</LoginContext.Provider>
    </>
  );
}

export default App;

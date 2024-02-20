import {useContext} from 'react';
import { LoginContext } from '../App'; 
import userServices from '../services/userServices';

const ValidateLogin = () => {
    const {loggerData, setLoggerData} = useContext(LoginContext);
    let checkInterval;
    const validateLogin = async () =>{
        try {
            // validate the login
            // call the backend with the access_token, if invalid or expred then logout 
            const result = await userServices.validate(loggerData?.user_id, loggerData?.username, loggerData?.access_token);
            if(result?.status !== 200){
                clearInterval(checkInterval);
                await userServices.logout(loggerData?.username, loggerData?.access_token);
                setLoggerData({isLoggedIn:false});
            } 
        } catch (error) {
            clearInterval(checkInterval);
            try {
                await userServices.logout(loggerData?.username, loggerData?.access_token);
            } catch (error) {
                console.log('Some error occurred', error.message);
            }
            setLoggerData({isLoggedIn:false});
        }
    }

    if(Object.keys(loggerData).length > 1 && loggerData?.isLoggedIn){
        //Validate login every 10mins if already logged in
        checkInterval = setInterval(()=>{
            validateLogin();
        }, 1000*60*15);
    } else {
        clearInterval(checkInterval);
    }
  return (
    null
  )
}

export default ValidateLogin
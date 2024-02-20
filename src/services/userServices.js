import axios from 'axios';
axios.defaults.withCredentials = true // added to be able to send refresh token cookie in the future.
const baseUrl = process.env.REACT_APP_BACKEND_URL;

class User{
    getLayoutData(){
        const url = baseUrl+'/signature/layout-data';
        const config = { 
            headers:{
                'Content-Type':'application/json'
            }
        }
        return axios.get(url, {}, config);
    }
    login(data){
        const url = baseUrl+'/auth/login';
        const config = { 
            headers:{
                'Content-Type':'application/json'
            }
        }
        return axios.post(url, data, config);
    }
	addUserData(user_id, email, access_token, userData, template_id){
        const url = baseUrl+'/auth/add-user-data';
        const config = {
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${access_token}`
            }
        }
        return axios.post(url, {owner:user_id, email, userData:userData, template_id:template_id }, config)
    }
    getGmailData( email, access_token){
        const url = baseUrl+'/signature/get-gmail-save';
        const config = {
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${access_token}`
            }
        }
        return axios.post(url, { email}, config)
    }
    logout(email, access_token){
        const url = baseUrl+'/auth/logout';
        const config = {
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${access_token}`
            }
        }
        return axios.post(url,{email}, config)
    } 
	verifyEmail(email){
		const url = baseUrl+'/auth/verify-email';
        const config = {
            headers:{
                'Content-Type':'application/json',
            }
        }
        return axios.post(url, { email }, config)
	}
	verifyOTP(email, initial_code){
		const url = baseUrl+'/auth/verify-otp';
        const config = {
            headers:{
                'Content-Type':'application/json',
            }
        }
        return axios.post(url, { email, initial_code }, config)
	}
    validate(user_id, email, access_token){
        const url = baseUrl+'/auth/validate';
        const config = {
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${access_token}`
            }
        }
        return axios.post(url, {owner:user_id, email }, config)
    }
    refresh(){
        const url = baseUrl+'/auth/refresh';
        const config = {
            headers:{
                'Content-Type':'application/json',
            }
        };
        return axios.post(url, {}, config)
    }
	refreshUser(){
		const url = baseUrl+'/auth/refresh-user';
		const config = {
			headers:{
                'Content-Type':'application/json',
            }
		};
		return axios.get(url, config)
	}
	handleForgotPassoword(email){
		const url = baseUrl+'/auth/forgot-password';
		const config = {
			headers: {
				'Content-Type':'application/json'
			}
		}
		return axios.post(url, {email: email}, config)
	}
	handleChangePassword(data){
		const url = baseUrl+'/auth/change-password';
		const config = {
			headers: {
				'Content-Type':'application/json'
			}
		}
		return axios.post(url, data, config)
	}
    register(data){
        const url = baseUrl+'/auth/register';
        const config = { 
            headers:{
                'Content-Type':'application/json'
            }
        }
        return axios.post(url, data, config)
    }
    getTemplates(data){
        const url = baseUrl+'/signature/get-templates';
        return axios.get(url, data);
    }
    getTemplateById(data){
        const url = baseUrl+'/signature/get-template';
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        };
        return axios.post(url, data, config)
    }
    getDrafts(user_id, access_token, email){
        const url = baseUrl+'/signature/get-drafts';
        const config = {
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${access_token}`
            }
        }
        return axios.post(url, {owner:user_id, email}, config)
    }
    uploadImage(formData){
        const url = baseUrl+'/signature/upload-image';
        const config = {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        };
        return axios.post(url, formData, config);
    }
    uploadLogo(formData){
        const url = baseUrl+'/signature/upload-banner';
        const config ={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        return axios.post(url, formData,config);
    }
    saveToDrafts(user_id, email, access_token, template_id, cta_data, template_data, userData){
        const url = baseUrl+'/signature/create';
        const config ={
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${access_token}`
            }
        }
        return axios.post(url, {owner:user_id, email, data: template_data, template_id, cta_data, userData: userData}, config);
    }
    deleteDraft(user_id, access_token, email, draft_id){
        const url = baseUrl+'/signature/delete-draft';
        const config ={
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${access_token}`
            }
        }
        return axios.post(url, {owner:user_id, email, draft_id}, config);
    }
    gmailAuth(signature_data, email, template_id){
        const url = baseUrl+'/signature/auth';
        const data = { signature_data, email, template_id}
        const config ={
            headers:{
                'Content-Type':'application/json',
            }
        }
        return axios.post(url, data, config)
    }
    getCategories() {
        const url = baseUrl+'/signature/get-categories';
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
        return axios.get(url, config)
    }
    getOTP(email) {
        const url = baseUrl+'/auth/get-otp';
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
        return axios.post(url, {email}, config)
    }
    loginWithOTP (data) {
        const url = baseUrl+'/auth/login-otp';
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
        return axios.post(url, data, config);
    }
}

const myService = new User();

export default myService;
export function modifyUserCTA(userData, setCtaDisplay) {
	try {
		let modifiedUserData = {};
		
		if(userData.quote === null || userData.quote === ""){
			modifiedUserData.quote = "";
			setCtaDisplay(prev => ({...prev, quote:false}));
		} else {
			modifiedUserData.quote = userData.quote;
		}
		if(userData.disclaimer === null || userData.disclaimer === ""){
			modifiedUserData.disclaimer = "";
			setCtaDisplay(prev => ({...prev, disclaimer:false}));
		} else {
			modifiedUserData.disclaimer = userData.disclaimer;
		}
		if(userData.video === null || userData.video === ""){
			modifiedUserData.video = "";
			setCtaDisplay(prev => ({...prev, video:false}));
		} else {
			modifiedUserData.video = userData.video;
		}
		if(userData.banner === null || userData.banner === ""){
			modifiedUserData.banner = "";
			setCtaDisplay(prev => ({...prev, banner:false}));
		} else {
			modifiedUserData.banner = userData.banner;
		}
		if(userData.playStoreAppLink === null || userData.playStoreAppLink === ""){
			modifiedUserData.playStoreAppLink = "";
			setCtaDisplay(prev => ({...prev, appLink:false}));
		} else {
			modifiedUserData.playStoreAppLink = userData.playStoreAppLink;
		}
		if(userData.appleStoreAppLink === null || userData.appleStoreAppLink === ""){
			modifiedUserData.appleStoreAppLink = "";
			setCtaDisplay(prev => ({...prev, appLink:false}));
		} else {
			modifiedUserData.appleStoreAppLink = userData.appleStoreAppLink;
		}
		if(userData.feedback === null || userData.feedback === ""){
			modifiedUserData.feedback = "";
			setCtaDisplay(prev => ({...prev, feedback:false}));
		} else {
			modifiedUserData.feedback = userData.feedback;
		}
		return modifiedUserData;
	} catch (error) {
		console.log(error);
	}
}

export function modifyUserSocial(userData, socialChecker, setSocialChecker, socialCounter, setSocialCounter) {
	try {
		let modifiedUserData = {};
		if(!socialChecker?.facebook || userData?.facebook === null || userData?.facebook === ""){
			modifiedUserData.facebook = "";
			setSocialChecker(prev =>({...prev, facebook:false}));
			socialCounter?.indexOf("facebook") !== -1 && setSocialCounter(prev => (prev.filter(item => item !== "facebook")));
		} else {
			modifiedUserData.facebook = userData?.facebook;
		}
		if(!socialChecker?.linkedIn || userData?.linkedIn === null || userData?.linkedIn === ""){
			modifiedUserData.linkedIn = "";
			setSocialChecker(prev =>({...prev, linkedIn:false}));
			socialCounter?.indexOf("linkedIn") !== -1 && setSocialCounter(prev => (prev.filter(item => item !== "linkedIn")));
		} else {
			modifiedUserData.linkedIn = userData?.linkedIn;
		}
		if(!socialChecker?.twitter || userData?.twitter === null || userData?.twitter === ""){
			modifiedUserData.twitter = "";
			setSocialChecker(prev =>({...prev, twitter:false}));
			socialCounter?.indexOf("twitter") !== -1 && setSocialCounter(prev => (prev.filter(item => item !== "twitter")));
		} else {
			modifiedUserData.twitter = userData?.twitter;
		}
		if(!socialChecker?.instagram || userData?.instagram === null || userData?.instagram === ""){
			modifiedUserData.instagram = "";
			setSocialChecker(prev =>({...prev, instagram:false}));
			socialCounter?.indexOf("instagram") !== -1 && setSocialCounter(prev => (prev.filter(item => item !== "instagram")));
		} else {
			modifiedUserData.instagram = userData?.instagram;
		}
		if(!socialChecker?.youtube || userData?.youtube === null || userData?.youtube === ""){
			modifiedUserData.youtube = "";
			setSocialChecker(prev =>({...prev, youtube:false}));
			socialCounter?.indexOf("youtube") !== -1 && setSocialCounter(prev => (prev.filter(item => item !== "youtube")));
		} else {
			modifiedUserData.youtube = userData?.youtube;
		}
		if(!socialChecker?.skype || userData?.skype === null || userData?.skype === ""){
			modifiedUserData.skype = "";
			setSocialChecker(prev =>({...prev, skype:false}));
			socialCounter?.indexOf("skype") !== -1 && setSocialCounter(prev => (prev.filter(item => item !== "skype")));
		} else {
			modifiedUserData.skype = userData?.skype;
		}
		if(!socialChecker?.whatsapp || userData?.whatsapp === null || userData?.whatsapp === ""){
			modifiedUserData.whatsapp = "";
			setSocialChecker(prev =>({...prev, whatsapp:false}));
			socialCounter?.indexOf("whatsapp") !== -1 && setSocialCounter(prev => (prev.filter(item => item !== "whatsapp")));
		} else {
			modifiedUserData.whatsapp = userData?.whatsapp;
		}
		if(!socialChecker?.pinterest || userData?.pinterest === null || userData?.pinterest === ""){
			modifiedUserData.pinterest = "";
			setSocialChecker(prev =>({...prev, pinterest:false}));
			socialCounter?.indexOf("pinterest") !== -1 && setSocialCounter(prev => (prev.filter(item => item !== "pinterest")));
		} else {
			modifiedUserData.pinterest = userData?.pinterest;
		}
		return modifiedUserData;
	} catch (error) {
		console.log(error);
	}
}

export function modifyUserDetails(userData) {
	try {
		console.log('modify user details function called.', userData);
		let modifiedUserData = {};
			if(userData.phone === null){
				modifiedUserData.phone = "";
			} else {
				modifiedUserData.phone = userData.phone;
			}
			if(userData.website === null){
				modifiedUserData.website = "";
			} else {
				modifiedUserData.website = userData.website;
			}
			if(userData.location === null){
				modifiedUserData.location = "";
			} else {
				modifiedUserData.location = userData.location;
			}
			if(userData.fullName === null){
				modifiedUserData.fullName = "";
			} else {
				modifiedUserData.fullName = userData.fullName;
			}
			if(userData.designation === null){
				modifiedUserData.designation = "";
			} else {
				modifiedUserData.designation = userData.designation;
			}
			if(userData.email === null){
				modifiedUserData.email = "";
			} else {
				modifiedUserData.email = userData.email;
			}
			if(userData?.profileImage === null){
				modifiedUserData.profileImage = "avatar.png";
			} else {
				modifiedUserData.profileImage = userData?.profileImage;
			}
			return modifiedUserData;
	} catch (error) {
		console.log(error)
	}
}

export function modifyUserData(userData, initialValues, socialChecker) {
	try {
		console.log('modify userdata function called.', userData);
		let modifiedUserData = {};
		Object.keys(userData)?.forEach(item => {
			if(userData[item] === null){
				modifiedUserData[item] = initialValues[item];
			} else {
				modifiedUserData[item] = userData[item];
			}
		})
		if(!socialChecker?.facebook){
			console.log('removing facebook, because unticked');
			modifiedUserData.facebook = "";
		}
		if(!socialChecker?.linkedIn){
			modifiedUserData.linkedIn = "";
		}
		if(!socialChecker?.instagram){
			modifiedUserData.instagram = "";
		}
		if(!socialChecker?.twitter){
			modifiedUserData.twitter = "";
		}
		if(!socialChecker?.youtube){
			modifiedUserData.youtube = "";
		}
		if(!socialChecker?.skype){
			modifiedUserData.skype = "";
		}
		if(!socialChecker?.whatsapp){
			modifiedUserData.whatsapp = "";
		}
		if(!socialChecker?.pinterest){
			modifiedUserData.pinterest = "";
		}
		if(userData?.profileImage === null){
			modifiedUserData.profileImage = "avatar.png";
		}
		console.log("modified User Data", modifiedUserData);
		return modifiedUserData;
	} catch (error) {
		console.log(error);
	}
}


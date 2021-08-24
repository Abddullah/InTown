import { LoginManager, AccessToken } from 'react-native-fbsdk';
import ActionTypes from '../constant/constant';
import axios from 'axios';
import { baseURL } from "../../config/config";
import { checkContactPermission } from "./contact";
import AsyncStorage from '@react-native-community/async-storage';

//auth with facebook 
export function authWithFacebook(navigation) {
    return async dispatch => {
        let authFb = await LoginManager.logInWithPermissions(["email", "public_profile"]);

        if (authFb && authFb.isCancelled) {
            console.log(authFb, 'authFb')
            dispatch({ type: ActionTypes.SHOW_ERROR, payload: { type: 'facebook', message: 'Login cancelled.' } });
            dispatch(hideError());

        }
        else if (authFb && !authFb.isCancelled) {
            let accessToken = await AccessToken.getCurrentAccessToken();
            console.log(authFb, 'authFb')
            dispatch({type:ActionTypes.LOADER_START})
            dispatch(authUser(accessToken, navigation));
            dispatch(saveUserLocally(accessToken));
        }
        else {
            console.log("Login fail with error: " + error);
            dispatch({ type: ActionTypes.SHOW_ERROR, payload: { type: 'facebook', message: 'Login failed.' } });
            dispatch(hideError());
        }

    }
}

export function hideError() {
    return async dispatch => {
        setTimeout(() => {
            dispatch({ type: ActionTypes.HIDE_ERROR });
        }, 3000)
    }
}

//auth with server
export function authUser(accessToken, navigation) {
    return async dispatch => {
        let { data } = await axios.post(`${baseURL}/api/login-with-facebook/`, accessToken);
        console.log(data, 'userauthenticated');
        dispatch({ type: ActionTypes.USER, payload: data });

        if (data.verifiedPhone) {
            dispatch({type:ActionTypes.LOADER_STOP});
            navigation.navigate("Menu")
        }
        else {
            dispatch({type:ActionTypes.LOADER_STOP});
            navigation.navigate("PhoneVerification")
        }

    }
}

//saving user information in local storage
export function saveUserLocally(accessToken) {
    return async dispatch => {
        console.log('saved user', accessToken)
        try {
            await AsyncStorage.setItem('accessToken', JSON.stringify(accessToken));

        } catch (e) {
            // saving error
            console.log('user not saved to local storage. Error: ', e);
        }
    }
}



//check already logged in user session
export function getUserSession(navigation) {
    return async dispatch => {
        dispatch({ type: ActionTypes.INITIALIZE_STATES });
        try {
            let userFound = await AsyncStorage.getItem('accessToken');
            userFound = JSON.parse(userFound);
            if (userFound) {
                dispatch(authUser(userFound, navigation));
            }
            else {
                dispatch({ type: ActionTypes.USER, payload: {} });
            }
        } catch (e) {
            // saving error
            console.log('user not fetched from local storage. Error: ', e);
        }
    }
}



// logout user
export function logout(navigation) {
    return async dispatch => {
        console.log('logout called');
        await AsyncStorage.clear();
        navigation.navigate("Login");
    }
}


//Send Phone Verification Code
export function sendPhoneVerificationCode(uidAndPhone, navigation) {
    return async dispatch => {
        dispatch({ type: ActionTypes.VERIFICATION_PHONEID_AND_UID, payload: uidAndPhone });
        dispatch({type:ActionTypes.LOADER_START});

        let { data } = await axios.post(`${baseURL}/api/send-verification-code/`, uidAndPhone);
        dispatch({type:ActionTypes.LOADER_STOP});
        if (data.message) {
            console.log(data.message)
            if (data && data.message && data.message == 'Code is sent.') {
                navigation.navigate("EnterOTPCode");
            }
            else if (data && data.message && data.message == 'Code already sent, kindly wait for 60 seconds.') {
                navigation.navigate("EnterOTPCode");
                dispatch({ type: ActionTypes.SHOW_ERROR, payload: { type: 'OTP', message: data.message } });
                dispatch(hideError());
            }
            else {
                dispatch({ type: ActionTypes.SHOW_ERROR, payload: { type: 'OTP', message: data.message } });
                dispatch(hideError());
            }
        }
        else {
            dispatch({ type: ActionTypes.SHOW_ERROR, payload: { type: 'OTP', message: 'Error occurred while sending OTP.' } });
            dispatch(hideError());

        }

    }
}

//Verify OTP Code
export function verifyCode(uidAndOTP, navigation) {
    return async dispatch => {
        console.log(uidAndOTP, 'uidAndOTP');
        dispatch({type:ActionTypes.LOADER_START});
        let { data } = await axios.post(`${baseURL}/api/verify-code/`, uidAndOTP);
        console.log(data, 'code verified');
        dispatch({type:ActionTypes.LOADER_STOP});
        if(data && data.message && data.message == 'Phone number is verified.'){
            navigation.navigate("Menu");
            dispatch({ type: ActionTypes.SHOW_ERROR, payload: { type: 'verifiedcode', message: data.message } });
            dispatch(hideError());
        }
        else if(data && data.message && data.message == 'Wrong OTP' || data.message == 'OTP expired' ){
            console.log('working')
            dispatch({ type: ActionTypes.SHOW_ERROR, payload: { type: 'verifiedcode', message: data.message } });
            dispatch(hideError());
        }
    }
}


// Resend Phone Verification Code
export function resendOTP(uidAndPhone) {
    return async dispatch => {
        console.log('resend code')
        dispatch({type:ActionTypes.LOADER_START});
        let { data } = await axios.post(`${baseURL}/api/send-verification-code/`, uidAndPhone);
        dispatch({type:ActionTypes.LOADER_STOP});
        if (data.message) {
            console.log(data.message)
            if (data && data.message && data.message == 'Code is sent.') {
                console.log('inside reseend')
                dispatch({ type: ActionTypes.SHOW_ERROR, payload: { type: 'verifiedcode', message: data.message } });
                dispatch(hideError());
            }
            else if (data && data.message && data.message == 'Code already sent, kindly wait for 60 seconds.') {
                console.log('inside reseend else if')
                dispatch({ type: ActionTypes.SHOW_ERROR, payload: { type: 'verifiedcode', message: data.message } });
                dispatch(hideError());
            }
            else {
                dispatch({ type: ActionTypes.SHOW_ERROR, payload: { type: 'verifiedcode', message: data.message } });
                dispatch(hideError());
            }
        }
        else {
            dispatch({ type: ActionTypes.SHOW_ERROR, payload: { type: 'OTP', message: 'Error occurred while sending OTP.' } });
            dispatch(hideError());

        }
    }
}
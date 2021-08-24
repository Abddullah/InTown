import ActionTypes from '../constant/constant';
import axios from 'axios';
import { baseURL } from "../../config/config";
import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from "react-native";

//checking if user has given contact permission or not
export function checkContactPermission() {
    return async dispatch => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
              {
                title: "Please allow to read contacts.",
                message:
                  "In-town app needs to read contact " +
                  "to work properly",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log("You can use the contacts");
              dispatch(gettingAllContacts());

            } else {
              console.log("Camera permission denied");
            }
          } catch (err) {
            console.warn(err);
          }



        console.log('*** inside check contact permission ***')
        // Contacts.checkPermission((err, permission) => {
        //     if (err) throw err;
          
        //     // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
        //     if (permission === 'undefined') {
        //         console.log(permission,'permission')
        //         dispatch(requestContactPermission());
        //     }
        //     if (permission === 'authorized') {
        //       // yay!
        //       console.log(permission,'authorized')
        //       dispatch(gettingAllContacts());
        //     }
        //     if (permission === 'denied') {
        //       // x.x
        //       console.log(permission,'denied')
        //      dispatch(requestContactPermission());

        //     }
        //   })
    }
}

//requesting user contact information
export function requestContactPermission() {
    return async dispatch => {        
        console.log('inside request contact permission')
        Contacts.requestPermission((err, permission) => {
            // ...
            if (err) throw err;
            if(permission){
                console.log(permission,'permission');
                dispatch(gettingAllContacts());
            }
          })
       
    }
}

//getting all contacts
export function gettingAllContacts() {
    return async dispatch => {
        dispatch({type: ActionTypes.LOADER_START});
        Contacts.getAll((err, allContacts)=>{
            if (err){
                dispatch({type: ActionTypes.LOADER_STOP});
                throw err;
            } 
                
            // console.log(allContacts,'AllContacts are fetched');
            dispatch({type: ActionTypes.ALL_CONTACTS, payload: allContacts});
            dispatch({type: ActionTypes.LOADER_STOP});
        })
    }
}
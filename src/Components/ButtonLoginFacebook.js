
import React from "react";
import {
    Text, TouchableOpacity
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const FbLogIn = ({ ...props }) => {
    return (
        <TouchableOpacity
            onPress={props.signin}
            style={{
                marginTop: 30,
                height: 45,
                width: "70%",
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#4267B2",

            }}>
            <EvilIcons name="sc-facebook" style={{ fontSize: 25, color: "#ffffff" }} />
            <Text style={{ color: "#ffffff" }}>Login with Facebook</Text>
        </TouchableOpacity>

    );
};
export default FbLogIn;

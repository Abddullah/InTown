
import React from "react";
import {
    Text, TouchableOpacity
} from 'react-native';

const SendInvite = ({ ...props }) => {
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
                borderColor: "#41719C",
                borderWidth: 2

            }}>
            <Text style={{ color: "#ffffff", fontSize: 21 }}>Send Invite</Text>
        </TouchableOpacity>

    );
};
export default SendInvite;

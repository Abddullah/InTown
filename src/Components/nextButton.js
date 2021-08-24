
import React from "react";
import {
    TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const NextButton = ({ ...props }) => {
    return (

        <TouchableOpacity
            onPress={props.func}
            style={{
                height: 45,
                width: 45,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "#4267B2",

            }}>
            <MaterialIcons name="navigate-next" style={{ fontSize: 25, color: "#ffffff" }} />
        </TouchableOpacity>

    );
};
export default NextButton;

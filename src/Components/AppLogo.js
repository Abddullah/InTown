
import React from "react";
import {
    Image, View
} from 'react-native';

let logo = '../Assets/logo.png'

const AppLogo = () => {
    return (

        <View style={{ marginTop: "20%" }}>
            <Image
                source={require(logo)}
                style={{ height: 150, width: 150, resizeMode: 'contain' }}
            />
        </View>

    );
};
export default AppLogo;

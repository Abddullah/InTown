
import React from "react";
import { Image, View } from 'react-native';

const ProfileImg = ({ ...props }) => {
    return (
        <View style={{ marginTop: "5%", }}>
            <Image
                source={props.imgPath}
                style={{ height: props.height, width: props.width, borderRadius: 50 }}
            />
        </View>
    );
};
export default ProfileImg;

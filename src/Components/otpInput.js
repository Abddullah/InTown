
import React from "react";
import { View, StyleSheet } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'

const OtpInputs = ({otpCode}) => {
    return (
        <View style={styles.mainContainer}>
            <OTPInputView
                style={{ width: '80%', height: 200 }}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code => { otpCode(code) })}
            />
        </View>
    );
};

export default OtpInputs;

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: "5%",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    borderStyleBase: {
        width: 50,
        height: 45
    },
    borderStyleHighLighted: {
        borderColor: "#4267B2",
        color: "#000000"
    },
    underlineStyleBase: {
        width: 50,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 3,
        color: "#000000"
    },
    underlineStyleHighLighted: {
        borderColor: "#4267B2",
        color: "#000000"
    },
});


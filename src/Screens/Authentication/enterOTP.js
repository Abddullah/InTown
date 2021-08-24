import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
//componets
import OtpInputs from '../../Components/otpInput'
import NextButton from '../../Components/nextButton'
import { verifyCode, resendOTP } from '../../store/action/user';
import { connect} from 'react-redux';

class EnterOTPCode extends Component {
    sendOTP = () => {
        this.props.navigation.navigate("Menu")
    }
    otpCode(otp) {
        console.log(otp, 'otp');
        let uidAndOTP = { userID: this.props.user._id, code: otp };
        this.props.verifyCode(uidAndOTP, this.props.navigation);
    }
    resendCode() {
        console.log('code called');
        this.props.resendOTP(this.props.uidAndPhone);
    }
    render() {
        return (
            <View style={styles.container} >
                <View style={styles.header}>
                    <Ionicons
                        onPress={() => { this.props.navigation.goBack() }}
                        name="ios-arrow-back" style={{ fontSize: 30, color: "#4267B2" }}
                    />
                </View>
                <View style={styles.body}>
                    <Text style={styles.welcomeToInTown}>Enter OTP</Text>
                    <Text style={styles.regularText}>We sent an SMS to{"+923452153709"}{"\n"} please enter the code below</Text>
                    <OtpInputs otpCode={this.otpCode.bind(this)} />
                    <TouchableOpacity onPress={this.resendCode.bind(this)}>
                        <Text style={styles.resendCode}>Resend Code</Text>
                    </TouchableOpacity>
                </View>
 
                {
                    this.props.loader ?
                        <ActivityIndicator size={35} color="#4D70B6" /> :
                        null

                }

                {
                    this.props.error && this.props.error.type == 'verifiedcode' ?
                        <Text style={styles.error}>{this.props.error.message}</Text> :
                        null
                }
                {/* <View style={styles.footer}>
                    <View>
                        <NextButton func={this.sendOTP} />
                    </View>
                </View> */}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return ({
        user: state.reducer.user,
        uidAndPhone: state.reducer.uidAndPhone,
        error: state.reducer.error,
        loader: state.reducer.loader

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        verifyCode: (uidAndOTP, navigation) => {
            dispatch(verifyCode(uidAndOTP, navigation));
        },
        resendOTP: (uidAndOTP) => {
            dispatch(resendOTP(uidAndOTP));
        }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(EnterOTPCode);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#ffffff"
    },
    header: {
        flex: 1,
        width: "90%",
        justifyContent: "center",

    },
    body: {
        flex: 9,
        width: "90%",
        alignItems: "center",
    },
    footer: {
        flex: 2,
        width: "90%",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    welcomeToInTown: {
        marginTop: 30,
        fontWeight: "bold",
        fontSize: 28
    },
    regularText: {
        textAlign: "center",
        marginTop: 10,
        fontSize: 16,
        color: "grey"
    },
    resendCode: {
        // top: -50,
        fontSize: 14,
        textDecorationLine: "underline",
        color: "#5F7FBE",
        fontWeight: "bold"
    },
    error: {
        color: 'red',
        fontSize: 15,
        textAlign: "center",
        width: '80%'
    }
})

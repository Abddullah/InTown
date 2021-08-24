import React, { Component } from 'react'
import { StyleSheet, View, Text, Keyboard, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
//componets
import CountrySelector from '../../Components/countryPicker'
import ProfileImg from '../../Components/profileImage'
import NextButton from '../../Components/nextButton'
import { sendPhoneVerificationCode } from '../../store/action/user';
import { connect } from 'react-redux'

class PhoneVerification extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.updatePhone = this.updatePhone.bind(this);
    }

    sendOTP = () => {
        Keyboard.dismiss();
        console.log(this.props.user, this.state.phoneNumber);
        let uidAndPhone = { userID: this.props.user._id, phoneID: this.state.phoneNumber };
        this.props.sendPhoneVerificationCode(uidAndPhone, this.props.navigation);
        // this.props.navigation.navigate("EnterOTPCode")
    }

    updatePhone(countryCode, phoneNumber) {
        this.setState({
            phoneNumber: `+${countryCode}${phoneNumber}`
        });
    }

    render() {
        let selectedCountry = this.props.navigation.getParam('item')
        let imgPath = this.props.navigation.getParam('imgPath')
        return (
            <View style={styles.container} >

                <View style={styles.header}>
                    <Ionicons
                        name="ios-arrow-back" onPress={() => { this.props.navigation.goBack() }}
                        style={{ fontSize: 30, color: "#4267B2" }}
                    />
                </View>

                <View style={styles.body}>
                    <View style={styles.profileImg}>
                        <ProfileImg height={80} width={80} imgPath={require('../../Assets/userImg.png')} />
                    </View>
                    <View style={styles.userNameDiv}>
                        <Text style={styles.welcomeToInTown}>Hey there, John Doe</Text>
                        <Text style={styles.regularText}>Let's get started. Please enter your mobile phone number</Text>
                        <CountrySelector navigate={this.props.navigation} selectedCountry={selectedCountry} imgPath={imgPath} updatePhone={this.updatePhone} />
                        <Text style={styles.regularText}>Please enter your primary phone number used for your messaging apps. This phone number will be used by your friends to find you.</Text>
                    </View>
                </View>
                {
                    this.props.loader ?
                        <ActivityIndicator size={35} color="#4D70B6" /> :
                        null

                }
                {
                    this.props.error && this.props.error.type == 'OTP' ?
                        <Text style={styles.error}>{this.props.error.message}</Text> :
                        null
                }

                <View style={styles.footer}>
                    <View>
                        <NextButton func={this.sendOTP} />
                    </View>
                </View>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return ({
        user: state.reducer.user,
        error: state.reducer.error,
        loader: state.reducer.loader

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        sendPhoneVerificationCode: (uidAndPhone, navigation) => {
            dispatch(sendPhoneVerificationCode(uidAndPhone, navigation));
        }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerification);


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
    profileImg: {
        width: "100%",
    },
    userNameDiv: {
        width: "100%",
    },
    welcomeToInTown: {
        marginTop: 30,
        fontWeight: "bold",
        fontSize: 28
    },
    regularText: {
        marginTop: 10,
        fontSize: 16,
        color: "grey"
    },
    error: {
        color: 'red',
        marginTop: 25,
        fontSize: 15,
        textAlign: "center",
        width: '80%'
    }
})

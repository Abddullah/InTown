import React, { Component } from "react";
import {
    View, StyleSheet,
    TouchableOpacity,
    Text, TextInput,
} from 'react-native';
import ProfileImg from '../Components/profileImage'

class CountrySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialCode: "1",
            imgPath: require(`../services/resources/flags/images/us.png`),
        };
    }

    changePhoneCode() {
        this.props.navigate.navigate("CountryLists")
    }

    UNSAFE_componentWillReceiveProps(nextProp) {
        let { selectedCountry, imgPath } = nextProp
        // console.log(selectedCountry, imgPath, "ITEM")

        if (selectedCountry != undefined && imgPath != undefined) {
            // console.log(selectedCountry, imgPath, "ITEM")
            this.setState({
                dialCode: selectedCountry.dialCode,
                imgPath: imgPath
            })
        }
    }

    updatePhoneNumber(phoneNumber){
        this.setState({ phoneNumber })
        this.props.updatePhone(this.state.dialCode, phoneNumber);
    }

    render() {
        let { dialCode, phoneNumber, imgPath } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.mainInputContainer}>
                    <View style={styles.flagContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.changePhoneCode()
                            }}
                        >
                            <ProfileImg height={25} width={25} imgPath={imgPath} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputNumber}>
                    <TouchableOpacity
                        onPress={() => {
                            this.changePhoneCode()
                        }}
                    >
                        <View style={styles.countryCode}>
                            <View style={styles.countryCodeChild}>
                                <Text style={{ fontWeight: "bold" }}>{"+" + dialCode}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.inputNumberValue}>
                        <TextInput
                            keyboardType={"numeric"}
                            style={{ height: 50, width: "90%", }}
                            onChangeText={this.updatePhoneNumber.bind(this)}
                            value={phoneNumber}
                            placeholder={"Number"}
                        />
                    </View>
                </View>
                {/* <TouchableOpacity
                    style={styles.cancleNumberContainer}
                    onPress={() => {
                        this.clearNumber()
                    }}
                >
                    <Image source={require('../Assets/Shape.png')} resizeMode="contain"
                        style={{ height: "40%", width: "40%", }}
                    />
                </TouchableOpacity> */}
            </ View>
        );
    }
}

export default CountrySelector

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 50,
        marginTop: 20,
        backgroundColor: "#F6F7FB",
        borderRadius: 10
    },
    mainInputContainer: {
        borderRightColor: "#E4E5EA",
        borderRightWidth: 0.5,
        flex: 1.5,
        flexDirection: "row",
    },
    flagContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputNumber: {
        backgroundColor: "#F6F7FB",
        flex: 6,
        flexDirection: "row"
    },
    countryCode: {
        flex: 1.5,
        marginLeft: 5,
        borderColor: 'gray',
        backgroundColor: "#F6F7FB",
        justifyContent: "center",
        alignItems: "center"
    },
    countryCodeChild: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    inputNumberValue: {
        flex: 4,
        borderColor: 'gray',
        backgroundColor: "#F6F7FB",
        justifyContent: "center",
        alignItems: "center"
    },
    cancleNumberContainer: {
        flex: 0.8,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
})

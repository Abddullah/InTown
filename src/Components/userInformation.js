
import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ProfileImg from './profileImage'
import DropDown from './dropDown'
import axios from 'axios';

export default class UserInformation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dropDownShow: false
        }
    }

    logOut = () => {
        this.setState({
            dropDownShow: false
        })
        this.props.navigate.navigate("Login")
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.closeDropDown) {
            this.setState({
                dropDownShow: false
            })
        }
    }
    

    render() {
        return (
            <View
                onPress={this.props.func}
                style={styles.container}>
                {
                    this.state.dropDownShow ? <DropDown navigate={this.props.navigate} /> : null
                }
                <View style={{ flex: 1.5, }}>
                    {/* <ProfileImg height={60} width={60} imgPath={require('../Assets/userImg.png')} /> */}
                    <ProfileImg height={60} width={60} imgPath={{uri: `https://graph.facebook.com/${this.props.userFBID}/picture`}} />

                </View>
                <View style={{ flex: 6, }}>
                    <Text style={styles.youAreCurrentIn}>
                        You're currently in
                    </Text>
                    <Text style={styles.location}>
                        Kuala Lumpur, Malaysia
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.ddIcon}
                    onPress={() =>
                        this.setState({
                            dropDownShow: !this.state.dropDownShow
                        })
                    }
                >
                    <Entypo name="dots-three-vertical" style={{ fontSize: 20, color: "#4267B2" }} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: "100%"
    },
    youAreCurrentIn: {
        fontSize: 14,
        color: "grey",
        marginLeft: 20
    },
    location: {
        fontSize: 16,
        color: "#4267B2",
        fontWeight: "bold",
        marginLeft: 20
    },
    ddIcon: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
    },

})

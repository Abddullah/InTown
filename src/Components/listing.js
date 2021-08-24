import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Text, Share, StyleSheet, FlatList,ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ProfileImg from './profileImage'
import { connect } from 'react-redux'

class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendLists: [
                {
                    name: "Theresea Cooper",
                    profilePic: require("../Assets/userImg.png"),
                },
                {
                    name: "Judith Wilson",
                    profilePic: require("../Assets/friend1.png"),
                },
                {
                    name: "Dwight Watson",
                    profilePic: require("../Assets/friend2.png"),
                },
                {
                    name: "Julie Warren",
                    profilePic: require("../Assets/friend3.png"),
                },
                {
                    name: "Max Nguyen",
                    profilePic: require("../Assets/friend4.png"),
                },
                {
                    name: "Harold Robertson",
                    profilePic: require("../Assets/friend5.png"),
                },
                {
                    name: "Arthur Flores",
                    profilePic: require("../Assets/friend6.png"),
                },
                {
                    name: "Debra Richards",
                    profilePic: require("../Assets/friend7.png"),
                },
            ],
            selectedFriendCall: "",
            selectedFriendMsg: "",
        };
    }

    callFriend(key, index) {
        this.setState({
            selectedFriendCall: key
        })
        this.onShare()
    }
    msgFriend(key, index) {
        this.setState({
            selectedFriendMsg: key
        })
        this.onShare()
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    render() {
        let { friendLists, selectedFriendCall, selectedFriendMsg } = this.state
        return (
            <ScrollView>
                {
                    this.props.loader ?
                        <ActivityIndicator size={35} color="#4D70B6" /> :
                        null

                }

                {
                    this.props.allContacts.length > 0 ?
                        <FlatList
                            data={this.props.allContacts}
                            renderItem={(contact) => {
                                return (<View style={styles.container}>
                                    <View style={styles.containerChild1}>
                                        <View style={{ flex: 1.5, }}>
                                            <ProfileImg height={40} width={40} imgPath={contact.item.thumbnailPath ? ({ uri: contact.item.thumbnailPath }) : (require("../Assets/personlogo.gif"))} />
                                        </View>

                                        <View style={{ flex: 5, }}>
                                            <Text style={styles.friendName}>
                                                {contact.item.givenName + " " + contact.item.familyName}
                                            </Text>
                                        </View>

                                        <View style={styles.phoneAndMsgMainContainer}>
                                            <TouchableOpacity
                                                style={[styles.phoneAndMsgMainContainerChild, { backgroundColor: selectedFriendCall === contact.item.givenName ? "#4267B2" : null, }]}
                                                onPress={() => { this.callFriend(contact.item.givenName, index) }}
                                            >
                                                <Feather
                                                    name="phone"
                                                    style={{ fontSize: 25, color: selectedFriendCall === contact.item.givenName ? "#ffffff" : "#4267B2" }}
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.phoneAndMsgMainContainer}>
                                            <TouchableOpacity
                                                style={[styles.phoneAndMsgMainContainerChild, { backgroundColor: selectedFriendMsg === contact.item.givenName ? "#4267B2" : null, }]}
                                                onPress={() => { this.msgFriend(contact.item.givenName, index) }}
                                            >
                                                <Feather
                                                    name="message-square"
                                                    style={{ fontSize: 25, color: selectedFriendMsg === contact.item.givenName ? "#ffffff" : "#4267B2" }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                )
                            }
                            }
                        />


                        : null
                }
            </ScrollView>
        );
    }
}


function mapStateToProps(state) {
    return ({
        loader: state.reducer.loader
    })
}


export default connect(mapStateToProps, null)(Listing);



const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderBottomColor: "#F5F7FB",
        borderBottomWidth: 1,
        height: 75,
        justifyContent: "center",
        alignItems: "center",
    },
    containerChild1: {
        width: "90%",
        marginHorizontal: "5%",
        flexDirection: "row",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    friendName: {
        fontSize: 16,
        color: "#4267B2",
        fontWeight: "bold",
        marginLeft: 20
    },
    phoneAndMsgMainContainer: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
    phoneAndMsgMainContainerChild: {
        height: 40,
        width: 40,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#EDEEF1",
    },
})

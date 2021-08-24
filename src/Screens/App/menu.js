import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, PermissionsAndroid } from 'react-native'
//componets
import Listing from '../../Components/listing'
import UserInformation from '../../Components/userInformation'
import SendInvite from '../../Components/sendInvite'
import {checkContactPermission} from '../../store/action/contact';
import { connect } from 'react-redux'

class Menu extends Component {
    constructor() {
        super()
        this.state = {
            activeColor: "Nearby",
            clonseDd: false
        }
        
    }
    componentDidMount(){
        this.props.checkContactPermission();
    }
   

    activeColor(key) {
        this.setState({ activeColor: key, clonseDd: true })
    }

    render() {
        const { activeColor, clonseDd } = this.state
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <UserInformation navigate={this.props.navigation} userFBID={this.props.userFBID} closeDropDown={clonseDd} />
                </View>

                <View style={styles.body}>
                    <View style={styles.bodyChild1}>
                        <TouchableOpacity
                            style={[styles.tabBars, { borderBottomColor: activeColor === "Nearby" ? "#4267B2" : "#ffffff", }]}
                            onPress={() => this.activeColor("Nearby")}
                        >
                            <Text style={{ fontWeight: "bold", color: activeColor === "Nearby" ? "#333333" : "#838383", }}>Nearby</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tabBarsInCountry, { borderBottomColor: activeColor === "InCountry" ? "#4267B2" : "#ffffff", }]}
                            onPress={() => this.activeColor("InCountry")}
                        >
                            <Text style={{ fontWeight: "bold", color: activeColor === "InCountry" ? "#333333" : "#838383", }}>In Country</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.tabBars, { borderBottomColor: activeColor === "All" ? "#4267B2" : "#ffffff", }]}
                            onPress={() => this.activeColor("All")}
                        >
                            <Text style={{ fontWeight: "bold", color: activeColor === "All" ? "#333333" : "#838383", }}>All</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 1, }}></View>
                        <View style={{ flex: 1, }}></View>
                    </View>
                    <View style={{ flex: 8, width: "100%", }}>

                        {
                            (this.state.activeColor != "Nearby") ? (
                                <Listing allContacts={this.props.allContacts} navigate={this.props.navigation} />
                            ) :
                                <View style={styles.Nearby}>
                                    <Text style={styles.NearbyText}>Looks like you don’t have any nearby friends on In Town right now.</Text>
                                    <Text style={styles.NearbyText}>Why not invite some of your friends to join InTown?</Text>
                                    <SendInvite />
                                </View>
                        }

                    </View>
                </View>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return ({
        allContacts: state.reducer.allContacts,
        userFBID: state.reducer.user.facebookID
    })
  }
  
  function mapDispatchToProps(dispatch) {
    return ({
        checkContactPermission: () => {
             dispatch(checkContactPermission());
      }
    })
  }
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#ffffff"
    },
    header: {
        flex: 2,
        width: "90%",
        justifyContent: "center",
    },
    body: {
        flex: 9,
        width: "100%",
        alignItems: "center",
    },
    bodyChild1: {
        flex: 1,
        flexDirection: "row",
        width: "90%",
    },
    tabBars: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 3,
    },
    tabBarsInCountry: {
        flex: 1.3,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 3,
    },
    Nearby: {
        flex: 1,
        width: "90%",
        marginTop: 15,
        marginHorizontal: "5%",
        // justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red"
    },
    NearbyText: {
        marginTop: 15,
        textAlign: "center",
        color: "#4D70B6",
        fontSize: 25

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
})


import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import {logout} from '../store/action/user'

const DropDown = ({ ...props }) => {
    const { height, width } = Dimensions.get('window');
    return (
        <View style={[styles.container, { height: height / 5, }]}>
            <TouchableOpacity activeOpacity={0.95} style={styles.options}>
                <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20 }}>Change Phone Number</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.95} style={styles.options} >
                <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20 }}>Invite friends to InTown</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.95} style={styles.options} onPress={()=>props.logout(props.navigate)}>
                <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20 }}>Logout</Text>
            </TouchableOpacity>
        </View>

    );
};




  
function mapDispatchToProps(dispatch) {
    return ({
        logout: (navigation) => {
             dispatch(logout(navigation));
      }
    })
  }
  
  
export default connect(null, mapDispatchToProps)(DropDown);



const styles = StyleSheet.create({
    container: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        position: "absolute",
        top: 70,
        right: 0,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 8,
    },
    options: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        borderBottomColor: "#F5F7FB",
        borderBottomWidth: 1,
    }

})

import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import AppLogo from '../../Components/AppLogo'
import FbLogIn from '../../Components/ButtonLoginFacebook'
import { authWithFacebook, getUserSession } from '../../store/action/user';
import { connect } from 'react-redux'

class Login extends Component {
  signin = () => {
    this.props.authWithFacebook(this.props.navigation);
  }
  componentDidMount() {
    this.props.getUserSession(this.props.navigation);
  }

  render() {
    return (
      <View style={styles.container} >
        <AppLogo />
        <Text style={styles.headingText}>Welcome to InTown</Text>
        <Text style={styles.regularText}>Connect with Friends wherever{'\n'} you travel</Text>
        {/* <FbLogIn signin={this.signin} /> */}
        {
          this.props.user == null ?
            <ActivityIndicator style={styles.loader} size={35} color="#4D70B6" /> :
            <FbLogIn signin={this.signin} />
        }

        {
          this.props.loader ?
            <ActivityIndicator style={styles.loader} size={35} color="#4D70B6" /> :
            null

        }

        {
          this.props.error && this.props.error.type == 'facebook' ?
            <Text style={styles.error}>{this.props.error.message}</Text> :
            null
        }

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
    authWithFacebook: (navigation) => {
      dispatch(authWithFacebook(navigation));
    },
    getUserSession: (navigation) => {
      dispatch(getUserSession(navigation));
    },
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#ffffff"
  },
  headingText: {
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
  loader: {
    marginTop: 100
  },
  error: {
    color: 'red',
    marginTop: 25,
    fontSize: 15,
    textAlign: "center"
  }
})

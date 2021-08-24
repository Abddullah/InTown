
// import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '../Screens/Authentication/login';
import PhoneVerification from '../Screens/Authentication/phoneVerification';
import CountryLists from '../Screens/Authentication/countryLists';
import EnterOTPCode from '../Screens/Authentication/enterOTP';
import Menu from '../Screens/App/menu';

//Authentication Routs
const AuthStack = createStackNavigator({
  Login: { screen: Login },
  Menu: { screen: Menu },
  PhoneVerification: { screen: PhoneVerification },
  CountryLists: { screen: CountryLists },
  EnterOTPCode: { screen: EnterOTPCode },
},
  {
    headerMode: 'none',
  }
);

//App Routs
// const AppStack = createStackNavigator(
//   {
//     Menu: { screen: Menu },
//   },
//   {
//     headerMode: 'none',
//   },
// );


export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      // App: AppStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
)


import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import Welcome from './Auth/Welcome';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Home from './Main/Home';
import ForgotPassword from './Auth/ForgotPassword';
import Reset from './Auth/Reset';

const AuthStack = createStackNavigator();

export const AuthNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch === true) {
    routeName = 'Welcome';
  } else {
    routeName = 'Login';
  }
  return (
    <AuthStack.Navigator headerMode="none" initialRouteName={routeName}>
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="Reset" component={Reset} />
    </AuthStack.Navigator>
  );
};
export const HomeNavigation = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Home" component={Home} />
    </AuthStack.Navigator>
  );
};

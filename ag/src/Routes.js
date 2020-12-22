import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './Auth/AuthProvider';
import {StatusBar} from 'react-native';

import {AuthNavigation, HomeNavigation} from './navigation';
import Spinner from './Auth/components/Spinner';
const Stack = createStackNavigator();

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (users) => {
    setUser(users);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return <Spinner />;
  }

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {user ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;

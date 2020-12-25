import React, {useContext, useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from '../Auth/AuthProvider';
import {AuthNavigation, MainNavigation} from './navigation';
import Spinner from '../Auth/components/Spinner';
const Stack = createStackNavigator();

const Routes = () => {
  const {user, setUser, loggedIn} = useContext(AuthContext);
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
  });

  if (initializing) {
    return <Spinner />;
  }

  return (
    <>
      {user || loggedIn ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="MainNavigation" component={MainNavigation} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Routes;

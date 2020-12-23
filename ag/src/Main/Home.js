import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {AuthContext} from '../Auth/AuthProvider';

const Home = () => {
  const {logout, googleOut} = useContext(AuthContext);
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <RectButton
        height={40}
        width={'60%'}
        backgroundColor="green"
        onPress={() => {
          logout();
          googleOut();
        }}>
        <Text color="white">Welcome</Text>
      </RectButton>
    </View>
  );
};

export default Home;

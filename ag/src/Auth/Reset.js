/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ButtonIcon from './components/ButtonIcon';
import Spinner from './components/Spinner';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: '30%',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    left: 30,
    top: 0,
    height: 68,
    width: '80%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    color: '#171717',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  heading1: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 24,
    color: '#171717',
    opacity: 0.6,
    paddingLeft: 5,
    paddingRight: 5,
  },
  textInputContainer: {
    marginTop: 44.96,
    width: '80%',
    left: 35,
  },
});

const Reset = ({navigation}) => {
  const [loading, setIsloading] = useState(false);
  return (
    <View flex={1} backgroundColor="#ffffff">
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>PASSWORD RESET SUCCESSFUL</Text>
          <Text style={styles.heading1}>
            Please follow the link in the email sent to you to reset your
            password, and try logging in with the new password.
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <ButtonIcon
            name="sign-in-alt"
            onPress={() => navigation.navigate('Login')}
            label="Login"
            style={{width: '100%'}}
            color="#fff"
          />
          {loading && <Spinner />}
        </View>
      </View>
    </View>
  );
};

export default Reset;

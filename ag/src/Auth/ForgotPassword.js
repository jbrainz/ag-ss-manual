/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Alert, Keyboard} from 'react-native';
import {BorderlessButton, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonIcon from './components/ButtonIcon';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AuthContext} from './AuthProvider';
import Spinner from './components/Spinner';

const ForgotPasswordScehma = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('This field is required'),
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: '30%',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    left: 10,
    top: 0,
    height: 68,
    width: '80%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#171717',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 32,
  },
  heading1: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#171717',
    opacity: 0.6,
    marginTop: 8.8,
  },
  textInputContainer: {
    marginTop: 44.96,
    width: '80%',
    left: 35,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#3E3E3E',
    marginLeft: 10,
    marginBottom: 5,
    opacity: 0.8,
  },
  textInput: {
    paddingLeft: 20,
    height: 50,
    borderRadius: 24.5,
    backgroundColor: '#ddd',
    opacity: 0.7,
    width: '100%',
  },
});

const ForgotPassword = ({navigation}) => {
  const {forgotPassword, newErrors, setEr} = useContext(AuthContext);
  const [loading, setIsloading] = useState(false);
  const {handleChange, handleBlur, handleSubmit, errors, touched} = useFormik({
    validationSchema: ForgotPasswordScehma,
    initialValues: {email: ''},
    onSubmit: (value) => {
      Keyboard.dismiss();
      setIsloading(true);
      setTimeout(
        () => {
          forgotPassword(value.email);
        },
        800,
        () => console.log(newErrors),
      );
    },
  });

  return (
    <View flex={1} backgroundColor="#ffffff">
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>Password Reset</Text>
          <Text style={styles.heading1}>
            Please provide your email to continue
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Please Enter Email"
            placeholderTextColor="#3E3E3E"
            style={[
              styles.textInput,
              {
                borderColor: errors.email && touched.email ? 'red' : '#00A76E',
                borderWidth: 1,
              },
            ]}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            autoCompleteType="email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errors.email && touched.email && (
            <Text
              style={{
                paddingLeft: 10,
                color: 'red',
              }}>
              {errors.email}
            </Text>
          )}

          {newErrors !== ''
            ? Alert.alert('Invalid Login', newErrors, [
                {
                  text: 'OK',
                  onPress: () => {
                    setEr(false);
                    setIsloading(false);
                  },
                },
              ])
            : null}
          <ButtonIcon
            onPress={() => handleSubmit()}
            name="redo"
            label="Reset"
            style={{width: '100%'}}
            color="#fff"
          />
          {loading && <Spinner />}
          <View marginTop={10}>
            <BorderlessButton
              rippleColor="transparent"
              onPress={() => navigation.navigate('SignUp')}
              style={{
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '5%',
                flexDirection: 'row',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: '#3E3E3E',
                  opacity: 0.8,
                  fontSize: 14,
                  lineHeight: 24,
                  textDecorationLine: 'underline',
                }}>
                Don't have an account?{' '}
              </Text>
              <Text
                style={{
                  color: '#00A76E',
                  opacity: 0.8,
                  fontSize: 14,
                  lineHeight: 24,
                }}>
                {' '}
                Sign Up
              </Text>
            </BorderlessButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

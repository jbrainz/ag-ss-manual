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

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password is too short')
    .max(50, 'Too Long!')
    .required('This field is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('This field is required'),
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: '10%',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    left: 35,
    top: 0,
    height: 68,
    width: '80%',
    padding: 5,
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

const Login = ({navigation}) => {
  const {login, newErrors, setEr, _signIn} = useContext(AuthContext);
  const [loading, setIsloading] = useState(false);
  const {handleChange, handleBlur, handleSubmit, errors, touched} = useFormik({
    validationSchema: LoginSchema,
    initialValues: {email: '', password: ''},
    onSubmit: (value) => {
      Keyboard.dismiss();
      setIsloading(true);
      setTimeout(
        () => {
          login(value.email, value.password);
        },
        800,
        () => console.log(newErrors),
      );
    },
  });
  const [eye, setEye] = useState(false);

  return (
    <View flex={1}>
      <View flex={1} backgroundColor="#ffffff">
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Let's sign you in</Text>
            <Text style={styles.heading1}>
              Welcome back, please sign in to continue
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
                  borderColor:
                    errors.email && touched.email ? 'red' : '#00A76E',
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
            <Text style={[styles.label, {marginTop: 18}]}>Pasword</Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextInput
                placeholder="Please Enter Password"
                placeholderTextColor="#3E3E3E"
                style={[
                  styles.textInput,
                  {
                    borderColor:
                      errors.password && touched.password ? 'red' : '#00A76E',
                    borderWidth: 1,
                  },
                ]}
                secureTextEntry={eye ? false : true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <Icon
                onPress={() => setEye((prev) => !prev)}
                style={{
                  top: '37%',
                  right: 10,
                  position: 'absolute',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
                name={eye ? 'eye' : 'eye-slash'}
                size={14}
                color={eye ? 'red' : '#444'}
              />
            </View>
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
            <BorderlessButton
              onPress={() => navigation.navigate('ForgotPassword')}
              rippleColor="transparent"
              style={{
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end',
                marginTop: 30,
                alignItems: 'center',
                width: 100,
                left: '55%',
              }}>
              <Text
                style={{
                  color: '#3E3E3E',
                  opacity: 0.8,
                  fontSize: 14,
                  lineHeight: 24,
                }}>
                Forgot Password?
              </Text>
            </BorderlessButton>
            <ButtonIcon
              onPress={() => handleSubmit()}
              name="sign-in-alt"
              label="Sign In"
              style={{width: '100%', marginTop: -30}}
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
          <View
            flexDirection="row"
            marginTop={40}
            justifyContent="center"
            alignItems="center">
            <View
              style={{
                justifyContent: 'center',
                height: 0.5,
                backgroundColor: '#3E3E3E',
                width: 100,
                marginRight: 10,
              }}
            />
            <Text
              style={{
                fontWeight: 'normal',
                color: '#3E3E3E',
                opacity: 0.6,
              }}>
              OR
            </Text>
            <View
              style={{
                justifyContent: 'center',
                height: 0.5,
                backgroundColor: '#3E3E3E',
                width: 100,
                marginLeft: 10,
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <ButtonIcon
              onPress={() => _signIn()}
              name="google"
              color="#00A76E"
              textStyle={{color: '#444', marginLeft: 10}}
              style={{
                width: 150,
                backgroundColor: '#fff',
                flexDirection: 'row-reverse',
              }}
              label="Google"
            />
            <ButtonIcon
              textStyle={{marginLeft: 10}}
              label="Facebook"
              name="facebook"
              color="#fff"
              style={{
                width: 150,
                backgroundColor: 'blue',
                flexDirection: 'row-reverse',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

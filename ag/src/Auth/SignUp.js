/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Keyboard, Alert} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BorderlessButton, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ButtonIcon from './components/ButtonIcon';
import {AuthContext} from './AuthProvider';
import Spinner from './components/Spinner';

const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  passwordComfirmation: Yup.string()
    .min(6, 'Too Short')
    .required('Required')
    .equals([Yup.ref('password')], "Password don't match"),
  email: Yup.string().email('Invalid email').required('Required'),
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
    marginTop: '5%',
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

const SignUp = ({navigation}) => {
  const {register, newErrors, setEr, _signIn} = useContext(AuthContext);
  const [loading, setIsloading] = useState(false);
  const {handleChange, handleBlur, handleSubmit, touched, errors} = useFormik({
    validationSchema: SignUpSchema,
    initialValues: {
      email: '',
      password: '',
      passwordComfirmation: '',
      remember: true,
    },
    onSubmit: (value) => {
      setIsloading(true);

      register(value.email, value.password);
    },
  });
  const [eye, setEye] = useState(false);
  const [eyeC, setEyeC] = useState(false);

  return (
    <View flex={1} onPress={() => Keyboard.dismiss()}>
      <View flex={1} backgroundColor="#ffffff">
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Getting Started</Text>
            <Text style={styles.heading1}>Create an account to continue!</Text>
          </View>
          <View style={styles.textInputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Please Enter Email"
              placeholderTextColor="#3E3E3E"
              style={[
                styles.textInput,
                {
                  borderColor: errors.email && touched.email ? 'red' : '#fff',
                  borderWidth: 1,
                },
              ]}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCompleteType="email"
              autoCapitalize="none"
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
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TextInput
                placeholder="Please Enter Password"
                placeholderTextColor="#3E3E3E"
                style={[
                  styles.textInput,
                  {
                    borderColor:
                      errors.password && touched.password ? 'red' : '#fff',
                    borderWidth: 1,
                  },
                ]}
                secureTextEntry={eye ? false : true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCapitalize="none"
                autoCompleteType="password"
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
            {errors.password && touched.password && (
              <Text
                style={{
                  paddingLeft: 10,
                  color: 'red',
                }}>
                {errors.password}
              </Text>
            )}
            <Text style={[styles.label, {marginTop: 18}]}>Comfirm pasword</Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TextInput
                placeholder="Comfirm Password"
                placeholderTextColor="#3E3E3E"
                style={[
                  styles.textInput,
                  {
                    borderColor:
                      errors.passwordComfirmation &&
                      touched.passwordComfirmation
                        ? 'red'
                        : '#fff',
                    borderWidth: 1,
                  },
                ]}
                secureTextEntry={eyeC ? false : true}
                onChangeText={handleChange('passwordComfirmation')}
                onBlur={handleBlur('passwordComfirmation')}
                autoCapitalize="none"
                autoCompleteType="password"
              />
              <Icon
                onPress={() => setEyeC((prev) => !prev)}
                style={{
                  top: '37%',
                  right: 10,
                  position: 'absolute',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
                name={eyeC ? 'eye' : 'eye-slash'}
                size={14}
                color={eyeC ? 'red' : '#444'}
              />
            </View>
            {errors.password && touched.password && (
              <Text
                style={{
                  paddingLeft: 10,
                  color: 'red',
                }}>
                {errors.password}
              </Text>
            )}
            <ButtonIcon
              onPress={handleSubmit}
              name="sign-in-alt"
              label="Sign Up"
              style={{width: '100%', marginTop: -20}}
              color="#fff"
            />
            {newErrors !== ''
              ? Alert.alert('Email Already registered', newErrors, [
                  {
                    text: 'OK',
                    onPress: () => {
                      setEr(false);
                      setIsloading(false);
                    },
                  },
                ])
              : null}
            {loading && <Spinner />}
            <BorderlessButton
              rippleColor="transparent"
              onPress={() => navigation.navigate('Login')}
              style={{
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '5%',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#3E3E3E',
                  opacity: 0.8,
                  fontSize: 14,
                  lineHeight: 24,
                }}>
                Already have an account?{' '}
              </Text>
              <Text
                style={{
                  color: '#00A76E',
                  opacity: 0.8,
                  fontSize: 14,
                  lineHeight: 24,
                }}>
                {' '}
                Sign in
              </Text>
            </BorderlessButton>
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
              onPress={() => {
                _signIn();
                setIsloading(true);
              }}
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

export default SignUp;

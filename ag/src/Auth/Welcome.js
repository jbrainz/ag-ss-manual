/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import ButtonIcon from './components/ButtonIcon';

const {height, width} = Dimensions.get('window');

const nWidth = 0.12 * width;
const nHeight = 0.4 * height;
const topH = nHeight - 32 / 2 + 164;
const left = nWidth - 32 / 2;

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 305,
    backgroundColor: '#fff',
    top: topH,
    left: left,
    borderRadius: 15,
    elevation: 6,
    paddingTop: 10,
  },
  text: {
    height: 32,
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    letterSpacing: -0.8,
    color: '#171717',
  },
  subText: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 24,
    color: '#171717',
    opacity: 0.6,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
const Welcome = ({navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView backgroundColor="#fff" flex={1}>
      <View style={styles.box}>
        <View style={styles.boxText}>
          <Text style={styles.text}>WELCOME</Text>
          <Text style={styles.subText}>
            AG Sunday School study manual 2021 with free commentary is a free
            study manual for all sunday school lovers
          </Text>
        </View>
        <View style={{marginBottom: insets.bottom, paddingBottom: 10}}>
          <ButtonIcon
            onPress={() => navigation.navigate('Login')}
            name="arrow-right"
            label="Get started"
            color="#fff"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

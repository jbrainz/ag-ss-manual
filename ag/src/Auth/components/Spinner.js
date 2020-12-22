/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';

const spin = require('../../assets/img/loading.gif');

const Spinner = () => {
  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        top: '40%',
        left: '40%',
        backgroundColor: 'transparent',
      }}
      justifyCointent="center"
      alignItems="center"
      flex={1}>
      <Image source={spin} style={{height: 50, width: 50}} />
    </View>
  );
};

export default Spinner;

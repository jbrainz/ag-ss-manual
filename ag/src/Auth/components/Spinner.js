/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';

const spin = require('../../assets/img/loading.gif');

const Spinner = () => {
  return (
    <View justifyCointent="center" alignItems="center" flex={1}>
      <Image source={spin} style={{height: 100, widht: 100}} />
    </View>
  );
};

export default Spinner;

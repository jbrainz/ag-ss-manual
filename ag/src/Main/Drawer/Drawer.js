/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import DrawerItems from './DrawerItems';

const {width} = Dimensions.get('window');
export const DRAWER_WIDTH = width * 0.8;
const aspectRatio = 600 / 600;
const height = DRAWER_WIDTH * aspectRatio;
import {data} from '../../data';
import {ScrollView} from 'react-native-gesture-handler';

const logo = require('../assets/img/agLogo.png');
const DrawerContent = () => {
  return (
    <View flex={1}>
      <StatusBar backgroundColor="#1982c4" />
      <View flex={0.2} backgroundColor="#fff">
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            borderBottomRightRadius: 75,
            bottom: 0,
            right: 0,
            backgroundColor: '#1982c4',
            overflow: 'hidden',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#fff',
                fontFamily: 'ContiSans-Bold',
                textTransform: 'uppercase',
              }}>
              Ag Sunday School Manual 2021
            </Text>
          </View>
        </View>
      </View>
      <View flex={0.8}>
        <View flex={1} backgroundColor="#1982c4" />
        <View flex={1} backgroundColor="#1982c4" />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            borderTopLeftRadius: 75,
            borderBottomRightRadius: 75,
            backgroundColor: '#fff',
            justifyContent: 'center',
            padding: 25,
          }}>
          <View
            style={{
              position: 'absolute',
              left: DRAWER_WIDTH / 2 - 60,
              right: 0,
              top: -50,
              width: 120,
              height: 120,
            }}>
            <Image
              source={logo}
              style={{
                ...StyleSheet.absoluteFillObject,
                width: undefined,
                height: undefined,
              }}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, marginTop: 40}}>
            {data.map(({topic, key, lesson}) => (
              <DrawerItems key={key} number={lesson} label={topic} />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default DrawerContent;

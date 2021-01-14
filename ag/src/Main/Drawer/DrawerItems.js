/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useNavigation, DrawerActions} from '@react-navigation/native';

import {AuthContext} from '../../Auth/AuthProvider';

const DrawerItems = ({label, number}) => {
  const {navigateData} = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 10}}>
      <RectButton
        onPress={() => {
          navigateData(label);
          navigation.dispatch(DrawerActions.closeDrawer());
        }}
        rippleColor="#1982c4"
        style={{
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          height: 30,
          borderWidth: 2,
          borderColor: '#000',
          opacity: 0.5,
          paddingRight: 10,
          flexDirection: 'row',
        }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: '#000',
            opacity: 1,
            fontSize: 14,
            fontFamily: 'Conti-sans',
            textAlign: 'left',
            fontWeight: 'bold',
            lineHeight: 14,
            padding: 10,
            textTransform: 'capitalize',
          }}>
          <Text
            style={{
              opacity: 0,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}>
            {number}:{' '}
          </Text>
          {label}
        </Text>
      </RectButton>
    </View>
  );
};

export default DrawerItems;

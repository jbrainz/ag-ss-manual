/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const {height, width} = Dimensions.get('window');

const wHeight = height * 0.2;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    backgroundColor: '#ffffff',
    top: '20%',
    left: '10%',
    borderRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1%',
  },
  text: {
    color: '#2C2C2C',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  main: {
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '5%',
  },
  subText: {
    fontWeight: 'normal',
    color: '#2C2C2C',
    fontSize: 14,
    lineHeight: 18,
    marginTop: '0.2%',
    opacity: 0.5,
  },
});
const Lessons = () => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.row}>
          <Text style={styles.text}>Jeosophat the brave</Text>
          <Icon name="star" color="#5855FE" size={16} />
        </View>
        <View style={{marginTop: '2%'}}>
          <Text style={[styles.subText, {textAlign: 'left', padding: 10}]}>
            He removed the foreign altars and the high places, smashed the
            sacred stones and cut down the Asherah poles.
            <Text
              style={[
                styles.text,
                {
                  fontWeight: 'bold',
                  textTransform: 'none',
                  color: '#d00000',
                },
              ]}>
              II Chron. 14:3
            </Text>
          </Text>
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', color: '#6c757d'}}>
            Central Truth:
          </Text>
          <Text
            style={{
              textAlign: 'center',
              paddingLeft: 10,
              paddingRight: 10,
              marginBottom: '4%',
              color: '#2C2C2C',
              opacity: 0.6,
              fontWeight: '800',
              fontSize: 12,
            }}>
            "Genorosity is an essential to Godly living".
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: '5%',
          }}>
          <Text style={[styles.subText, {fontWeight: 'normal'}]}>Today</Text>
          <Text
            style={[styles.subText, {fontWeight: 'bold', color: '#5855FE'}]}>
            Lesson 1
          </Text>
          <Text style={styles.subText}>Read more...</Text>
        </View>
      </View>
    </View>
  );
};

export default Lessons;

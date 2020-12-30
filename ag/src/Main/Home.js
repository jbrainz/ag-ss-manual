/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Dimensions, StyleSheet, TextInput, Image} from 'react-native';
import {AuthContext} from '../Auth/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {useScrollHandler} from 'react-native-redash';

import Lessons from './components/Lessons';
import {FlatList, RectButton} from 'react-native-gesture-handler';

const background = require('../assets/img/sec.png');
const {height, width} = Dimensions.get('window');

const wHeight = height * 0.2;
import {data} from '../data';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: wHeight * 0.8,
    width,
    elevation: 2,
    borderBottomRightRadius: 50,
  },
  textInput: {
    height: 52,
    borderRadius: 20,
    backgroundColor: '#ddd',
    opacity: 0.7,
    width: '70%',
    marginLeft: 30,
    marginTop: wHeight * 0.3,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const Home = ({navigation}) => {
  const {logout, googleOut} = useContext(AuthContext);
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <View
        style={{
          top: 0,
          position: 'relative',
          left: 0,
          bottom: 0,
        }}>
        <View style={styles.container}>
          <Image
            source={background}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: undefined,
              height: undefined,
              flex: 1,
              borderBottomRightRadius: 50,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View
              style={[
                styles.textInput,
                {
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                },
              ]}>
              <Icon name="search" size={16} color="#2C2C2C" />
              <TextInput
                placeholder="Search"
                placeholderTextColor="#2C2C2C"
                autoCapitalize="none"
                style={{width: '50%'}}
              />
              <Icon name="microphone" size={19} color="#5855FE" />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: wHeight * 0.3,
              }}>
              <RectButton
                style={{
                  borderColor: '#fff',
                  borderWidth: 2,
                  height: 40,
                  width: 40,
                  backgroundColor: '#5855FE',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  elevation: 4,
                  opacity: 0.8,
                }}
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <Icon name="bars" size={20} color="#fff" />
              </RectButton>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            position: 'relative',
            top: 0,
            left: 0,
            height: '40%',
          }}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <Lessons
                key={item.key}
                date={item.date}
                topic={item.topic}
                memVerse={item.mv}
                centralTruth={item.centralTruth}
                outline={item.lessonOutline}
                verse={item.verse}
                number={item.lesson}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Home;
{
  /* <RectButton
        height={40}
        width={'60%'}
        backgroundColor="green"
        style={{marginTop: '80%'}}
        onPress={() => {
          logout();
          googleOut();
        }}>
        <Text color="white">Welcome</Text>
      </RectButton> */
}

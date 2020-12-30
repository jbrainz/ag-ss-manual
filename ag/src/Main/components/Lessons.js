/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {BorderlessButton, ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/FontAwesome5';

const {height, width} = Dimensions.get('window');

const wHeight = height * 0.5;
const nHeight = height * 0.55;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#fff',
    left: '5%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    overflow: 'hidden',
    bottom: '10%',
    marginTop: height / 4,
    top: '-10%',
  },
  row: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1982c4',
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 75,
    borderTopRightRadius: 5,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 18,
    textTransform: 'uppercase',
    fontFamily: 'Retroica',
    width: '70%',
    textAlign: 'center',
  },
  subText: {
    fontWeight: 'normal',
    color: '#2C2C2C',
    fontSize: 14,
    lineHeight: 18,
    marginTop: '0.2%',
    opacity: 0.8,
    fontFamily: 'Conti-sans',
  },
});
const Lessons = ({
  date,
  topic,
  memVerse,
  centralTruth,
  lesson,
  verse,
  outline,
  number,
}) => {
  const [read, setRead] = useState(false);

  const NewView = read ? ScrollView : View;
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, {height: read ? nHeight : wHeight}]}>
      <View style={[styles.row, {height: read ? '20%' : '30%'}]}>
        <Text
          style={[
            styles.text,
            {textAlign: 'left', padding: 5, fontSize: 15, color: '#ffb703'},
          ]}>
          {number}.
        </Text>
        <Text style={styles.text}> {topic}</Text>
      </View>
      <View backgroundColor="#1982c4">
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 75,
            height: '100%',
          }}>
          <View style={{padding: '5%', marginBottom: 20}}>
            <Text
              style={[
                styles.subText,
                {textAlign: 'center', fontWeight: 'bold'},
              ]}>
              Memory Verse
            </Text>
            <View
              marginTop={5}
              backgroundColor="#b8bedd"
              height={1}
              width="80%"
              marginLeft="10%"
            />
            <Text
              style={[
                styles.subText,
                {
                  textAlign: 'left',
                  padding: 10,
                },
              ]}>
              {memVerse}.
              <Text
                style={[
                  styles.text,
                  {
                    fontWeight: 'bold',
                    color: '#d00000',
                    fontSize: 12,
                    fontFamily: 'Retroica',
                    textTransform: 'uppercase',
                  },
                ]}>
                {' '}
                {verse} (KJV)
              </Text>
            </Text>
            <View style={{height: read ? '60%' : undefined}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  backgroundColor="#dee2e6"
                  marginTop="5%"
                  style={{
                    borderRadius: 10,
                    padding: 10,
                    borderWidth: 0.5,
                    borderColor: '#fdfffc',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#6c757d',
                      marginBottom: 10,
                      fontFamily: 'ContiSans-Bold',
                    }}>
                    Central Truth:
                  </Text>
                  <View
                    backgroundColor="#b8bedd"
                    height={1}
                    width="40%"
                    marginLeft="30%"
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      padding: 10,
                      fontWeight: '800',
                    }}>
                    <Icon
                      style={{paddingRight: 10}}
                      name="quote-left"
                      color="#6c757d"
                      size={10}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginBottom: '4%',
                        color: '#2C2C2C',
                        opacity: 0.6,
                        fontSize: 12,
                        fontFamily: 'ContiSans-Bold',
                      }}>
                      {' '}
                      {centralTruth}{' '}
                    </Text>
                    <Icon name="quote-right" color="#6c757d" size={10} />
                  </Text>
                </View>
                {read ? (
                  <View
                    style={{
                      borderRadius: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#6c757d',
                        marginBottom: 10,
                        fontFamily: 'ContiSans-Bold',
                      }}>
                      Lesson Outline:
                    </Text>
                    <View
                      backgroundColor="#b8bedd"
                      height={1}
                      width="40%"
                      marginLeft="30%"
                    />

                    <Text
                      style={{
                        color: '#2C2C2C',
                        opacity: 0.9,
                        fontSize: 14,
                        fontFamily: 'Conti-sans',
                        textAlign: 'left',
                        fontWeight: 'normal',
                        lineHeight: 18,
                      }}>
                      {outline}
                    </Text>
                  </View>
                ) : null}
              </ScrollView>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: '5%',
                  paddingRight: '5%',
                  alignItems: 'flex-end',
                }}>
                <Text style={[styles.subText, {fontWeight: 'normal'}]}>
                  {date}
                </Text>
                <Text
                  style={[
                    styles.subText,
                    {
                      fontWeight: 'bold',
                      color: '#1982c4',
                      textTransform: 'uppercase',
                    },
                  ]}>
                  {lesson}
                </Text>
                <BorderlessButton
                  onPress={() => setRead((prev) => !prev)}
                  rippleColor="transparent">
                  <Text
                    style={[styles.subText, {textDecorationLine: 'underline'}]}>
                    {read ? 'Close' : 'Read more'}
                  </Text>
                </BorderlessButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Lessons;

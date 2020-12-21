import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    height: 44,
    width: 280,
    backgroundColor: '#00A76E',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#111111',
  },
  text: {
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    textTransform: 'uppercase',
    marginLeft: 70,
  },
});

/**
 *
 * @param {Custom Button} param0 Custom button for icon related Button
 */
const ButtonIcon = ({onPress, label, name, style, textStyle, color}) => {
  return (
    <View marginTop={48}>
      <RectButton style={[styles.button, {...style}]} {...{onPress}}>
        <Text style={[styles.text, {...textStyle}]}>{label}</Text>
        <Icon {...{name}} size={15} {...{color}} />
      </RectButton>
    </View>
  );
};
export default ButtonIcon;

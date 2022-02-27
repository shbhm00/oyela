import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {vw, vh} from '../utils/dimension';
export default function Button({title, icon, width, onPress, disabled}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        {width: vw(width), backgroundColor: disabled ? '#D3D3D3' : '#FF367F'},
      ]}
      onPress={() => onPress()}>
      <Text style={styles.buttonText}>{title}</Text>
      {icon && <Image source={icon} />}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: vh(52),
    borderRadius: 25,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: vw(16),
    fontWeight: '600',
    color: 'white',
    marginRight: vw(9),
  },
});

import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {vh, vw} from '../utils/dimension';

export default function Input({
  placeHolder,
  value,
  onChangeText,
  onSubmit,
  maxLength,
  keyboardType,
}) {
  return (
    <View>
      <TextInput
        style={{
          paddingVertical: vh(11),
          borderBottomWidth: 0.5,
          borderBottomColor: '#DDDDDD',
          width: '80%',
          marginHorizontal: vh(28),
          marginVertical: vh(15),
        }}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        onSubmit={onSubmit}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    </View>
  );
}
const styles = StyleSheet.create({});

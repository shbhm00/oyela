import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import {Success, Glitter} from '../assests/index';
import Button from '../components/button';
import {vh, vw} from '../utils/dimension';
export default function Verified() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const sparkel = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(fadeAnim, {
      toValue: 1,
      damping: 10,
      useNativeDriver: true,
    }).start();
    Animated.spring(sparkel, {
      toValue: 1,
      tension: 5,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Animated.Image
          source={Success}
          style={{position: 'absolute', transform: [{scale: fadeAnim}]}}
        />
        <Animated.Image
          source={Glitter}
          style={{position: 'absolute', transform: [{scale: sparkel}]}}
        />
        <Text style={styles.phone}>Phone Number Verified</Text>
        <View style={{top: vh(190)}}>
          <Text style={styles.textStyle}>Congratulations,your phone</Text>
          <Text style={styles.textStyle}>number has been verified.You can</Text>
          <Text style={styles.textStyle}>start using your app</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <View style={{top: vh(280), alignItems: 'center'}}>
          <Button width={320} title="Continue" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  phone: {
    top: vh(170),
    fontSize: vw(22),
    lineHeight: vh(32),
    fontWeight: '400',
  },
  textStyle: {
    textAlign: 'center',
  },
});

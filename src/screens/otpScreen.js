import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import {Logo} from '../assests';
import Button from '../components/button';
import Input from '../components/textInput';
import {vh, vw} from '../utils/dimension';
import {useSelector} from 'react-redux';
export default function OtpScreen({navigation}) {
  const [counter, setCounter] = React.useState(59);
  const [OTP, setOTP] = useState(null);
  const [disable, setDisable] = useState(true);
  const selector = useSelector(state => state);
  console.log('selector', selector);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const onchange = text => {
    if (text.length === 6) {
      setOTP(text);
      setDisable(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={Logo} />
        <Text style={styles.otpText}>Enter OTP</Text>
        <Text style={styles.otpPara}>The code was sent to this number</Text>
        <Text style={styles.otpPara}>{selector.Reducer.mobile}</Text>
      </View>
      <View style={styles.otpContainer}>
        <Input
          placeHolder="OTP"
          maxlength={6}
          onChangeText={text => onchange(text)}
          keyboardType="numeric"
        />
        <Button
          disabled={disable}
          width={Platform.OS == 'ios' ? vw(320) : vw(250)}
          title="Verify"
          onPress={() => navigation.navigate('Verify')}
        />
        <Text style={styles.timer}>{counter}</Text>
        <Text style={styles.didnt}>
          Didn't receive otp?{' '}
          <Text onPress={() => setCounter(59)} style={{color: '#54A5DA'}}>
            Resend
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: vh(70),
  },
  otpText: {
    paddingTop: vh(20),
    fontSize: vw(22),
    lineHeight: vh(33),
  },
  timer: {
    textAlign: 'center',
    marginTop: vh(15.5),
    fontSize: vw(15),
    lineHeight: vh(22.5),
    color: '#54A5DA',
  },
  otpPara: {
    fontSize: vw(14),
    lineHeight: vh(20),
    textAlign: 'center',
    color: '#858585',
  },
  otpContainer: {
    marginTop: vh(70),
    marginHorizontal: vw(24),
  },
  didnt: {
    textAlign: 'center',
    fontSize: vw(14),
    lineHeight: vh(21),
  },
});

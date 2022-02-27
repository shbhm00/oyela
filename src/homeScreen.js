import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {vw, vh, normalize} from './utils/dimension';
import Modal from 'react-native-modal';
import {
  Background,
  Heading,
  RightArrow,
  CheckBox,
  AfterModalBackground,
  Checked,
} from './assests/index';
import Button from './components/button';
import Input from './components/textInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Gender, Age} from './model/gender';
import {useDispatch} from 'react-redux';
import {mobileNumber} from './actions/actions';
export default function HomeScreen({navigation}) {
  const screenHeight = Dimensions.get('window').height;
  const [isVisible, setVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState(-1);
  const [selectedAge, setSelectedAge] = useState(-1);
  const [isChecked, setChecked] = useState(false);
  const [validation, setValidation] = useState(() => ({
    firstName: true,
    lastName: true,
    UserName: true,
    phone: true,
  }));
  const dispatch = useDispatch();
  console.log(screenHeight);

  const onchange = text => {
    if (text.length === 10) {
      dispatch(mobileNumber(text));
    } else {
      null;
    }
  };
  const validate = (text, pattern) => {
    console.log(text, pattern);
    return new RegExp(pattern).test(text);
  };
  const renderModal = () => {
    return (
      <Modal
        scrollHorizontal
        coverScreen
        avoidKeyboard
        animationInTiming={500}
        animationOutTiming={500}
        style={styles.modelContainer}
        isVisible={isVisible}>
        <KeyboardAwareScrollView style={styles.keyboard}>
          <View style={styles.keyboardContainer}>
            <Text
              style={{fontSize: vw(22), lineHeight: vh(33), fontWeight: '400'}}>
              Register
            </Text>
            <Text style={styles.signUpMessage}>Sign up to get started </Text>
          </View>
          <Input
            placeHolder="First Name"
            onChangeText={text =>
              setValidation(v => ({
                ...v,
                firstName: validate(text, /[a-zA-Z]{3,}/),
              }))
            }
          />
          <Text style={styles.errorMessage}>
            {validation.firstName ? '' : 'Enter Valid First Name'}
          </Text>
          <Input
            placeHolder="Last Name"
            onChangeText={text =>
              setValidation(v => ({
                ...v,
                lastName: validate(text, /[a-zA-Z]{3,}/),
              }))
            }
          />
          <Text style={styles.errorMessage}>
            {validation.lastName ? '' : 'Enter Valid Last Name'}
          </Text>
          <Input
            placeHolder="Username"
            onChangeText={text =>
              setValidation(v => ({
                ...v,
                UserName: validate(text, /[a-zA-Z0-9_]{3,}/),
              }))
            }
          />
          <Text style={styles.errorMessage}>
            {validation.UserName ? '' : 'Enter Valid UserName'}
          </Text>
          <Input
            placeHolder="Mobile Number"
            maxLength={10}
            keyboardType="numeric"
            onChangeText={text => {
              setValidation(v => ({
                ...v,
                phone: validate(text, /[6789][0-9]{9}/),
              }));
              onchange(text);
            }}
          />

          <Text style={styles.errorMessage}>
            {validation.phone ? '' : 'Enter Valid Phone Number'}
          </Text>
          <View style={{marginHorizontal: vw(28), marginTop: vh(31)}}>
            <Text style={{fontSize: vw(14), opacity: 0.5}}>Gender</Text>
            <View style={{flexDirection: 'row'}}>
              {Gender.map((ele, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      {
                        backgroundColor:
                          selectedGender == index ? '#E2E2E2' : null,
                      },
                    ]}
                    onPress={() => setSelectedGender(index)}>
                    <Image source={ele.icon} style={{marginRight: vw(5)}} />
                    <Text>{ele.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text
              style={{
                fontSize: vw(14),
                opacity: 0.5,
                marginTop: vh(27),
                marginBottom: vh(12),
              }}>
              Age group
            </Text>
            <View style={{flexDirection: 'row'}}>
              {Age.map((ele, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.ageButton,
                      {
                        backgroundColor:
                          selectedAge == index ? '#E2E2E2' : null,
                      },
                    ]}
                    onPress={() => setSelectedAge(index)}>
                    <Text
                      style={{color: selectedAge == index ? '#FF367F' : null}}>
                      {ele.age}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View
            style={{
              marginHorizontal: vw(24),
              flexDirection: 'row',
              marginVertical: vh(60),
            }}>
            <TouchableOpacity onPress={() => setChecked(!isChecked)}>
              <Image
                source={isChecked ? Checked : CheckBox}
                style={{height: vh(25), width: vw(25)}}
              />
            </TouchableOpacity>
            <Text style={{width: '92%', marginLeft: vw(10), fontSize: vw(12)}}>
              By Signing Up, you agree to the Terms of Services & Privacy
              policy.
            </Text>
          </View>
          <View
            style={{
              bottom: 30,
              zIndex: 1,
              alignItems: 'center',
            }}>
            <Button
              disabled={!isChecked}
              width={Platform.OS == 'ios' ? vw(320) : vw(250)}
              title="Sign Up"
              onPress={() => {
                setVisible(!isVisible);
                navigation.navigate('OTP');
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={isVisible ? AfterModalBackground : Background}
        imageStyle={{
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          height: isVisible ? normalize(1135) : vh(695),
          width: isVisible ? normalize(412) : vw(375),
        }}>
        <View style={{alignItems: 'center'}}>
          <Image source={isVisible ? null : Heading} style={styles.logo} />
          <View style={styles.textContainer}>
            <Text style={styles.firstBottomText}>Welcome</Text>
            <Text style={styles.secondBottomText}>Your favorite store</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={{alignItems: 'center'}}>
        <View style={{position: 'absolute', bottom: vh(-500)}}>
          <Button
            width={vw(186)}
            icon={RightArrow}
            title="Get Started"
            onPress={() => setVisible(!isVisible)}
          />
        </View>
      </View>
      {renderModal()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
  },
  logo: {
    marginTop: vh(141),
  },
  textContainer: {
    position: 'absolute',
    bottom: -vh(400),
    // bottom: vh(125),
  },
  firstBottomText: {
    fontSize: vw(22),
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: vh(33),
    textAlign: 'center',
  },
  secondBottomText: {
    fontSize: vw(16),
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: vh(24),
    textAlign: 'center',
    opacity: 0.7,
  },
  modelContainer: {
    flex: 0.85,
    backgroundColor: 'transparent',
    // justifyContent: 'center',
    width: '100%',
    margin: 0,
    top: 90,
  },
  genderButton: {
    width: 'auto',
    marginEnd: vw(10),
    paddingHorizontal: vw(21),
    height: vh(35),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D2D2D2',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: vh(12),
  },
  ageButton: {
    width: 'auto',
    marginEnd: vw(6),
    paddingHorizontal: vw(21),
    height: vh(35),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D2D2D2',
    flexDirection: 'row',
    borderRadius: 10,
  },
  keyboard: {
    backgroundColor: 'white',
    borderRadius: 40,
    flex: 0.5,
  },
  keyboardContainer: {
    alignItems: 'center',
    marginTop: vh(21),
  },
  signUpMessage: {
    fontSize: vw(14),
    lineHeight: vh(21),
    fontWeight: '400',
    opacity: 0.5,
  },
  errorMessage: {
    color: 'red',
    paddingLeft: 30,
  },
});

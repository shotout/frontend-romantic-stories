/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, Fragment, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  useColorScheme,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {bg, logo} from '../../assets/images';
import {code_color} from '../../utils/colors';
import HeaderStep from '../../layout/register/header-step';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {isIphoneXorAbove} from '../../utils/devices';
import {backLeft, female, male} from '../../assets/icons';
import Register1 from '../../layout/register/register1';
import {goBack, navigate} from '../../shared/navigationRef';
import Register2 from '../../layout/register/register2';
import i18n from '../../i18n';
import Button from '../../components/buttons/Button';
import register from '.';
import Register3 from '../../layout/register/register3';
import Register4 from '../../layout/register/register4';
import Register5 from '../../layout/register/register5';
const RegisterScreen = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [stepRegister, setStepRegister] = useState(1);
  const [gender, setGender] = useState('Male');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderLayout = () => {
    if (stepRegister === 1) {
      return (
        <Register1
          setGender={text => {
            setGender(text), setStepRegister(stepRegister + 1);
          }}
        />
      );
    } else if (stepRegister === 2) {
      return <Register2 currentStep={stepRegister} />;
    } else if (stepRegister === 3) {
      return <Register3 currentStep={stepRegister} />;
    } else if (stepRegister === 4) {
      return <Register4 gender={gender} />;
    } else if (stepRegister === 5) {
        return <Register5 gender={gender} />;
      }
  };
  return (
    <View style={{backgroundColor: code_color.white, flex: 1}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={{
            backgroundColor: code_color.headerBlack,
            paddingTop: isIphoneXorAbove() ? 40 : 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            {stepRegister > 1 ? (
              <TouchableOpacity
                onPress={() => setStepRegister(stepRegister - 1)}>
                <Image source={backLeft} />
              </TouchableOpacity>
            ) : null}

            <Text
              style={{
                color: code_color.white,
                textAlign: 'center',
                fontSize: 18,
                flex: 1,
              }}>
              Let’s get to know you
            </Text>
          </View>

          <HeaderStep currentStep={stepRegister} />
        </View>

        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
          <Text
            style={{
              color: code_color.blueDark,
              fontSize: 32,
              fontFamily: 'Comfortaa-SemiBold',
              textAlign: 'center',
              marginTop: 20,
            }}>
            {i18n.t(
              stepRegister === 1
                ? 'register.titleRegister1'
                : stepRegister === 2
                ? 'register.whatsname'
                : stepRegister === 3
                ? 'register.wyfs'
                : 'What should your character look like?',
            )}
          </Text>
          {renderLayout()}
          <View style={{position: 'absolute', bottom: 40, width: '80%'}}>
            {stepRegister === 1 ? (
              <TouchableOpacity
                onPress={() => setStepRegister(stepRegister + 1)}
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: code_color.grey,
                    fontSize: 18,
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  {i18n.t(
                    stepRegister === 1
                      ? 'register.preferNottosay'
                      : 'register.skipfrnw',
                  )}
                </Text>
              </TouchableOpacity>
            ) : null}
            {stepRegister != 1 ? (
              <Button
                style={{
                  backgroundColor: code_color.yellow,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 52,
                  borderRadius: 12,
                  width: '100%',
                  marginTop: 10,
                }}
                onPress={() => setStepRegister(stepRegister + 1)}
                title={i18n.t('register.continue')}
              />
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({});
export default RegisterScreen;

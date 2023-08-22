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
} from 'react-native';
import {bg, logo} from '../../assets/images';
import {code_color} from '../../utils/colors';
import HeaderStep from '../../layout/register/header-step';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {isIphoneXorAbove} from '../../utils/devices';
import {backLeft, female, male} from '../../assets/icons';
import Register1 from '../../layout/register/register1';
import { goBack, navigate } from '../../shared/navigationRef';
const RegisterScreen = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [stepRegister, setStepRegister] = useState(1);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderLayout = () => {
    if (stepRegister === 1) {
      return <Register1 currentStep={stepRegister} />;
    }
  };
  return (
    <View style={{backgroundColor: code_color.white, flex: 1}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
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
            {stepRegister > 1 ? 
            <TouchableOpacity onPress={() => goBack()}>
            <Image source={backLeft} />
            </TouchableOpacity> : null }
          
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
            marginTop: 40,
          }}>
          {'What‘s your \n gender?'}
        </Text>
        {renderLayout()}
        <TouchableOpacity
          onPress={() => setStepRegister(stepRegister + 1)}
          style={{
            position: 'absolute',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            bottom: 40,
          }}>
          <Text
            style={{
              color: code_color.grey,
              fontSize: 18,
              fontFamily: 'Roboto',
              textAlign: 'center',
              marginTop: 10,
            }}>
            {'Prefer not to say'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({});
export default RegisterScreen;

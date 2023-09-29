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
import Register6 from '../../layout/register/register6';
import Register7 from '../../layout/register/register7';
import BackLeft from '../../assets/icons/bottom/backLeft.jsx';
import Register8 from '../../layout/register/register8';
import moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import {
  checkDeviceRegister,
  getListAvatar,
  getStoryList,
  postRegister,
} from '../../shared/request';
import {connect} from 'react-redux';
import dispatcher from './dispatcher';
import states from './states';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

function RegisterScreen({
  handleSetProfile,
  handleSetBackground,
  handleSetFontSize,
  handleSetColorTheme,
  handleSetFontFamily,
  handleSetStory,
}) {
  const [stepRegister, setStepRegister] = useState(1);
  const [titleHeader, setTitleHeader] = useState('Let’s get to know you');
  const isDarkMode = useColorScheme() === 'dark';
  const [dataAva, setDataAva] = useState([]);
  const [dataAva2, setDataAva2] = useState([]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [values, setFormValues] = useState({
    name: '',
    gender: '',
    device_id: '',
    start: moment(new Date(2018, 11, 24, 8, 0, 30, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
    end: moment(new Date(2018, 11, 24, 20, 0, 30, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
    fcm_token: '',
    category_id: 1,
    avatar_male: 1,
    avatar_female: 1,
    theme_id: 1,
    language_id: 2,
    often: 3,
  });

  useEffect(() => {
    fetchDeviceId();
  }, []);

  const fetchDeviceId = async () => {
    const data = await DeviceInfo.getUniqueId();
    const fcmToken = await messaging().getToken();
    setFormValues({
      ...values,
      device_id: data,
      fcm_token: fcmToken,
    });
  };

  const handleChange = (setText, text) => {
    setFormValues({
      ...values,
      [setText]: text,
    });
  };

  useEffect(() => {
    if (values.gender === '') {
      fetchAva1('male');
      fetchAva2('female');
    } else {
      fetchAva1(values.gender === 'Male' ? 'male' : 'female');
      fetchAva2(values.gender === 'Male' ? 'female' : 'male');
    }
  }, [values.gender]);

  const fetchAva1 = async value => {
    try {
      const params = {
        gender: value,
      };
      const avatar = await getListAvatar(params);
      setDataAva(avatar?.data);
    } catch (error) {
      // alert(JSON.stringify(error));
    }
  };
  const fetchAva2 = async value => {
    try {
      const params = {
        gender: value,
      };
      const avatar = await getListAvatar(params);
      setDataAva2(avatar?.data);
    } catch (error) {
      // alert(JSON.stringify(error));
    }
  };

  const onSubmit = async () => {
    console.log(values);
    await notifee.requestPermission();
    try {
      const res = await postRegister(values);
      handleSetProfile(res);
      handleSetBackground(res?.data?.theme?.bg_color);
      handleSetFontSize(res?.data?.theme?.font_size);
      handleSetColorTheme(res?.data?.theme?.theme_color);
      handleSetFontFamily(res?.data?.theme?.font_family);
      const resp = await getStoryList();
      handleSetStory(resp.data);
      navigate('Bottom');
    } catch (error) {
      checkDevice();
    }
  };
  const checkDevice = async () => {
    const device = await DeviceInfo.getUniqueId();
    try {
      const res = await checkDeviceRegister({
        device_id: device,
      });
      handleSetProfile(res);
      handleSetBackground(res?.data?.theme?.bg_color);
      handleSetFontSize(res?.data?.theme?.font_size);
      handleSetColorTheme(res?.data?.theme?.theme_color);
      handleSetFontFamily(res?.data?.theme?.font_family);
      const resp = await getStoryList();
      handleSetStory(resp.data);
      navigate('Bottom');
    } catch (error) {}
  };

  const renderLayout = () => {
    if (stepRegister === 1) {
      return (
        <View style={{justifyContent: 'center', flex: 0, marginTop: 80}}>
          <Register1
            setGender={text => {
              handleChange('gender', text), setStepRegister(stepRegister + 1);
            }}
            selectedGender={values.gender}
          />
        </View>
      );
    } else if (stepRegister === 2) {
      return (
        <Register2
          name={values.name}
          changeText={text => handleChange('name', text)}
          currentStep={stepRegister}
        />
      );
    } else if (stepRegister === 3) {
      return (
        <Register3
          setCategoryId={text => {
            handleChange('category_id', text);
          }}
        />
      );
    } else if (stepRegister === 4) {
      return (
        <Register4
          gender={values.gender}
          dataAvatar={dataAva}
          setAvatar={text =>
            handleChange(
              values.gender === 'female' ? 'avatar_female' : 'avatar_male',
              text,
            )
          }
        />
      );
    } else if (stepRegister === 5) {
      return (
        <Register5
          gender={values.gender}
          dataAvatar={dataAva2}
          setAvatar={text =>
            handleChange(
              values.gender === 'female' ? 'avatar_male' : 'avatar_female',
              text,
            )
          }
        />
      );
    } else if (stepRegister === 6) {
      return (
        <Register6
          gender={values.gender}
          setTheme={text => handleChange('theme_id', text)}
        />
      );
    } else if (stepRegister === 7) {
      return (
        <Register7 languange={text => handleChange('language_id', text)} />
      );
    } else if (stepRegister === 8) {
      return <Register8 activeNotif={() => onSubmit()} />;
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
        {stepRegister != 8 ? (
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
                allowFontScaling={false}
                style={{
                  color: code_color.white,
                  textAlign: 'center',
                  fontSize: 18,
                  flex: 1,
                }}>
                {stepRegister === 1
                  ? titleHeader
                  : stepRegister === 2
                  ? 'Be part of the story'
                  : stepRegister === 3
                  ? 'Select your favorite genre'
                  : stepRegister === 4
                  ? 'Select your look'
                  : stepRegister === 5
                  ? 'Select your partner'
                  : stepRegister === 6
                  ? 'Customize your page'
                  : stepRegister === 7
                  ? 'For effective expression'
                  : null}
              </Text>
            </View>
            {stepRegister != 8 ? (
              <HeaderStep currentStep={stepRegister} />
            ) : null}
          </View>
        ) : (
          <View
            style={{
              backgroundColor: code_color.white,
              paddingTop: isIphoneXorAbove() ? 40 : 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => setStepRegister(stepRegister - 1)}>
                <BackLeft />
              </TouchableOpacity>

              <Text
                allowFontScaling={false}
                style={{
                  color: code_color.white,
                  textAlign: 'center',
                  fontSize: 18,
                  flex: 1,
                }}>
                {stepRegister === 1
                  ? titleHeader
                  : stepRegister === 2
                  ? 'Be part of the story'
                  : ''}
              </Text>
            </View>
            {stepRegister != 8 ? (
              <HeaderStep currentStep={stepRegister} />
            ) : null}
          </View>
        )}

        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
          <Text
            allowFontScaling={false}
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
          <View style={{position: 'absolute', bottom: 15, width: '80%'}}>
            {stepRegister <= 2 ? (
              <TouchableOpacity
                onPress={() => setStepRegister(stepRegister + 1)}
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: code_color.grey,
                    fontSize: 18,
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                    marginVertical: 15,
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
                  marginBottom: 10,
                }}
                onPress={() => {
                  stepRegister === 8
                    ? onSubmit()
                    : setStepRegister(stepRegister + 1);
                }}
                title={
                  stepRegister === 8
                    ? 'Ok, let’s do it'
                    : i18n.t('register.continue')
                }
              />
            ) : null}
            {stepRegister === 8 ? (
              <TouchableOpacity
                onPress={() => onSubmit()}
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: code_color.grey,
                    fontSize: 14,
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  {'Maybe later'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
RegisterScreen.propTypes = {};

RegisterScreen.defaultProps = {};

export default connect(states, dispatcher)(RegisterScreen);

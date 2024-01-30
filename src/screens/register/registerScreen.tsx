/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, Fragment, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
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
  addStory,
  checkDeviceRegister,
  getListAvatar,
  getListCategory,
  getStoryList,
  postRegister,
  updateProfile,
} from '../../shared/request';
import {connect} from 'react-redux';
import dispatcher from './dispatcher';
import states from './states';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {ONBOARDING_COMPLETE, eventTracking} from '../../helpers/eventTracking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handlePayment} from '../../helpers/paywall';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Purchasely from 'react-native-purchasely';
import {SafeAreaView} from 'react-native';
import {fixedFontSize, hp, wp} from '../../utils/screen';

function RegisterScreen({
  handleSetProfile,
  handleSetBackground,
  handleSetFontSize,
  handleSetColorTheme,
  handleSetFontFamily,
  handleSetStory,
  handleSetSteps,
  userStory,
}) {
  const [stepRegister, setStepRegister] = useState(1);
  const [titleHeader, setTitleHeader] = useState('Let’s get to know you');
  const isDarkMode = useColorScheme() === 'dark';
  const [dataAva, setDataAva] = useState([]);
  const [dataAva2, setDataAva2] = useState([]);
  const [dataStory, setDataStory] = useState([]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [values, setFormValues] = useState({
    name: '',
    gender: null,
    device_id: '',
    start: moment(new Date(2018, 11, 24, 8, 0, 30, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
    end: moment(new Date(2018, 11, 24, 20, 0, 30, 0)).format(
      'YYYY-MM-DD HH:mm',
    ),
    fcm_token: '',
    category_id: 0,
    avatar_male: 2,
    avatar_female: 5,
    theme_id: 1,
    language_id: 2,
    often: 3,
    timezone: 'Asia/Jakarta',
    notif_enable: 1,
    purchasely_id: '',
  });

  useEffect(() => {
    fetchDeviceId();
  }, []);

  const fetchDeviceId = async () => {
    const data = await DeviceInfo.getUniqueId();
    const fcmToken = await messaging().getToken();
    const id = await Purchasely.getAnonymousUserId();
    setFormValues({
      ...values,
      device_id: data,
      fcm_token: fcmToken,
      purchasely_id: id,
    });
  };

  const handleChange = (setText, text) => {
    setFormValues({
      ...values,
      [setText]: text,
    });
  };

  useEffect(() => {
    if (!values.gender) {
      fetchAllAva();
    } else {
      fetchAva1(values.gender === 'Male' ? 'male' : 'female');
      fetchAva2(values.gender === 'Male' ? 'female' : 'male');
    }
  }, [values.gender]);

  const fetchAllAva = async () => {
    try {
      const avatarMale = await getListAvatar({gender: 'male'});
      const avatarFemale = await getListAvatar({gender: 'female'});
      setDataAva([...avatarMale?.data, ...avatarFemale?.data]);
      setDataAva2([...avatarMale?.data, ...avatarFemale?.data]);
    } catch (error) {
      // alert(JSON.stringify(error));
    }
  };
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
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const category = await getListCategory();
      setDataStory(category?.data);
    } catch (error) {
      // alert(JSON.stringify(error));
    }
  };
  const onSubmit = async () => {
    await notifee.requestPermission();
    const data = await DeviceInfo.getUniqueId();

    const id = await Purchasely.getAnonymousUserId();
    try {
      const payload = {
        name: values?.name,
        gender: values?.gender,
        start: values?.start,
        end: values?.end,
        device_id: data,
        fcm_token: values?.fcm_token,
        category_id: values?.category_id,
        avatar_male: values?.avatar_male,
        avatar_female: values?.avatar_female,
        theme_id: values?.theme_id,
        language_id: values?.language_id,
        often: values?.often,
        timezone: values?.timezone,
        notif_enable: values?.notif_enable,
        purchasely_id: id,
      };
      const res = await postRegister(payload);
      handleSetProfile(res);
      handleSetBackground(res?.data?.theme?.bg_color);
      handleSetFontSize(res?.data?.theme?.font_size);
      // handleSetColorTheme(res?.data?.theme?.theme_color);
      handleSetFontFamily(res?.data?.theme?.font_family);
      await AsyncStorage.setItem('isTutorial', 'yes');
      eventTracking(ONBOARDING_COMPLETE);
      const resp = await getStoryList();
      handleSetStory(resp.data);
      navigate('Tutorial');
      handleSetSteps(0);
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
      const payload = {
        _method: 'PATCH',
        name: values?.name,
        gender: values?.gender,
        start: values?.start,
        end: values?.end,
        device_id: device,
        fcm_token: values?.fcm_token,
        category_id: values?.category_id,
        avatar_male: values?.avatar_male,
        avatar_female: values?.avatar_female,
        theme_id: values?.theme_id,
        language_id: values?.language_id,
        often: values?.often,
        timezone: values?.timezone,
        notif_enable: values?.notif_enable,
        purchasely_id: values?.purchasely_id,
      };
      await updateProfile(payload);
      handleSetBackground(res?.data?.theme?.bg_color);
      handleSetFontSize(res?.data?.theme?.font_size);
      // handleSetColorTheme(res?.data?.theme?.theme_color);
      handleSetFontFamily(res?.data?.theme?.font_family);
      await AsyncStorage.setItem('isTutorial', 'yes');
      const resp = await getStoryList();
      handleSetStory(resp.data);
      navigate('Tutorial');
      handleSetSteps(0);
    } catch (error) {}
  };

  const renderLayout = () => {
    if (stepRegister === 1) {
      return (
        <View
          style={{
            justifyContent: 'center',
            flex: 0,
            marginTop: moderateScale(70),
          }}>
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
          dataCategory={dataStory}
          value={values?.category_id}
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
              'avatar_male',
              values.gender === 'female' ? text + 3 : text,
            )
          }
        />
      );
    } else if (stepRegister === 5) {
      return (
        <Register5
          gender={values.gender}
          dataAvatar={dataAva2}
          setAvatar={text => handleChange('avatar_female', text)}
        />
      );
    } else if (stepRegister === 6) {
      return (
        <Register6
          userStory={userStory}
          gender={values.gender}
          setTheme={text => {
            handleChange('theme_id', text);
            // bypass question language
            handleChange('language_id', 1);
          }}
          handleSetColorTheme={value => {
            handleSetColorTheme(value === undefined ? code_color.splash : value)
          }}
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
        barStyle={stepRegister === 8 ? 'dark-content' : 'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {stepRegister != 8 ? (
        <View
          style={{
            backgroundColor: code_color.headerBlack,
            paddingTop: isIphoneXorAbove() ? wp(40) : 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: wp(20),
              marginTop: wp(20),
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
                fontSize: fixedFontSize(18),
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
          {stepRegister != 8 ? <HeaderStep currentStep={stepRegister} /> : null}
        </View>
      ) : (
        <View
          style={{
            backgroundColor: code_color.white,
            paddingTop: isIphoneXorAbove() ? wp(40) : 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: wp(20),
              marginTop: wp(20),
            }}>
            <TouchableOpacity
              onPress={() =>
                setStepRegister(stepRegister - (stepRegister === 8 ? 2 : 1))
              }>
              <BackLeft />
            </TouchableOpacity>

            <Text
              allowFontScaling={false}
              style={{
                color: code_color.white,
                textAlign: 'center',
                fontSize: fixedFontSize(18),
                flex: 1,
              }}>
              {stepRegister === 1
                ? titleHeader
                : stepRegister === 2
                ? 'Be part of the story'
                : ''}
            </Text>
          </View>
          {stepRegister != 8 ? <HeaderStep currentStep={stepRegister} /> : null}
        </View>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
          <Text
            allowFontScaling={false}
            style={{
              color: code_color.blueDark,
              fontSize: fixedFontSize(24),
              fontFamily: 'Comfortaa-SemiBold',
              textAlign: 'center',
              marginTop: wp(20),
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
          <View
            style={{
              position: 'absolute',
              bottom: wp(10),
              width: wp(200),
            }}>
            {stepRegister <= 2 ? (
              <TouchableOpacity
                onPress={() => {
                  if(stepRegister === 1){
                    handleChange('gender', null);
                  }
                 
                  setStepRegister(stepRegister + 1);
                }}
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginBottom:
                    stepRegister === 1 && !isIphoneXorAbove()
                      ? wp(10)
                      : stepRegister === 1
                      ? wp(100)
                      : stepRegister === 2
                      ? 0
                      : wp(40),
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    color: code_color.grey,
                    fontSize: fixedFontSize(14),
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                    marginVertical: wp(10),
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
                  backgroundColor: stepRegister == 2 && values.name === '' ||  stepRegister == 3 && values.category_id === 0  ?  code_color.greyDefault :  code_color.yellow,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: hp(45),
                  borderRadius: wp(12),
                  width: '100%',
                  marginTop: wp(10),
                  marginBottom: wp(20),
                }}
                onPress={() => {
                  stepRegister === 8
                    ? onSubmit()
                    : stepRegister == 2 && values.name === '' ||  stepRegister == 3 && values.category_id === 0 ? null : setStepRegister(
                        stepRegister + (stepRegister === 6 ? 2 : 1),
                      );
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
                  marginBottom: wp(60),
                }}>
                <Text
                  style={{
                    color: code_color.grey,
                    fontSize: fixedFontSize(14),
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                    marginTop: wp(10),
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

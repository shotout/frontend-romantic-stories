/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {bgSettings} from '../../assets/images';
import BgSettings from '../../assets/icons/bgSetting';
import {code_color} from '../../utils/colors';
import LibrarySvg from '../../assets/icons/bottom/library.jsx';
import LockSvg from '../../assets/icons/lock.jsx';
import AppiconSvg from '../../assets/icons/appIcon';
import UserSvg from '../../assets/icons/user.jsx';
import NotificationSvg from '../../assets/icons/notification';
import FontSvg from '../../assets/icons/bottom/font';
import CategoriesSvg from '../../assets/icons/categories';
import InstagramSvg from '../../assets/icons/instagram';
import FacebookSvg from '../../assets/icons/facebook';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import ModalEditProfile from '../../layout/settings/modal-edit-profile';
import ModalEditName from '../../layout/settings/modal-edit-name';
import ModalEditGender from '../../layout/settings/modal-edit-gender';
import ModalEditCharacter from '../../layout/settings/modal-edit-character';
import ModalEditPartner from '../../layout/settings/modal-edit-partner';
import ModalEditLanguage from '../../layout/settings/modal-edit-language';
import ModalChangeIcon from '../../layout/settings/modal-change-icon';
import {ScrollView} from 'react-native-gesture-handler';
import {navigate} from '../../shared/navigationRef';
import {handlePayment} from '../../helpers/paywall';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BACKEND_URL} from '../../shared/static';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {Image} from 'react-native';
import ProgressBar from '../../components/progress';
import { fixedFontSize, hp, wp } from '../../utils/screen';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import FastImage from 'react-native-fast-image';

const SettingsPage = ({
  colorTheme,
  userProfile,
  backgroundColor,
  getAvatarMale,
  getAvatarFemale,
  levelingUser,
}) => {
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
  const [showModalGender, setShowModalGender] = useState<boolean>(false);
  const [showModalCharacter, setShowModalCharacter] = useState<boolean>(false);
  const [showModalPartner, setShowModalPartner] = useState<boolean>(false);
  const [showModalName, setShowModalName] = useState<boolean>(false);
  const [showModalLanguage, setShowModalLanguage] = useState<boolean>(false);
  const [showModalIcon, setShowModalIcon] = useState<boolean>(false);
  const isPremiumStory = userProfile?.data?.subscription?.plan?.id === 2;
  const isPremiumAudio = userProfile?.data?.subscription?.plan?.id === 3;
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [menu, setlistMenu] = useState( Platform.OS != 'android' ? [
    {
      name: 'Edit Profile',
      icon: <UserSvg width={hp(20)} height={hp(20)} />,
      action: 'editProfile',
    },
    {
      name: 'My Library',
      icon: <LibrarySvg fill={code_color.white} width={hp(20)} height={hp(20)} />,
      action: 'myLibrary',
    },
    
    {
      name: 'Subscription',
      icon: <LockSvg width={hp(20)} height={hp(20)} />,
      action: 'subscription',
    },
  ] : [
    {
      name: 'Edit Profile',
      icon: <UserSvg width={hp(20)} height={hp(20)} />,
      action: 'editProfile',
    },
    {
      name: 'My Library',
      icon: <LibrarySvg fill={code_color.white} width={hp(20)} height={hp(20)} />,
      action: 'myLibrary',
    },
  ]);

  // alert(JSON.stringify(userProfile?.data?.gender))
  const [menuTwo, setlistMenuTwo] = useState([
    {
      name: 'App Icon',
      icon: <AppiconSvg fill={bgTheme} width={hp(20)} height={hp(20)} />,
      action: 'appIcon',
    },
    {
      name: 'Notifications',
      icon: <NotificationSvg />,
      action: 'myLibrary',
    },
    {
      name: 'Text Settings',
      icon: <FontSvg fill={code_color.white} width={hp(20)} height={hp(20)} />,
      action: 'subscription',
    },
    {
      name: 'Change Categories',
      icon: <CategoriesSvg width={hp(20)} height={hp(20)} />,
      action: 'subscription',
    },
  ]);

  const [status, setStatus] = useState([
    {
      name: 'Noob',
      status: true,
    },
    {
      name: 'Expert',
      status: false,
    },
    {
      name: 'Pro',
      status: false,
    },
  ]);

  const header = () => (
    <View style={{height: hp(255)}}>
      <View
        style={{
          width: Dimensions.get('window').width,
          height: '100%',
          // alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
        <BgSettings
          style={{position: 'absolute', top: 0}}
          bgTheme={bgTheme}
          levelUrl={BACKEND_URL + (levelingUser === null ? userProfile?.data?.user_level?.level?.image?.url : levelingUser?.user_level?.level?.image?.url)}
          profileUrl={
            BACKEND_URL + getAvatarMale 
          }
        />
        <View
          style={{
            marginTop: Dimensions.get('window').height === 667 ? hp(90) : hp(80),
          }}>
          <View style={{marginTop: hp(Platform.OS === 'android' && Dimensions.get('window').height >= 1005 ? 60 : 20)}}>
            <Text
              allowFontScaling={false}
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: fixedFontSize(14),
              }}>
              {userProfile?.data?.name} •{' '}
              {levelingUser?.user_level?.level?.desc  ? levelingUser?.user_level?.level?.desc  : userProfile?.data?.user_level?.level?.desc} •{' '}
              {levelingUser?.user_level?.point ? levelingUser?.user_level?.point : 0} XP
            </Text>
          </View>
          <View style={{marginTop: hp(30)}}>
            <ProgressBar levelingUser={levelingUser} bgTheme={bgTheme} currentXp={levelingUser?.user_level?.point}/>
            {/* // <ProgressBar bgTheme={bgTheme} levelingUser={levelingUser} /> */}
          </View>
        </View>

        {/* <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          {status.map((item, i) => (
            <View style={{ alignItems: 'flex-start' }}>
              <View style={{    alignItems: 'center',
                    justifyContent: 'center', flexDirection: 'row' }}>
                <View
                  style={{
                    backgroundColor: code_color.yellow,
                    width: 25,
                    height: 25,
                    borderWidth: 3,
                    borderColor: bgTheme,
                    borderRadius: 20,

                  }}
                />
                 <View
                style={{
                  backgroundColor: code_color.grey,
                  width: 40,
                  height: 10,
                }}
              />

              </View>
              <Text>{item.name}</Text>
            </View>
          ))}
        </View> */}
      </View>
    </View>
  );

  const handleOpenModal = (tabMenu: string) => {
    switch (tabMenu) {
      case 'Edit Profile':
        setShowModalProfile(true);
        break;
      case 'Edit Name':
        setShowModalProfile(false);
        setShowModalName(true);
        break;
      case 'Gender':
        setShowModalProfile(false);
        setShowModalGender(true);
        break;
      case 'Select your character':
        setShowModalProfile(false);
        setShowModalCharacter(true);
        break;
      case 'Select partner character':
        setShowModalProfile(false);
        setShowModalPartner(true);
        break;
      case 'Select language':
        setShowModalProfile(false);
        setShowModalLanguage(true);
        break;
      case 'My Library':
        navigate('Library');
        break;
      case 'Text Settings':
        navigate('Font');
        break;
      case 'Notifications':
        navigate('Notification');
        break;
      case 'Change Categories':
        navigate('Categories');
        break;
      case 'Subscription':
        navigate('Subscriptions');
        break;
      case 'App Icon':
        setShowModalIcon(true);
        break;
      default:
        break;
    }
  };

  const listMenu = () => (
    <View>
      {/* <TouchableOpacity
        style={{
          height: 50,
          width: Dimensions.get('window').width,
          backgroundColor: 'red',
        }}
        onPress={async () => {
          const fcmToken = await messaging().getToken();
          Clipboard.setString(fcmToken);
          console.log(fcmToken);
        }}>
        <Text>fcm token</Text>
      </TouchableOpacity> */}
      {menu.map((item, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handleOpenModal(item.name)}
          style={{flexDirection: 'row', margin: hp(10), alignItems: 'center'}}>
          {item.icon}
          <Text
            allowFontScaling={false}
            style={{marginLeft: hp(10), color: code_color.white, flex: 1, fontSize: moderateScale(14)}}>
            {item.name}
          </Text>
          {item.name === 'Edit Profile' ? (
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  width: hp(40),
                  height: hp(40),
                  borderRadius: hp(20),
                  marginLeft: 'auto',
                  backgroundColor: code_color.yellow,
                  position: 'relative',
                  overflow: 'hidden',
                  alignItems: 'center',
                  right: hp(-5),
                }}>
                <FastImage
                  source={{
                    uri:
                     BACKEND_URL + getAvatarMale
                  }}
                  style={{
                    width: hp(40),
                    height: hp(160),
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: hp(3),
                    right: hp(getAvatarMale === '/assets/images/avatars/5.png' ? -7 : getAvatarMale  === '/assets/images/avatars/1.png' ? 4 : getAvatarMale === '/assets/images/avatars/4.png' ? 2 : 0),
                  }}
                />
              </View>
              <View
                style={{
                  width: hp(40),
                  height: hp(40),
                  borderRadius: hp(20),
                  marginLeft: 'auto',
                  backgroundColor: code_color.yellow,
                  position: 'relative',
                  overflow: 'hidden',
                  alignItems: 'center',
                  marginRight: moderateScale(10),
                }}>
                <FastImage
                  source={{
                    uri: BACKEND_URL + getAvatarFemale
                  }}
                  style={{
                    width: hp(40),
                    height: hp(160),
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: hp(3),
                    right: hp(getAvatarFemale === '/assets/images/avatars/5.png' ? -7 :  getAvatarFemale  === '/assets/images/avatars/1.png' ? 4 : getAvatarMale === '/assets/images/avatars/4.png' ? 2 : 0),
                  }}
                />
              </View>
            </View>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
  const listMenuTwo = () => (
    <View>
      {menuTwo.map((item, i) => (
       Platform.OS === 'android' && item.name === 'App Icon' ? null :
        <Pressable
          onPress={() => handleOpenModal(item.name)}
          style={{flexDirection: 'row', margin: moderateScale(10), alignItems: 'center'}}>
          {item.icon}
          <Text
            allowFontScaling={false}
            style={{marginLeft: moderateScale(10), color: code_color.white, fontSize: moderateScale(14)}}>
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View
      style={{
        flex: 0,
        height: hp( Dimensions.get('window').height - hp(Dimensions.get('window').height === 896 ? 260 : Platform.OS == 'android' && Dimensions.get('window').height > 1005 && Dimensions.get('window').height < 1006  ? 320 : Platform.OS == 'android' && Dimensions.get('window').height > 900 && Dimensions.get('window').height < 960 ? 280 : Dimensions.get('window').height > 1006 ? 360 : Dimensions.get('window').height === 844 ? 260 :  208)),
        backgroundColor: bgTheme,
      }}>
      <ModalChangeIcon
        isVisible={showModalIcon}
        isPremium={isPremiumAudio || isPremiumStory}
        onClose={() => {
          setShowModalIcon(false);
        }}
      />
      <ModalEditName
        isVisible={showModalName}
        onClose={() => {
          setShowModalName(false);
          setShowModalProfile(true);
        }}
      />
      <ModalEditProfile
        isVisible={showModalProfile}
        onClose={() => setShowModalProfile(false)}
        handleOpenModal={tab => handleOpenModal(tab)}
      />
      <ModalEditGender
        isVisible={showModalGender}
        onClose={() => {
          setShowModalGender(false);
          setShowModalProfile(true);
        }}
      />
      <ModalEditCharacter
        isVisible={showModalCharacter}
        onClose={() => {
          setShowModalCharacter(false);
          setShowModalProfile(true);
        }}
      />
      <ModalEditPartner
        isVisible={showModalPartner}
        onClose={() => {
          setShowModalPartner(false);
          setShowModalProfile(true);
        }}
      />
      <ModalEditLanguage
        isVisible={showModalLanguage}
        onClose={() => {
          setShowModalLanguage(false);
          setShowModalProfile(true);
        }}
      />
      {header()}
      <ScrollView>
        {listMenu()}
        <View style={{borderColor: 'white', borderWidth: 0.5, margin: moderateScale(10)}} />
        {listMenuTwo()}
        <View style={{borderColor: 'white', borderWidth: 0.5, margin: moderateScale(10)}} />
        <View>
          {/* <View style={{margin: 10}}>
            <Text
              allowFontScaling={false}
              style={{marginLeft: 10, color: code_color.white}}>
              Follow us
            </Text>
            <View
              style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
              <InstagramSvg />
              <Text
                allowFontScaling={false}
                style={{marginLeft: 10, color: code_color.white}}>
                Instagram
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
              <FacebookSvg />
              <Text
                allowFontScaling={false}
                style={{marginLeft: 10, color: code_color.white}}>
                Facebook
              </Text>
            </View>
          </View> */}
          {/* <View style={{borderColor: '#778DFF', borderWidth: 1, margin: 10}} /> */}
          <View style={{margin: moderateScale(10), marginBottom: moderateScale(40)}}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('Https://erotalesapp.com/privacy')
              }>
              <Text
                allowFontScaling={false}
                style={{
                  marginLeft: moderateScale(10),
                  marginBottom: moderateScale(20),
                  color: code_color.white,
                  fontSize: moderateScale(14),
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://erotalesapp.com/terms')}>
              <Text
                allowFontScaling={false}
                style={{marginLeft: moderateScale(10), color: code_color.white, fontSize: moderateScale(14)}}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

SettingsPage.propTypes = {
  activeVersion: PropTypes.any,
};

SettingsPage.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(SettingsPage);

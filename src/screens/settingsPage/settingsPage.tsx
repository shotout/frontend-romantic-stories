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
} from 'react-native';
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
import ProgressBar from '../../components/ProgressBar';
import { fixedFontSize, hp, wp } from '../../utils/screen';

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
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [menu, setlistMenu] = useState([
    {
      name: 'Edit Profile',
      icon: <UserSvg />,
      action: 'editProfile',
    },
    {
      name: 'My Library',
      icon: <LibrarySvg fill={code_color.white} width={20} height={20} />,
      action: 'myLibrary',
    },
    {
      name: 'Subscription',
      icon: <LockSvg />,
      action: 'subscription',
    },
  ]);

  // alert(JSON.stringify(userProfile?.data?.gender))
  const [menuTwo, setlistMenuTwo] = useState([
    {
      name: 'App Icon',
      icon: <AppiconSvg fill={bgTheme} />,
      action: 'appIcon',
    },
    {
      name: 'Notifications',
      icon: <NotificationSvg />,
      action: 'myLibrary',
    },
    {
      name: 'Text Settings',
      icon: <FontSvg fill={code_color.white} />,
      action: 'subscription',
    },
    {
      name: 'Change Categories',
      icon: <CategoriesSvg />,
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
console.log(levelingUser?.user_level?.level?.image?.url)
  const header = () => (
    <View style={{height: hp(230)}}>
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
          levelUrl={BACKEND_URL + levelingUser?.user_level?.level?.image?.url}
          profileUrl={
            BACKEND_URL + getAvatarMale 
          }
        />
        <View
          style={{
            marginTop: wp(80),
          }}>
          <View style={{marginTop: wp(20)}}>
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
          <View style={{marginLeft: '30%', marginTop: wp(30)}}>
            <ProgressBar bgTheme={bgTheme} levelingUser={levelingUser} />
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
console.log(getAvatarFemale)
  const listMenu = () => (
    <View>
      {menu.map((item, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handleOpenModal(item.name)}
          style={{flexDirection: 'row', margin: moderateScale(10), alignItems: 'center'}}>
          {item.icon}
          <Text
            allowFontScaling={false}
            style={{marginLeft: moderateScale(10), color: backgroundColor, flex: 1}}>
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
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginLeft: 'auto',
                  backgroundColor: code_color.yellow,
                  position: 'relative',
                  overflow: 'hidden',
                  alignItems: 'center',
                  right: -5,
                }}>
                <Image
                  source={{
                    uri:
                     BACKEND_URL + getAvatarMale
                  }}
                  style={{
                    width: 40,
                    height: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 3,
                    right: getAvatarMale === '/assets/images/avatars/5.png' ? -7 : 0,
                  }}
                />
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: scale(20),
                  marginLeft: 'auto',
                  backgroundColor: code_color.yellow,
                  position: 'relative',
                  overflow: 'hidden',
                  alignItems: 'center',
                  marginRight: moderateScale(10),
                }}>
                <Image
                  source={{
                    uri: BACKEND_URL + getAvatarFemale
                  }}
                  style={{
                    width: 40,
                    height: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: moderateScale(3),
                    right: getAvatarFemale === '/assets/images/avatars/5.png' ? moderateScale(-7) : moderateScale(0),
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
        <Pressable
          onPress={() => handleOpenModal(item.name)}
          style={{flexDirection: 'row', margin: moderateScale(10), alignItems: 'center'}}>
          {item.icon}
          <Text
            allowFontScaling={false}
            style={{marginLeft: moderateScale(10), color: backgroundColor}}>
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
        height: hp(Dimensions.get('window').height - 200),
        backgroundColor: bgTheme,
      }}>
      <ModalChangeIcon
        isVisible={showModalIcon}
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
        <View style={{borderColor: '#778DFF', borderWidth: 1, margin: moderateScale(10)}} />
        {listMenuTwo()}
        <View style={{borderColor: '#778DFF', borderWidth: 1, margin: moderateScale(10)}} />
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
                  color: backgroundColor,
                }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://erotalesapp.com/terms')}>
              <Text
                allowFontScaling={false}
                style={{marginLeft: moderateScale(10), color: backgroundColor}}>
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

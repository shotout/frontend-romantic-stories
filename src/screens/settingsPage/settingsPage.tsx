/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Fragment, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  bg,
  bgSettings,
  cover1,
  cover2,
  libraryAdd,
  logo,
} from '../../assets/images';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import {getDefaultLanguange} from '../../utils/devices';
import Button from '../../components/buttons/Button';
import {navigate} from '../../shared/navigationRef';
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
import ProgressBar from '../../components/ProgressBar';

const SettingsPage = ({colorTheme}) => {
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
  const [menuTwo, setlistMenuTwo] = useState([
    {
      name: 'App Icon',
      icon: <AppiconSvg fill={bgTheme} />,
      action: 'editProfile',
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

  const header = () => (
    <View style={{height: '25%'}}>
      <ImageBackground
        source={bgSettings}
        resizeMode="cover"
        style={{
          width: Dimensions.get('window').width,
          height: '100%',
          // alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{marginTop: 30}}>
          <View style={{marginTop: 40}}>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
              John Smith • Noob • 10 XP
            </Text>
          </View>
          <View style={{marginLeft: '30%', marginTop: 20}}>
            <ProgressBar progress={20} />
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
      </ImageBackground>
    </View>
  );

  const listMenu = () => (
    <View>
      {menu.map((item, i) => (
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          {item.icon}
          <Text style={{marginLeft: 10, color: code_color.white}}>
            {item.name}
          </Text>
        </View>
      ))}
    </View>
  );
  const listMenuTwo = () => (
    <View>
      {menuTwo.map((item, i) => (
        <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
          {item.icon}
          <Text style={{marginLeft: 10, color: code_color.white}}>
            {item.name}
          </Text>
        </View>
      ))}
    </View>
  );
  return (
    <View
      style={{
        flex: 0,
        height: Dimensions.get('window').height - 130,
        backgroundColor: bgTheme,
      }}>
      {header()}
      {listMenu()}
      <View style={{borderColor: '#778DFF', borderWidth: 1, margin: 10}} />
      {listMenuTwo()}
      <View style={{borderColor: '#778DFF', borderWidth: 1, margin: 10}} />
      <View>
        <View style={{margin: 10}}>
          <Text style={{marginLeft: 10, color: code_color.white}}>
            Follow us
          </Text>
          <View style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
            <InstagramSvg />
            <Text style={{marginLeft: 10, color: code_color.white}}>
              Instagram
            </Text>
          </View>
          <View style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
            <FacebookSvg />
            <Text style={{marginLeft: 10, color: code_color.white}}>
              Facebook
            </Text>
          </View>
        </View>
        <View style={{borderColor: '#778DFF', borderWidth: 1, margin: 10}} />
        <View style={{margin: 10}}>
          <Text style={{marginLeft: 10, color: code_color.white}}>
            Privacy Policy
          </Text>
          <View style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
            <Text style={{marginLeft: 10, color: code_color.white}}>
              Terms & Conditions
            </Text>
          </View>
        </View>
      </View>
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

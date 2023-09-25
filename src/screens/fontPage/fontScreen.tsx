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
  Pressable,
} from 'react-native';
import {bg, cover1, cover2, libraryAdd, logo} from '../../assets/images';
import {code_color} from '../../utils/colors';
import DownChevron from '../../assets/icons/downChevron';
import UpChevron from '../../assets/icons/upChevron';
import Slider from '@react-native-community/slider';
import {ScrollView} from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import ChecklistSvg from './../../assets/icons/checklist';

const FontScreen = ({
  userProfile,
  handleSetBackground,
  handleSetFontSize,
  handleSetColorTheme,
  colorTheme,
  fontSize,
  backgroundColor
}) => {
  console.log(JSON.stringify(userProfile?.data?.theme));
  const [show, setShow] = useState(false);
  const [fontSelect, setSelectFont] = useState('Georgia');
  const [fontList, setFontList] = useState([
    {
      name: 'Georgia',
    },
    {
      name: 'Arial',
    },
    {
      name: 'Robotto',
    },
    {
      name: 'Time News Roman',
    },
  ]);
  const [colorsBg, setColorsBg] = useState([
    {
      code: '#5873FF',
    },
    {
      code: '#2C8272',
    },
    {
      code: '#942AA7',
    },
    {
      code: '#0D648B',
    },
    {
      code: '#604A9E',
    },
  ]);

  const [bg_color, set_bgColor] = useState(backgroundColor);
  const [fontSizeDefault, setFontSize] = useState(
    fontSize,
  );
  const [bgTheme, setBgTheme] = useState(colorTheme);

  const setBg = value => {
    set_bgColor(value);
    handleSetBackground(value);
  };

  const handleFont = value => {
    if (value === 0) {
      setFontSize(Number(fontSizeDefault) - 2);
      handleSetFontSize(Number(fontSizeDefault) - 2);
    } else if (value === 1) {
      setFontSize(12);
      handleSetFontSize(12);
    } else {
      setFontSize(Number(fontSizeDefault) + 2);
      handleSetFontSize(Number(fontSizeDefault) + 2);
    }
    // setFontSize(fontSizeDefault)
  };

  const handleBgThemeColor = value => {
    setBgTheme(value);
    handleSetColorTheme(value);
  };
  return (
    <View style={{flex: 0, height: 500, backgroundColor: bgTheme}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 20,
        }}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text allowFontScaling={false} style={{color: code_color.white}}>BACKGROUND</Text>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Pressable
              onPress={() => setBg(code_color.white)}
              style={{
                borderColor:
                  bg_color === code_color.white ? code_color.yellow : null,
                borderWidth: bg_color === code_color.white ? 3 : 0,
                borderRadius: 40,
                padding: 3,
                marginRight: 10,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: code_color.white,
                  borderRadius: 30,
                }}
              />
            </Pressable>

            <Pressable
              onPress={() => setBg(code_color.blackDark)}
              style={{
                borderColor:
                  bg_color === code_color.blackDark ? code_color.yellow : null,
                borderWidth: bg_color === code_color.blackDark ? 3 : 0,
                borderRadius: 40,
                padding: 3,
                marginLeft: 10,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: code_color.blackDark,
                  borderRadius: 30,
                }}
              />
            </Pressable>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: code_color.grey,
            height: 50,
            marginHorizontal: 10,
          }}
        />
        <View style={{flex: 1}}>
          <Text allowFontScaling={false} style={{color: code_color.white}}>TEXT SIZE</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Text allowFontScaling={false} style={{flex: 1, color: code_color.white}}>A-</Text>
            <Text
            allowFontScaling={false}
              style={{
                flex: 1,
                textAlign: 'right',
                color: code_color.white,
                fontSize: 18,
              }}>
              A+
            </Text>
          </View>

          <Slider
            step={1}
            // style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={2}
            value={fontSizeDefault === 12 ? 1 : fontSizeDefault === 10 ? 0 : 2}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF"
            onValueChange={value => handleFont(value)}
            thumbTintColor="#ffd500"
          />
        </View>
      </View>
      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />
      <View style={{flex: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
          }}>
          <Text allowFontScaling={false} style={{flex: 1, color: code_color.white, textAlign: 'left'}}>
            CHANGE FONT
          </Text>
          <Text  allowFontScaling={false} style={{color: code_color.white}}>Georgia</Text>
          <Pressable
            onPress={() => setShow(!show)}
            style={{
              backgroundColor: code_color.white,
              padding: 5,
              borderRadius: 20,
              width: 25,
              height: 25,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            {show ? <DownChevron /> : <UpChevron />}
          </Pressable>
        </View>
        {!show ? 
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {fontList.map((item, index) => (
            <Pressable
              style={{
                backgroundColor:
                  fontSelect === item.name ? code_color.white : null,
                borderColor: code_color.white,
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                margin: 10,
                height: 40,
              }}>
              <Text
              allowFontScaling={false}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 0,
                  color:
                    fontSelect === item.name
                      ? code_color.blackDark
                      : code_color.white,
                }}>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView> : null }
      </View>

      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />
      <View style={{flex: 1, marginHorizontal: 20}}>
        <Text allowFontScaling={false} style={{color: code_color.white, textAlign: 'left'}}>
          CHANGE THEME COLOR
        </Text>
        <View
          style={{
            backgroundColor: code_color.white,
            flexDirection: 'row',
            flex: 0,
            marginTop: 10,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          {colorsBg.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => handleBgThemeColor(item.code)}
                style={{
                  backgroundColor: item.code,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: code_color.grey,
                  marginHorizontal: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
               {bgTheme === item.code ? <ChecklistSvg /> : null }
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
FontScreen.propTypes = {
  activeVersion: PropTypes.any,
};

FontScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(FontScreen);

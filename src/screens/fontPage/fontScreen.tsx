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
  Pressable
} from 'react-native';
import {bg, cover1, cover2, libraryAdd, logo} from '../../assets/images';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import {getDefaultLanguange} from '../../utils/devices';
import Button from '../../components/buttons/Button';
import {navigate} from '../../shared/navigationRef';
import LibrarySvg from '../../assets/icons/bottom/library.jsx';
import DownChevron from '../../assets/icons/downChevron';
import UpChevron from '../../assets/icons/upChevron';
import BackRightSvg from '../../assets/icons/backRight.jsx';
import DotSvg from '../../assets/icons/dot.jsx';
import Slider from '@react-native-community/slider';
import { ScrollView } from 'react-native-gesture-handler';

const FontScreen = (props: any) => {
  const [show, setShow] = useState(false)
  const [fontSelect, setSelectFont] = useState('Georgia')
  const [fontList, setFontList] = useState([{
    name: 'Georgia',

  }, {
    name: 'Arial',
  },
  {
    name: 'Robotto'
  },
  {
    name: 'Time News Roman'
  }
])
const [colorsBg, setColorsBg] = useState([
  {
    code: code_color.splash,
  },
  {
    code: code_color.greenDark,
  },
  {
    code: code_color.purpleDark,
  },
  {
    code: code_color.darkTosca,
  },
  {
    code: code_color.purple,
  },
]);
  return (
    <View style={{flex: 0, height: 500, backgroundColor: code_color.blueDark}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 20,
        }}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={{ color: code_color.white }}>BACKGROUND</Text>
          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <View style={{ borderColor: code_color.yellow, borderWidth: 3, borderRadius: 40, padding: 3, marginRight: 10  }}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: code_color.white,
                borderRadius: 30,
              }}
            />
            </View>
           
            <View style={{ borderColor: code_color.yellow, borderWidth: 3, borderRadius: 40, padding: 3, marginLeft: 10  }}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: code_color.blackDark,
                borderRadius: 30,
              }}
            />
            </View>
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
        <View style={{flex: 1,}}>
        <Text style={{ color: code_color.white }}>TEXT SIZE</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
        <Text style={{ flex: 1, color: code_color.white }}>A-</Text>
        <Text style={{ flex: 1, textAlign: 'right',  color: code_color.white, fontSize: 18 }}>A+</Text>
        </View>
       
          <Slider
            step={1}
            // style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={2}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#FFFFFF"
        
            onValueChange={(value) => alert(value)}
            thumbTintColor="#ffd500"
          />
        </View>
      </View>
      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />
      <View style={{ flex: 0 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <Text style={{ flex: 1, color: code_color.white, textAlign: 'left'}}>CHANGE FONT</Text>
        <Text style={{ color: code_color.white,}}>Georgia</Text>
        <Pressable onPress={() => setShow(!show)} style={{ backgroundColor: code_color.white, padding: 5, borderRadius: 20, width: 25, height: 25, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
           {show ? <DownChevron /> :<UpChevron /> }
        </Pressable>
       
       
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {fontList.map((item, index) => (
            <Pressable style={{ backgroundColor: fontSelect === item.name ? code_color.white : null, borderColor: code_color.white, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10, margin: 10, height: 40}}>
              <Text style={{ paddingHorizontal: 20, paddingVertical: 0, color: fontSelect === item.name ? code_color.blackDark : code_color.white }}>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
   

      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />
      <View style={{ flex: 1,   marginHorizontal: 20,  }}>
      <Text style={{ color: code_color.white, textAlign: 'left'}}>CHANGE THEME COLOR</Text>
      <View style={{ backgroundColor: code_color.white, flexDirection: 'row', flex: 0 , marginTop: 10, borderRadius: 30, alignItems: 'center', justifyContent: 'center', padding: 10}}>
      {colorsBg.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => setColorsDefault(item.code)}
                style={{
                  backgroundColor: item.code,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: code_color.grey,
                  marginHorizontal: 10,
                }}
              />
            );
          })}
      </View>
      </View>
        
     
     
   
     
    </View>
  );
};

const styles = StyleSheet.create({});

export default FontScreen;

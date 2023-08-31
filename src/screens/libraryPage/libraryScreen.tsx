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
} from 'react-native';
import {bg, cover1, cover2, libraryAdd, logo} from '../../assets/images';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import {getDefaultLanguange} from '../../utils/devices';
import Button from '../../components/buttons/Button';
import {navigate} from '../../shared/navigationRef';
import LibrarySvg from '../../assets/icons/bottom/library.jsx';
import SearchSvg from '../../assets/icons/search.jsx';
import DescendingSvg from '../../assets/icons/descending.jsx';
import BackRightSvg from '../../assets/icons/backRight.jsx';
import DotSvg from '../../assets/icons/dot.jsx';
const LibraryScreen = (props: any) => {
  return (
    <View style={{flex: 0, height: 500, backgroundColor: code_color.blueDark}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        <Image source={libraryAdd} />
        <View
          style={{
            backgroundColor: code_color.white,
            flex: 1,
            padding: 10,
            borderRadius: 10,
            margin: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <SearchSvg />
          <Text style={{marginLeft: 10, fontSize: 14}}>Search</Text>
        </View>
        <DescendingSvg fill={code_color.white} />
      </View>
      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <LibrarySvg fill={code_color.white} width={20} height={20} />
        <Text style={{marginLeft: 20, flex: 1}}>Recently added collection</Text>
        <BackRightSvg />
      </View>

      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />
      <View
        style={{
          marginHorizontal: 10,
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={cover1} />
        <View style={{marginLeft: 20, flex: 1,justifyContent: 'center', alignContent: 'center'}}>
          <Text style={{ color: code_color.white }}>Fistful of Reefer</Text>
          <Text style={{ color: code_color.white }}>I Miss You</Text>
          <View style={{ backgroundColor: '#ED5267', padding: 5, borderRadius: 10, marginVertical: 5, width: 150 }}>
          <Text style={{ color: code_color.white, fontSize: 10 }}>USD 0,50 For 1 Week Access</Text>
          </View>
        </View>

        <DotSvg />
      </View>
      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />
       <View
        style={{
          marginHorizontal: 10,
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={cover2} />
        <View style={{marginLeft: 20, flex: 1,justifyContent: 'center', alignContent: 'center'}}>
          <Text style={{ color: code_color.white }}>Fistful of Reefer</Text>
          <Text style={{ color: code_color.white }}>I Miss You</Text>
          <View style={{ backgroundColor: '#ED5267', padding: 5, borderRadius: 10, marginVertical: 5, width: 150 }}>
          <Text style={{ color: code_color.white, fontSize: 10 }}>USD 0,50 For 1 Week Access</Text>
          </View>
        </View>

        <DotSvg />
      </View>
      <View
        style={{borderColor: '#778DFF', borderWidth: 1, marginVertical: 10}}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LibraryScreen;

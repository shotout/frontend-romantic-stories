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
import {bg, logo} from '../../assets/images';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import {getDefaultLanguange} from '../../utils/devices';
import Button from '../../components/buttons/Button';
import {navigate} from '../../shared/navigationRef';
import { fixedFontSize, hp, wp } from '../../utils/screen';
import CodePush from 'react-native-code-push';

const OnboardScreen = (props: any) => {

  CodePush.checkForUpdate().then(update => {
    if (update) {
      console.log('Ada pembaruan CodePush:', update);
  
      // Unduh dan instal pembaruan secara manual
      update.download().then(localPackage => {
        return CodePush.sync(
          {
            // Options
            updateDialog: true,  // Menampilkan dialog pembaruan
            installMode: CodePush.InstallMode.IMMEDIATE,  // Mode instalasi
          },
          (status) => {
            switch (status) {
              case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log('Mengunduh pembaruan CodePush');
                break;
              case CodePush.SyncStatus.INSTALLING_UPDATE:
                console.log('Menginstal pembaruan CodePush');
                break;
              case CodePush.SyncStatus.UPDATE_INSTALLED:
                console.log('Pembaruan CodePush berhasil diinstal');
                break;
              case CodePush.SyncStatus.UP_TO_DATE:
                console.log('Aplikasi sudah menggunakan versi terbaru');
                break;
              case CodePush.SyncStatus.UPDATE_IGNORED:
                console.log('Pembaruan CodePush diabaikan');
                break;
              case CodePush.SyncStatus.UNKNOWN_ERROR:
                console.error('Terjadi kesalahan tidak diketahui');
                break;
            }
          },
          // Progress callback (optional)
          (progress) => {
            console.log(`Progress: ${progress.receivedBytes} of ${progress.totalBytes} bytes received`);
          }
        );
      }).catch(error => {
        console.error('Gagal mengunduh atau menginstal pembaruan:', error);
      });
  
    } else {
      console.log('Tidak ada pembaruan CodePush');
    }
  });

  return (
    <ImageBackground
      source={bg}
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
      allowFontScaling={false}
        style={{
          color: 'white',
          fontSize: fixedFontSize(28),
          fontFamily: 'Comfortaa-SemiBold',
          textAlign: 'center',
        }}>
        {'Exciting Stories \n for your everyday fantasy'}
      </Text>
      <Image
        source={logo}
        style={{
          resizeMode: 'contain',
          width: wp(200),
          height: hp(140),
          // marginVertical: 100,
          marginBottom: wp(160)
        }}
      />

      <Button
        title={i18n.t('getStarted')}
        onPress={() => navigate('Register')}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});

export default OnboardScreen;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import BackLeft from '../../../assets/icons/bottom/backLeft';
import {code_color} from '../../../utils/colors';
import Button from '../../../components/buttons/Button';
import {BACKEND_URL} from '../../../shared/static';
import Carousel from 'react-native-reanimated-carousel';
import {getListAvatar, updateProfile} from '../../../shared/request';
import {reloadUserProfile} from '../../../utils/user';
import {isIphoneXorAbove} from '../../../utils/devices';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {hp} from '../../../utils/screen';
import {fetch} from '@react-native-community/netinfo';

function ModalEditPartner({
  isVisible,
  onClose,
  colorTheme,
  userProfile,
  backgroundColor,
  handleSetPartnerAva,
  partnerAva,
  handleSetCharacterPartner,
  handleSetPartner,
  characterPartnerAva,
  characterAva
}) {
  const [progressValue, setProgress] = useState(0);
  const [dataAva, setDataAva] = useState(partnerAva);
  const [avatar, setAvatar] = useState(characterPartnerAva);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAva();
  }, [userProfile.gender]);

  const handleSubmit = async () => {
    fetch().then(async state => {
      if (state.isConnected) {
        try {
          setLoading(true);
          const payload = {
            _method: 'PATCH',
            avatar_female: avatar === null ? progressValue + 1 : avatar,
          };
          await updateProfile(payload);
          reloadUserProfile();
          setLoading(false);
          handleClose();
        } catch (err) {
          setLoading(false);
          console.log('Error select:', err);
        }
      } else {
        offline();
      }
    });
  };
  const offline = () => {
    Alert.alert(
      'YOU SEEM TO BE OFFLINE',
      'Please check your internet connection and try again.',
      [
        {
          text: 'OK',
          onPress: async () => ({}),
        },
      ],
    );
  };
  const fetchAva = async value => {
    try {
      if (!userProfile.gender) {
        const avaMale = await getListAvatar({
          gender: 'male',
          type: userProfile.type,
        });
        const avaFemale = await getListAvatar({
          gender: 'female',
          type: userProfile.type,
        });
        handleSetPartnerAva([...avaMale?.data, ...avaFemale?.data]);
        setDataAva([...avaMale?.data, ...avaFemale?.data]);
        setProgress(userProfile.avatar_female - 1);
      } else {
        const params = {
          gender: userProfile.gender === 'Female' ? 'male' : 'female',
          type: userProfile.type,
        };
        const avatar = await getListAvatar(params);
        handleSetPartnerAva(avatar?.data);
        setDataAva(avatar?.data);
        setProgress(
          userProfile.gender != 'Male'
            ? userProfile.avatar_female > 3
              ? userProfile.avatar_female - 4
              : userProfile.avatar_female === 0
              ? 1
              : userProfile.avatar_female - 1
            : userProfile.avatar_female > 3
            ? userProfile.avatar_female - 4
            : userProfile.avatar_female === 0
            ? 1
            : userProfile.avatar_female - 1,
        );
      }
    } catch (error) {
      // alert(JSON.stringify(error));
    }
  };

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleChange = value => {
    setAvatar(dataAva[value].id);
  };

  const header = () => (
    <View
      style={{
        backgroundColor: colorTheme,
        paddingTop: isIphoneXorAbove() ? moderateScale(40) : moderateScale(25),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: hp(14),
          marginVertical: hp(20),
        }}>
        <Pressable
          onPress={() => onClose()}
          style={{
            backgroundColor: 'white',
            width: hp(30),
            height: hp(30),
            borderRadius: hp(20),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <BackLeft width={hp(20)} height={hp(20)} />
          </View>
        </Pressable>
        <Text
          allowFontScaling={false}
          style={{
            color: 'white',
            marginLeft: 15,
            fontSize: moderateScale(18),
            fontWeight: 'bold',
          }}>
          Select partner character
        </Text>
      </View>
    </View>
  );

  const form = () => (
    <View
      style={{
        padding: hp(25),
        paddingTop: hp(10),
        height: '100%',
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
      }}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: code_color.splash,
          height: '72%',
          width: Dimensions.get('window').width,
          borderBottomLeftRadius: hp(60),
          borderBottomRightRadius: hp(60),
        }}
      />
      <Text
        allowFontScaling={false}
        style={{
          color: 'white',
          fontSize: moderateScale(30),
          textAlign: 'center',
          fontFamily: 'Comfortaa-SemiBold',
          marginTop: moderateScale(10),
          lineHeight: hp(50),
        }}>
        What should your partner look like?
      </Text>
      {dataAva && (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Carousel
            loop={false}
            width={Dimensions.get('window').width / 1.2}
            height={Dimensions.get('window').height / 2}
            defaultIndex={progressValue}
            data={dataAva}
            onSnapToItem={index => {
              setProgress(index);
              handleChange(index);
            }}
            modeConfig={{
              parallaxScrollingScale: 0.78,
              parallaxScrollingOffset: moderateScale(210),
            }}
            mode="parallax"
            renderItem={({item, index}) => (
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 1,
                }}>
                <FastImage
                  source={{
                    uri: `${BACKEND_URL}${item?.image?.url}`,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    height: '100%',
                    width: '10000%',
                    opacity: progressValue != index ? 0.7 : null,
                  }}
                />
                {/* <Image
                  source={{uri: `${BACKEND_URL}${item?.image?.url}`}}
                  resizeMode="contain"
                  style={[
                    {
                      height: '100%',
                      width: '10000%',
                      opacity: progressValue !== index ? 0.5 : 1,
                    },
                  ]}
                /> */}
              </Pressable>
            )}
          />
        </View>
      )}
      {/* <Button
        style={{
          backgroundColor: code_color.yellow,
          alignItems: 'center',
          justifyContent: 'center',
          height: hp(52),
          borderRadius: hp(10),
          width: '100%',
          marginTop: moderateScale(50),
          marginBottom: moderateScale(10),
          display: dataAva ? undefined : 'none',
        }}
        onPress={() => handleSubmit()}
        title={loading ? 'Loading...' : 'Save'}
      /> */}
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            height: '100%',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}>
          {header()}
          {form()}
        </View>
        <Button
          style={{
            backgroundColor: code_color.yellow,
            alignItems: 'center',
            justifyContent: 'center',
            height: hp(50),
            borderRadius: 10,
            width: '95%',
            marginTop: hp(40),
            marginBottom: hp(10),
            position: 'absolute',
            bottom: 20,
            left: 10,
            display: dataAva ? undefined : 'none',
          }}
          onPress={handleSubmit}
          title={loading ? 'Loading...' : 'Save'}
        />
      </View>
    </Modal>
  );
}

ModalEditPartner.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalEditPartner.defaultProps = {};

export default connect(states, dispatcher)(ModalEditPartner);

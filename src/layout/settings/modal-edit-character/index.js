/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Modal, View, Text, Pressable, Image, Dimensions} from 'react-native';
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

function ModalEditCharacter({isVisible, onClose, colorTheme, userProfile}) {
  const [progressValue, setProgress] = useState(0);
  const [dataAva, setDataAva] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProgress(
      userProfile.gender === 'Male'
        ? userProfile.avatar_male - 1
        : userProfile.avatar_female - 1,
    );
  }, [userProfile.gender]);

  useEffect(() => {
    fetchAva();
  }, [userProfile.gender]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        [userProfile.gender === 'Male' ? 'avatar_male' : 'avatar_female']:
          avatar,
        _method: 'PATCH',
      };
      await updateProfile(payload);
      reloadUserProfile();
      setLoading(false);
      handleClose();
    } catch (err) {
      setLoading(false);
      console.log('Error select:', err);
    }
  };

  const fetchAva = async value => {
    try {
      const params = {
        gender: userProfile.gender === 'Male' ? 'male' : 'female',
      };
      const avatar = await getListAvatar(params);
      setDataAva(avatar?.data);
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
          marginHorizontal: 14,
          marginVertical: 20,
        }}>
        <Pressable
          onPress={() => onClose()}
          style={{
            backgroundColor: code_color.white,
            width: 30,
            height: 30,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <BackLeft width={20} height={20} fill={colorTheme} />
          </View>
        </Pressable>
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.white,
            marginLeft: 15,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Select your character
        </Text>
      </View>
    </View>
  );

  const form = () => (
    <View
      style={{
        padding: 25,
        paddingTop: 10,
        height: '100%',
        backgroundColor: code_color.white,
        width: Dimensions.get('window').width,
      }}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: code_color.yellow,
          height: '72%',
          width: Dimensions.get('window').width,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
        }}
      />
      <Text
        style={{
          color: code_color.black,
          fontSize: 30,
          textAlign: 'center',
          fontFamily: 'Comfortaa-SemiBold',
          marginTop: 40,
          lineHeight: 50,
        }}>
        What should your character look like?
      </Text>
      {dataAva && (
        <View style={{flex: 0, alignItems: 'center'}}>
          <Carousel
            loop={false}
            width={Dimensions.get('window').width / 1.5}
            height={Dimensions.get('window').height / 2}
            defaultIndex={1}
            data={dataAva}
            onSnapToItem={index => {
              setProgress(index);
              handleChange(index);
            }}
            modeConfig={{
              parallaxScrollingScale: 0.8,
              parallaxScrollingOffset: 160,
            }}
            mode="parallax"
            renderItem={({item, index}) => (
              <Pressable
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 1,
                }}>
                <Image
                  source={{uri: `${BACKEND_URL}${item?.image?.url}`}}
                  resizeMode="contain"
                  style={[
                    {
                      height: '100%',
                      width: '10000%',
                      opacity: progressValue !== index ? 0.5 : 1,
                    },
                  ]}
                />
              </Pressable>
            )}
          />
        </View>
      )}
      <Button
        style={{
          backgroundColor: code_color.yellow,
          alignItems: 'center',
          justifyContent: 'center',
          height: 52,
          borderRadius: 10,
          width: '100%',
          marginTop: 50,
          marginBottom: 10,
          display: dataAva ? undefined : 'none',
        }}
        onPress={handleSubmit}
        title={loading ? 'Loading...' : 'Save'}
      />
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
      </View>
    </Modal>
  );
}

ModalEditCharacter.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalEditCharacter.defaultProps = {};

export default connect(states, dispatcher)(ModalEditCharacter);

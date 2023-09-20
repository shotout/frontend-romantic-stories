/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  Dimensions,
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

function ModalEditPartner({isVisible, onClose}) {
  const [progressValue, setProgress] = useState(0);

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleChange = value => {
    return;
  };

  const header = () => (
    <View
      style={{
        backgroundColor: code_color.blueDark,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
      }}>
      <View style={{height: 30}} />
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
            <BackLeft width={20} height={20} fill={code_color.blueDark} />
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
          Select partner character
        </Text>
      </View>
    </View>
  );

  const dataAva = [
    {
      id: 4,
      name: 'avatar4',
      gender: 'female',
      status: 2,
      created_at: '2023-09-13T07:48:32.000000Z',
      updated_at: null,
      image: {
        id: 18,
        owner_id: 4,
        type: 'avatar',
        name: '4.png',
        url: '/assets/images/avatars/4.png',
        created_at: '2023-09-13T07:48:32.000000Z',
        updated_at: null,
      },
    },
    {
      id: 5,
      name: 'avatar5',
      gender: 'female',
      status: 2,
      created_at: '2023-09-13T07:48:32.000000Z',
      updated_at: null,
      image: {
        id: 19,
        owner_id: 5,
        type: 'avatar',
        name: '5.png',
        url: '/assets/images/avatars/5.png',
        created_at: '2023-09-13T07:48:32.000000Z',
        updated_at: null,
      },
    },
    {
      id: 6,
      name: 'avatar6',
      gender: 'female',
      status: 2,
      created_at: '2023-09-13T07:48:32.000000Z',
      updated_at: null,
      image: {
        id: 20,
        owner_id: 6,
        type: 'avatar',
        name: '6.png',
        url: '/assets/images/avatars/6.png',
        created_at: '2023-09-13T07:48:32.000000Z',
        updated_at: null,
      },
    },
  ];

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
          backgroundColor: code_color.splash,
          height: '72%',
          width: Dimensions.get('window').width,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
        }}
      />
      <Text
        style={{
          color: code_color.white,
          fontSize: 30,
          textAlign: 'center',
          fontFamily: 'Comfortaa-SemiBold',
          marginTop: 40,
          lineHeight: 50,
        }}>
        What should your partner look like?
      </Text>
      <View style={{flex: 0, alignItems: 'center'}}>
        <Carousel
          loop={false}
          width={Dimensions.get('window').width / 1.5}
          height={Dimensions.get('window').height / 2}
          defaultIndex={1}
          data={dataAva}
          // scrollAnimationDuration={1000}
          // onScrollBegin={(_, absoluteProgress) =>
          //   (progressValue.value = absoluteProgress)

          // }
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
        }}
        onPress={() => console.log('')}
        title={'Save'}
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

ModalEditPartner.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalEditPartner.defaultProps = {};

export default connect(states, dispatcher)(ModalEditPartner);

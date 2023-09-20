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

function ModalEditLanguage({isVisible, onClose}) {
  const [lang, setLang] = useState(null);

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleChange = value => {
    return;
  };

  const dataLang = [
    {
      id: 1,
      code: 'EN',
      name: 'English',
      status: 2,
      created_at: '2023-09-13T07:48:32.000000Z',
      updated_at: null,
      image: {
        id: 21,
        owner_id: 1,
        type: 'lang',
        name: 'en.png',
        url: '/assets/images/langs/en.png',
        created_at: '2023-09-13T07:48:32.000000Z',
        updated_at: null,
      },
    },
    {
      id: 2,
      code: 'ID',
      name: 'Indonesia',
      status: 2,
      created_at: '2023-09-13T07:48:32.000000Z',
      updated_at: null,
      image: {
        id: 22,
        owner_id: 2,
        type: 'lang',
        name: 'id.png',
        url: '/assets/images/langs/id.png',
        created_at: '2023-09-13T07:48:32.000000Z',
        updated_at: null,
      },
    },
  ];

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
          Select language
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
      <Text
        style={{
          color: code_color.blueDark,
          fontSize: 30,
          textAlign: 'center',
          fontFamily: 'Comfortaa-SemiBold',
          marginTop: 40,
          lineHeight: 50,
        }}>
        Select the language of your stories
      </Text>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        {dataLang.map((item, idx) => {
          return (
            <View style={{width: '90%'}}>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() => {
                  setLang(item.id);
                  // languange(item.id);
                }}>
                <View
                  style={
                    lang === item.id
                      ? {
                          backgroundColor: code_color.splash,
                          borderRadius: 35,
                          width: 65,
                          padding: 10,
                          height: 65,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }
                      : {
                          backgroundColor: code_color.white,
                          borderRadius: 35,
                          width: 65,
                          padding: 10,
                          height: 65,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderColor: code_color.grey,
                          borderWidth: 0.3,
                        }
                  }>
                  <Image
                    resizeMode="contain"
                    style={{width: 60, height: 60}}
                    source={{uri: `${BACKEND_URL}${item.image.url}`}}
                  />
                </View>
                <Text
                  allowFontScaling={false}
                  style={{
                    color:
                      lang === item.id ? code_color.splash : code_color.grey,
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'Roboto',
                    textAlign: 'center',
                    marginTop: 10,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderColor: code_color.grey,
                  borderWidth: idx === 0 ? 1 : 0,
                  marginVertical: 40,
                }}
              />
            </View>
          );
        })}
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

ModalEditLanguage.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalEditLanguage.defaultProps = {};

export default connect(states, dispatcher)(ModalEditLanguage);

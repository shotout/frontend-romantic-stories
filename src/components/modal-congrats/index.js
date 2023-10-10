import React, {useEffect, useState} from 'react';
import {
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import BackLeft from '../../assets/icons/bottom/backLeft';
import {code_color} from '../../utils/colors';
import {
  cover1,
  imgCongrats,
  imgLoveLeft,
  imgLoveRight,
  imgUnlock,
  libraryAdd,
} from '../../assets/images';
import LibrarySvg from '../../assets/icons/libraryAdd';
import SearchSvg from '../../assets/icons/search.jsx';
import DescendingSvg from '../../assets/icons/descending.jsx';
import Button from '../buttons/Button';
import CloseSvg from '../../assets/icons/close';
import ChecklistSvg from '../../assets/icons/checklist';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {addNewCollection, updateMyCollection} from '../../shared/request';
import ProgressBar from '../ProgressBar';

function ModalCongrats({isVisible, onClose, onGotIt, restart, edit, data}) {
  const [collect, setCollect] = useState(!data?.name ? '' : data?.name);
  const handleClose = () => {
    onClose();
  };

  const AddCollection = async () => {
    if (collect != '') {
      if (edit) {
        const payload = {
          name: collect,
          _method: 'PATCH',
        };
        try {
          const res = await updateMyCollection(payload, data?.id);
          restart();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await addNewCollection({
            name: collect,
          });
          restart();
        } catch (error) {}
      }
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SafeAreaView
            style={{
              width: '100%',
              backgroundColor: code_color.white,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
              borderRadius: 10,
              padding: 10,
              height: '100%',
            }}>
            <View style={{backgroundColor: code_color.blueDark, flex: 1}}>
              <Pressable
                onPress={() => handleClose()}
                style={{
                  alignItems: 'flex-end',
                  paddingRight: 20,
                  paddingTop: 20,
                }}>
                <CloseSvg width={15} height={15} fill={code_color.white} />
              </Pressable>
              <View style={{flex: 1, backgroundColor: code_color.blueDark}}>
                <View style={{flexDirection: 'column'}}>
                  <Image
                    source={imgCongrats}
                    resizeMode="contain"
                    style={{width: '100%', height: '45%'}}
                  />
                  <Image
                    source={imgLoveLeft}
                    resizeMode="contain"
                    style={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      left: -10,
                      bottom: 120,
                    }}
                  />

                  <Image
                    source={imgLoveRight}
                    resizeMode="contain"
                    style={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      right: -12,
                      bottom: 120,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: code_color.white,
                borderTopLeftRadius: 70,
                borderTopRightRadius: 70,
                position: 'absolute',
                top: '33%',
                left: 0,
                width: '100%',
                flex: 1,
                height: '100%',
                alignItems: 'center',
              }}>
              <View style={{marginTop: 100}}>
                <View
                  style={{
                    backgroundColor: '#FFD12F',
                    flexDirection: 'row',
                    marginHorizontal: 20,
                    marginBottom: 20,
                    padding: 30,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                  }}>
                  <View
                    style={{
                      backgroundColor: code_color.blueDark,
                      padding: 10,
                      position: 'absolute',
                      top: -15,
                      left: '25%',
                      right: 0,
                      width: 200,
                      alignItems: 'center',
                      borderRadius: 15,
                    }}>
                    <Text style={{color: code_color.white}}>Username</Text>
                  </View>
                  <Text>10 XP</Text>
                  <Text>Heartfelt Adventurer </Text>
                </View>
                <ProgressBar progress={50} />
                <Text
                  style={{
                    color: code_color.grey,
                    marginTop: 10,
                    fontSize: 14,
                    marginHorizontal: 30,
                    lineHeight: 24,
                    textAlign: 'center',
                  }}>
                  Earn more XP by reading stories and to level up. The higher
                  your rank, the more exciting stories are coming up for you!
                  Stay tuned for more exclusive features for our Experienced
                  Members!
                </Text>
              </View>

              <Button
                title={'Got it'}
                style={{
                  backgroundColor: code_color.yellow,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // height: 52,
                  padding: 10,
                  borderRadius: 8,
                  width: '90%',
                  marginTop: 20,
                }}
                onPress={() => onGotIt()}
              />
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

ModalCongrats.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onGotIt: PropTypes.func.isRequired,
};

ModalCongrats.defaultProps = {};

export default connect(states, dispatcher)(ModalCongrats);

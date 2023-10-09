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

function ModalCongrats({isVisible, onClose, restart, edit, data}) {
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
                style={{alignItems: 'flex-end', marginRight: 20}}>
                <CloseSvg width={15} height={15} />
              </Pressable>
              <View style={{flex: 1, backgroundColor: code_color.blueDark}}>
                <View>
                  <Image
                    source={imgLoveLeft}
                    resizeMode="contain"
                    style={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      left: -10,
                      bottom: 0,
                    }}
                  />
                  <Image
                    source={imgCongrats}
                    resizeMode="contain"
                    style={{width: '100%', height: '40%'}}
                  />
                  <Image
                    source={imgLoveRight}
                    resizeMode="contain"
                    style={{
                      width: 100,
                      height: 100,
                      position: 'absolute',
                      right: -12,
                      bottom: 0,
                    }}
                  />
                </View>

                <Text
                  style={{
                    color: code_color.blackDark,
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  New Story Unlocked
                </Text>
                <View
                  style={{
                    backgroundColor: '#F5F5F6',
                    width: '90%',
                    alignItems: 'center',
                    padding: 10,
                    marginTop: 20,
                    borderRadius: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={cover1}
                      resizeMode="contain"
                      style={{width: 100, height: 100}}
                    />
                    <View style={{width: '70%'}}>
                      <Text
                        style={{
                          color: code_color.blueDark,
                          marginTop: 10,
                          fontWeight: 'bold',
                          fontSize: 14,
                        }}>
                        [Suggested story this user never read before]
                      </Text>
                      <Text
                        style={{
                          color: '#3F58DD',
                          marginTop: 10,
                          fontSize: 12,
                        }}>
                        [Story category]
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: code_color.grey,
                      marginTop: 10,
                      fontSize: 12,
                    }}>
                    Lorem ipsum dolor sit amet consectetur. Pretium consequat
                    odio ornare aliquet curabitur tincidunt ipsum. Nisi lectus a
                    si...
                  </Text>
                </View>

                <Button
                  title={'Start reading'}
                  style={{
                    backgroundColor: '#009A37',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // height: 52,
                    padding: 10,
                    borderRadius: 8,
                    width: '90%',
                    marginTop: 20,
                  }}
                  colorsText={code_color.white}
                  onPress={() => handleClose()}
                />
              </View>
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
};

ModalCongrats.defaultProps = {};

export default connect(states, dispatcher)(ModalCongrats);

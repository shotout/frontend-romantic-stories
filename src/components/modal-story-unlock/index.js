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
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import BackLeft from '../../assets/icons/bottom/backLeft';
import {code_color} from '../../utils/colors';
import {
  cover1,
  imgLoveLeft,
  imgLoveRight,
  imgUnlock,
  imgUnlockPremium,
  libraryAdd,
} from '../../assets/images';
import LibrarySvg from '../../assets/icons/libraryAdd';
import LoveIcon from '../../assets/icons/loveOutline';
import Reading from '../../assets/icons/reading.jsx';
import Button from '../buttons/Button';
import CloseSvg from '../../assets/icons/close';
import ChecklistSvg from '../../assets/icons/checklist';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {addNewCollection, updateMyCollection} from '../../shared/request';
import {moderateScale} from 'react-native-size-matters';
import {ScrollView} from 'react-native-gesture-handler';
import {successPurchase} from '../../assets/icons';

function ModalUnlockStory({
  isVisible,
  onClose,
  restart,
  edit,
  data,
  isPremium,
}) {
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

  const renderPremium = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <View
          style={{
            backgroundColor: code_color.blueDark,
            width: '90%',
            borderRadius: moderateScale(24),
          }}>
          <Image
            source={imgUnlockPremium}
            style={{
              height: 150,
              aspectRatio: '1.7/1',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontSize: moderateScale(18),
              color: code_color.white,
              fontWeight: 700,
              textAlign: 'center',
              marginTop: moderateScale(10),
              marginBottom: moderateScale(20),
            }}>
            {'New Story unlocked'}
          </Text>
          <Image
            source={imgLoveLeft}
            resizeMode="contain"
            style={{
              width: 100,
              height: 150,
              position: 'absolute',
              left: 0,
              top: 150,
            }}
          />

          <Image
            source={imgLoveRight}
            resizeMode="contain"
            style={{
              width: 100,
              height: 150,
              position: 'absolute',
              right: 0,
              top: 150,
            }}
          />
          <View
            style={{
              alignItems: 'center',
              backgroundColor: code_color.white,
              borderRadius: moderateScale(24),
              // padding: moderateScale(20),
            }}>
            <View style={{flexDirection: 'row', padding: moderateScale(20)}}>
              <Image
                source={cover1}
                resizeMode="contain"
                style={{
                  width: 65,
                  height: 87,
                  marginRight: moderateScale(10),
                }}
              />
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: code_color.blueDark,
                    marginTop: 10,
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  [Suggested story this user never read before]
                </Text>
                <Text
                  style={{
                    color: '#3F58DD',
                    marginTop: 10,
                    fontWeight: 400,
                    fontSize: 14,
                  }}>
                  [Story category]
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: code_color.blackDark,
                fontSize: 12,
                marginTop: 5,
                marginHorizontal: 10,
              }}>
              Lorem ipsum dolor sit amet consectetur. Pretium consequat odio
              ornare aliquet curabitur tincidunt ipsum. Nisi lectus a si...
            </Text>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#DDDEE3',
                marginTop: moderateScale(20),
                marginBottom: moderateScale(10),
              }}
            />
           
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: '#009A37',
                marginTop: moderateScale(20),
                padding: moderateScale(12),
                alignItems: 'center',
                borderRadius: 8,
                width: '80%',
                marginBottom: 10
              }}>
              <Reading
                style={{position: 'absolute', left: '15%', top: '40%'}}
              />
              <Text
                style={{
                  color: code_color.white,
                  fontWeight: 500,
                  fontSize: moderateScale(14),
                }}>
                Start reading
              </Text>
            </TouchableOpacity>
            <View style={{backgroundColor: '#F0F2FF', width: '100%', borderRadius: 10, paddingBottom: 10}}>
              <Text
                style={{
                  color: code_color.black,
                  fontWeight: 500,
                  fontSize: moderateScale(16),
                  textAlign: 'center',
                  marginVertical: 10
                }}>
                Other Stories you might like:
              </Text>
              <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10}}>
                  <Image
                    source={cover1}
                    resizeMode="contain"
                    style={{
                      width: 65,
                      height: 87,
                      marginBottom: moderateScale(10),
                    }}
                  />
                  <Text
                    style={{
                      color: code_color.black,
                      fontWeight: 500,
                      fontSize: moderateScale(14),
                      textAlign: 'center'
                    }}>
                    Title of the Story A
                  </Text>
                </View>

                <View style={{flex: 1, alignItems: 'center',  marginHorizontal: 10}}>
                  <Image
                    source={cover1}
                    resizeMode="contain"
                    style={{
                      width: 65,
                      height: 87,
                      marginBottom: moderateScale(10),
                    }}
                  />
                  <Text
                    style={{
                      color: code_color.black,
                      fontWeight: 500,
                      fontSize: moderateScale(14),
                      textAlign: 'center'
                    }}>
                    Title of the Story A
                  </Text>
                </View>
                <View style={{flex: 1, alignItems: 'center',  marginHorizontal: 10}}>
                  <Image
                    source={cover1}
                    resizeMode="contain"
                    style={{
                      width: 65,
                      height: 87,
                      marginBottom: moderateScale(10),
                    }}
                  />
                  <Text
                    style={{
                      color: code_color.black,
                      fontWeight: 500,
                      fontSize: moderateScale(14),
                      textAlign: 'center'
                    }}>
                    Title of the Story A
                  </Text>
                </View>
              </View>

              <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: code_color.yellow,
                marginTop: moderateScale(20),
                padding: moderateScale(8),
                alignItems: 'center',
                borderRadius: 8,
                width: '85%',
                marginHorizontal: moderateScale(20),
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'center'
              }}>
              <LibrarySvg
               fill={code_color.black}
              />
              <Text
                style={{
                  color: code_color.black,
                  fontWeight: 500,
                  fontSize: moderateScale(14),
                }}>
                Explore more Stories
              </Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={handleClose}>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
        {isPremium ? (
          renderPremium()
        ) : (
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
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
                height: '65%',
              }}>
              <View style={{alignItems: 'center', flex: 1}}>
                <Image
                  source={imgUnlock}
                  resizeMode="contain"
                  style={{width: '100%', height: '40%'}}
                />
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
          </View>
        )}
      </View>
    </Modal>
  );
}

ModalUnlockStory.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalUnlockStory.defaultProps = {};

export default connect(states, dispatcher)(ModalUnlockStory);

/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {code_color} from '../../utils/colors';
import {
  cover1,
  imgLoveLeft,
  imgLoveRight,
  imgUnlockPremium,
} from '../../assets/images';
import LibrarySvg from '../../assets/icons/libraryAdd';
import Reading from '../../assets/icons/reading.jsx';
import {addNewCollection, updateMyCollection} from '../../shared/request';
import {moderateScale} from 'react-native-size-matters';
import {navigate} from '../../shared/navigationRef';

function ModalUnlockStory({
  isVisible,
  onClose,
  restart,
  edit,
  data,
  isPremium,
  readLater,
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
              height: 120,
              aspectRatio: '1.7/1',
              alignSelf: 'center',
              marginTop: moderateScale(20),
            }}
          />
          <Text
            style={{
              fontSize: moderateScale(18),
              color: code_color.white,
              fontWeight: 700,
              textAlign: 'center',
              marginTop: moderateScale(25),
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
            }}>
            <View
              style={{
                width: '100%',
                padding: moderateScale(14),
                paddingHorizontal: moderateScale(20),
                borderRadius: moderateScale(8),
              }}>
              <View style={{flexDirection: 'row'}}>
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
                  marginTop: moderateScale(16),
                }}>
                Lorem ipsum dolor sit amet consectetur. Pretium consequat odio
                ornare aliquet curabitur tincidunt ipsum. Nisi lectus a si...
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={{
                  backgroundColor: '#009A37',
                  marginTop: moderateScale(20),
                  padding: moderateScale(12),
                  alignItems: 'center',
                  borderRadius: 8,
                  width: '100%',
                }}>
                <Reading
                  style={{
                    position: 'absolute',
                    left: '16%',
                    top: '40%',
                  }}
                />
                <Text
                  style={{
                    color: code_color.white,
                    fontWeight: 600,
                    fontSize: moderateScale(14),
                  }}>
                  Start reading
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: '#F0F2FF',
                width: '100%',
                borderRadius: moderateScale(24),
                paddingBottom: 10,
              }}>
              <Text
                style={{
                  color: code_color.black,
                  fontWeight: 700,
                  fontSize: moderateScale(16),
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                Other Stories you might like:
              </Text>
              <View style={{flexDirection: 'row'}}>
                {[1, 2, 3].map(itm => (
                  <Pressable
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 10,
                    }}>
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
                        fontSize: moderateScale(12),
                        textAlign: 'center',
                      }}>
                      Title of the Story A
                    </Text>
                  </Pressable>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigate('ExploreLibrary');
                  onClose();
                }}
                style={{
                  backgroundColor: code_color.yellow,
                  marginTop: moderateScale(20),
                  paddingVertical: moderateScale(12),
                  alignItems: 'center',
                  borderRadius: 8,
                  width: '85%',
                  marginHorizontal: moderateScale(20),
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <LibrarySvg
                  fill={code_color.black}
                  height={26}
                  style={{position: 'absolute', left: '10%'}}
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
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <View
              style={{
                backgroundColor: code_color.white,
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
                  color: code_color.black,
                  fontWeight: 700,
                  textAlign: 'center',
                  marginTop: moderateScale(10),
                  marginBottom: moderateScale(20),
                }}>
                {'New Story unlocked'}
              </Text>
              <View
                style={{
                  alignItems: 'center',
                  // backgroundColor: code_color.white,
                  borderRadius: moderateScale(24),
                  // padding: moderateScale(20),
                }}>
                <View
                  style={{
                    backgroundColor: '#F5F5F6',
                    width: '90%',
                    padding: moderateScale(12),
                    borderRadius: moderateScale(8),
                  }}>
                  <View style={{flexDirection: 'row'}}>
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
                      marginTop: moderateScale(16),
                    }}>
                    Lorem ipsum dolor sit amet consectetur. Pretium consequat
                    odio ornare aliquet curabitur tincidunt ipsum. Nisi lectus a
                    si...
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={onClose}
                  style={{
                    backgroundColor: '#009A37',
                    marginTop: moderateScale(20),
                    padding: moderateScale(12),
                    alignItems: 'center',
                    borderRadius: 8,
                    width: '90%',
                    marginBottom: moderateScale(20),
                  }}>
                  <Text
                    style={{
                      color: code_color.white,
                      fontWeight: 500,
                      fontSize: moderateScale(14),
                    }}>
                    Start reading
                  </Text>
                </TouchableOpacity>
                {readLater && (
                  <TouchableOpacity
                    onPress={onClose}
                    style={{
                      backgroundColor: '#ED5267',
                      padding: moderateScale(4),
                      alignItems: 'center',
                      borderRadius: 8,
                      width: '90%',
                      marginBottom: moderateScale(20),
                    }}>
                    <Text
                      style={{
                        color: code_color.white,
                        fontWeight: 500,
                        fontSize: moderateScale(14),
                      }}>
                      Read later
                    </Text>
                    <Text
                      style={{
                        color: code_color.white,
                        fontWeight: 400,
                        fontSize: moderateScale(12),
                      }}>
                      You can proceed reading your current story
                    </Text>
                  </TouchableOpacity>
                )}
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
  readLater: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalUnlockStory.defaultProps = {};

export default connect(states, dispatcher)(ModalUnlockStory);

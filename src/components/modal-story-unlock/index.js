/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
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
import {
  addNewCollection,
  getStoryDetail,
  updateMyCollection,
} from '../../shared/request';
import {moderateScale} from 'react-native-size-matters';
import {navigate} from '../../shared/navigationRef';
import {BACKEND_URL} from '../../shared/static';
import ModalStoryPreview from '../modal-story-preview';
import FastImage from 'react-native-fast-image';
import {hp, wp} from '../../utils/screen';
import {sizing} from '../../shared/styling';

function ModalUnlockStory({
  isVisible,
  onClose,
  restart,
  edit,
  data,
  isPremium,
  readLater,
  nextStory,
  handleRead,
  handleReadOther,
  handleLater,
  relateStory,
}) {
  const [collect, setCollect] = useState(!data?.name ? '' : data?.name);
  const handleClose = () => {
    onClose();
  };

  const [showPreview, setShowPreview] = useState(false);
  const [dataStory, setDataStory] = useState(null);

  useEffect(() => {
    if (!isVisible) {
      setDataStory(null);
      setShowPreview(false);
    }
  }, [isVisible]);
  const renderPremium = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <ModalStoryPreview
          isVisible={showPreview}
          onClose={() => setShowPreview(false)}
          dataStory={dataStory}
          readLater={readLater}
          handleRead={() => handleRead(dataStory)}
          handleLater={() => handleLater(dataStory)}
        />
        <View
          style={{
            backgroundColor: code_color.blueDark,
            width: '100%',
            height: '100%',
            paddingTop: 50,
            borderRadius: moderateScale(24),
          }}>
          <Image
            source={imgUnlockPremium}
            style={{
              height: hp(100),
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
              width: hp(100),
              height: hp(150),
              position: 'absolute',
              left: 0,
              top: hp(150),
            }}
          />

          <Image
            source={imgLoveRight}
            resizeMode="contain"
            style={{
              width: hp(100),
              height: hp(150),
              position: 'absolute',
              right: 0,
              top: hp(150),
            }}
          />
          <View
            style={{
              alignItems: 'center',
              backgroundColor: code_color.white,
              borderRadius: moderateScale(24),
              flex: 1,
            }}>
            <View
              style={{
                width: '100%',
                padding: moderateScale(20),
                paddingHorizontal: moderateScale(30),
                borderRadius: moderateScale(8),
              }}>
              <View style={{flexDirection: 'row'}}>
                <FastImage
                  source={{
                    uri: `${BACKEND_URL}${nextStory?.category?.cover?.url}`,
                  }}
                  resizeMode="contain"
                  style={{
                    width: hp(60),
                    height: hp(82),
                    marginRight: moderateScale(10),
                  }}
                />
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: '#3F58DD',
                      marginTop: 10,
                      fontWeight: 400,
                      fontSize: moderateScale(14),
                    }}>
                    {nextStory?.category.name}
                  </Text>
                  <Text
                    style={{
                      color: code_color.blueDark,
                      marginTop: 10,
                      fontWeight: 'bold',
                      fontSize: moderateScale(16),
                    }}>
                    {nextStory?.title_en}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  color: code_color.blackDark,
                  fontSize: moderateScale(12),
                  marginTop: moderateScale(16),
                }}>
                {nextStory?.content_en?.substring(0, 100)}...
              </Text>
              <TouchableOpacity
                onPress={handleRead}
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
                  height={hp(25)}
                  width={hp(25)}
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
                borderRadius: moderateScale(24),
                paddingBottom: 10,
                width: sizing.getDimensionWidth(1) - hp(30),
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
              <ScrollView
                style={{maxHeight: hp(220)}}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {relateStory?.most_read
                  ?.filter(itm => itm.id !== nextStory?.id)
                  .slice(0, 3)
                  .map(itm => (
                    <Pressable
                      onPress={async () => {
                        const resp = await getStoryDetail(itm.id);
                        setDataStory(resp.data);
                        setShowPreview(true);
                      }}
                      style={{
                        flex: 1,
                        // alignItems: 'center',
                        // backgroundColor: 'red',
                        // justifyContent: 'center',
                        width: hp(110),
                        marginRight: hp(5),
                      }}>
                      <FastImage
                        source={{
                          uri: `${BACKEND_URL}${itm?.category?.cover?.url}`,
                        }}
                        resizeMode="contain"
                        style={{
                          width: hp(110),
                          height: hp(110),
                          marginBottom: moderateScale(10),
                        }}
                      />

                      <Text
                        style={{
                          color: code_color.black,
                          fontSize: moderateScale(10),
                          textAlign: 'left',
                          marginBottom: 5,
                          marginLeft: 15,
                        }}>
                        {itm.category.name}
                      </Text>
                      <Text
                        style={{
                          color: code_color.black,
                          fontWeight: 500,
                          fontSize: moderateScale(12),
                          marginLeft: 15,
                          // textAlign: 'center',
                        }}>
                        {itm.title_en}
                      </Text>
                    </Pressable>
                  ))}
              </ScrollView>

              <TouchableOpacity
                onPress={() => {
                  navigate('ExploreLibrary');
                  onClose();
                }}
                style={{
                  backgroundColor: code_color.yellow,
                  paddingVertical: moderateScale(12),
                  alignItems: 'center',
                  borderRadius: 8,
                  marginTop: 20,
                  marginHorizontal: moderateScale(15),
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <LibrarySvg
                  fill={code_color.black}
                  height={hp(26)}
                  style={{position: 'absolute', left: '10%'}}
                />
                <Text
                  style={{
                    color: code_color.black,
                    fontWeight: '600',
                    fontSize: moderateScale(16),
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
                  height: hp(150),
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
                      source={{
                        uri: `${BACKEND_URL}${nextStory?.category?.cover?.url}`,
                      }}
                      resizeMode="contain"
                      style={{
                        width: hp(60),
                        height: hp(82),
                        marginRight: moderateScale(10),
                      }}
                    />
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          color: '#3F58DD',
                          marginTop: 10,
                          fontWeight: 400,
                          fontSize: moderateScale(14),
                        }}>
                        {nextStory?.category?.name}
                      </Text>
                      <Text
                        style={{
                          color: code_color.blueDark,
                          marginTop: 10,
                          fontWeight: 'bold',
                          fontSize: moderateScale(16),
                        }}>
                        {nextStory?.title_en}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: code_color.blackDark,
                      fontSize: moderateScale(12),
                      marginTop: moderateScale(16),
                    }}>
                    {nextStory?.content_en?.slice(0, 130)}...
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleRead}
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
                    onPress={handleLater ? handleLater : onClose}
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

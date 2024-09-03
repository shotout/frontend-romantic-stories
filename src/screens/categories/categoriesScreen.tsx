/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {cover2, imgNotif, imgStep4} from '../../assets/images';
import {code_color} from '../../utils/colors';
import SearchSvg from '../../assets/icons/search.jsx';
import LockIcon from '../../assets/icons/lock';
import Watch from './../../assets/icons/watch';
import DescendingSvg from '../../assets/icons/descending.jsx';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import BackRight from '../../assets/icons/backRight';
import UnlockCategoryIcon from '../../assets/icons/unlockCategory';
import {goBack, navigate} from '../../shared/navigationRef';
import {moderateScale} from 'react-native-size-matters';
import {getListCategory, updateProfile} from '../../shared/request';
import {BACKEND_URL} from '../../shared/static';
import {reloadUserProfile} from '../../utils/user';
import ChecklistSvg from './../../assets/icons/checklist';
import ModalUnlockPremium from '../../components/modal-unlock-premium';
import {loadRewardedCategory} from '../../helpers/loadReward';
import {RewardedAdEventType} from 'react-native-google-mobile-ads';
import Loading from '../../components/loading';
import FastImage from 'react-native-fast-image';
import {hp} from '../../utils/screen';

const CategoriesScreen = ({
  colorTheme,
  categories,
  handleSetSteps,
  stepsTutorial,
  userProfile,
  backgroundColor,
}) => {
  const [bgTheme, setBgTheme] = useState(colorTheme);
  const [showModalUnlock, setShowModalUnlock] = useState(false);
  const [loadingAds, setLoadingAds] = useState(false);
  const [dataStory, setDataStory] = useState([]);
  const [selectCategory, setSelectCategory] = useState(
    userProfile?.category_id,
  );
  const [nextCategory, setNextCategory] = useState();
  const [loading, setLoading] = useState(false);
  const isPremium =
    userProfile?.subscription?.plan?.id === 2 ||
    userProfile?.subscription?.plan?.id === 3;

  useEffect(() => {
    setLoading(true);
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const params = {
        type : userProfile?.type
      }
      const category = await getListCategory(params);
      setDataStory(category?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // alert(JSON.stringify(error));
    }
  };

  const fetchUpdate = async (id: any) => {
    const payload = {
      _method: 'PATCH',
      category_id: id,
    };
    await updateProfile(payload);
    reloadUserProfile();
    goBack();
  };

  const showInterStialCategory = async () => {
    setLoadingAds(true);
    const advert = await loadRewardedCategory();
    const pageCountDownReward = advert.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward: any) => {
        console.log('Earn page countdown reward:', reward);
        if (reward) {
          Alert.alert('Congrats! You have unlocked the selected Topic.', '', [
            {
              text: 'OK',
              onPress: async () => fetchUpdate(nextCategory),
            },
          ]);
        }
        setLoadingAds(false);
      },
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: bgTheme}}>
      <View
        style={{
          flex: 0,
          backgroundColor: bgTheme,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: hp(10),
            marginVertical: hp(10),
          }}>
          <Pressable
            onPress={() => navigate('Settings')}
            style={{
              width: hp(35),
              height: hp(35),
              backgroundColor: 'white',
              borderRadius: hp(20),
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(180deg)',
            }}>
            <BackRight fill={bgTheme} height={hp(18)} width={hp(18)} />
          </Pressable>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: moderateScale(18),
                fontWeight: '600',
                color: 'white',
              }}>
              Edit Categories
            </Text>
          </View>
          <View
            style={{
              width: hp(35),
              height: hp(35),
            }}
          />
        </View>
      </View>
      <View style={{height: '100%', flex: 0, backgroundColor: 'white'}}>
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.blueDark,
            fontSize: moderateScale(20),
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: hp(30),
            marginBottom: hp(20),
          }}>
          {'Select the Topics\r\nof your Stories'}
        </Text>

        {dataStory.map(item => (
          <TouchableOpacity
            onPress={() => {
              if (isPremium) {
                setSelectCategory(item.id);
              } else if (selectCategory === item.id) {
              } else {
                setNextCategory(item?.id);
                setShowModalUnlock(true);
              }
            }}
            style={{
              alignItems: 'center',
              marginVertical: hp(2),
              padding: hp(2),
              justifyContent: 'center',
            }}>
            <FastImage
              source={{
                uri: `${BACKEND_URL}${item.image?.url}`,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
              style={{
                width: Dimensions.get('window').width - 50,
                height: hp(90),
                borderWidth: hp(5),
                borderRadius: hp(10),
                borderColor: selectCategory === item.id ? bgTheme : 'white',
              }}
            />
            <Text
              allowFontScaling={false}
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: moderateScale(16),
                fontWeight: 'bold',
                color: code_color.white,
              }}>
              {item?.name}
            </Text>
            {isPremium ? (
              <TouchableOpacity
                style={{
                  backgroundColor:
                    selectCategory === item.id ? bgTheme : 'white',
                  borderRadius: hp(30),
                  width: hp(25),
                  height: hp(25),
                  position: 'absolute',
                  top: hp(35),
                  left: moderateScale(45),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ChecklistSvg height={hp(16)} width={hp(16)} />
              </TouchableOpacity>
            ) : (
              <>
                {selectCategory === item?.id ? null : (
                  <View
                    style={{
                      position: 'absolute',
                      top: '40%',
                      right: hp(30),
                      backgroundColor: code_color.pink,
                      borderRadius: hp(8),
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: hp(5),
                      paddingVertical: hp(2),
                    }}>
                    <Watch
                      fill={code_color.white}
                      height={hp(16)}
                      width={hp(16)}
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: moderateScale(10),
                        fontWeight: '700',
                        marginLeft: 2,
                      }}>
                      Free
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      selectCategory === item.id ? bgTheme : code_color.black,
                    borderRadius: hp(30),
                    width: hp(25),
                    height: hp(25),
                    position: 'absolute',
                    top: hp(35),
                    left: moderateScale(45),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {selectCategory === item.id ? (
                    <ChecklistSvg height={hp(14)} width={hp(14)} />
                  ) : (
                    <LockIcon height={hp(14)} width={hp(14)} />
                  )}
                </TouchableOpacity>
              </>
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={{
            backgroundColor: code_color.yellow,
            alignItems: 'center',
            justifyContent: 'center',
            height: hp(52),
            borderRadius: hp(12),
            marginTop: hp(30),
            marginHorizontal: hp(20),
            // width: '100%',
          }}
          onPress={() => {
            fetchUpdate(selectCategory);
          }}>
          <Text
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: moderateScale(16),
              fontWeight: 'bold',
              color: code_color.black,
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <ModalUnlockPremium
        isVisible={showModalUnlock}
        onClose={() => setShowModalUnlock(false)}
        title={'Unlock this topic\r\nfor free now'}
        desc={
          'Watch a Video to unlock this Topic\r\nfor Free or go UNLIMITED\r\nfor full access!'
        }
        onSuccess={showInterStialCategory}
        Icon={() => <UnlockCategoryIcon style={{marginBottom: 20}} />}
        isLoadingAds={loadingAds}
      />
      <Loading loading={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

CategoriesScreen.propTypes = {
  activeVersion: PropTypes.any,
};

CategoriesScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(CategoriesScreen);

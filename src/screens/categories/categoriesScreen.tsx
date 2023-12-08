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
} from 'react-native';
import {cover2, imgNotif, imgStep4} from '../../assets/images';
import {code_color} from '../../utils/colors';
import SearchSvg from '../../assets/icons/search.jsx';
import LockFree from '../../assets/icons/lockFree';
import DescendingSvg from '../../assets/icons/descending.jsx';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import BackRight from '../../assets/icons/backRight';
import {goBack, navigate} from '../../shared/navigationRef';
import AnimatedLottieView from 'lottie-react-native';
import {moderateScale} from 'react-native-size-matters';
import {
  getExploreStory,
  getListAvatarTheme,
  getListCategory,
  updateProfile,
} from '../../shared/request';
import {BACKEND_URL} from '../../shared/static';
import {handleSetSteps} from '../../store/defaultState/actions';
import i18n from '../../i18n';
import Button from '../../components/buttons/Button';
import StepHeader from '../../layout/step/stepHeader';
import {Switch} from 'react-native-gesture-handler';
import {reloadUserProfile} from '../../utils/user';
import ChecklistSvg from './../../assets/icons/checklist';
const swipeupIcon = require('../../assets/lottie/swipe_up.json');

const CategoriesScreen = ({
  colorTheme,
  categories,
  handleSetSteps,
  stepsTutorial,
  userProfile,
  backgroundColor
}) => {
  const [bgTheme, setBgTheme] = useState(colorTheme);

  const [dataStory, setDataStory] = useState([]);
  const [selectStory, setSelectStory] = useState('');

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const category = await getListCategory();
      setDataStory(category?.data);
    } catch (error) {
      // alert(JSON.stringify(error));
    }
  };

  const fetchUpdate = async () => {
    const payload = {
      _method: 'PATCH',
      category_id: selectStory,
    };
    await updateProfile(payload);
    reloadUserProfile();
    goBack()
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
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <Pressable
            onPress={() => goBack()}
            style={{
              width: 35,
              height: 35,
              backgroundColor: backgroundColor,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(180deg)',
            }}>
            <BackRight fill={bgTheme} />
          </Pressable>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text allowFontScaling={false} style={{fontSize: 18, fontWeight: '600', color: backgroundColor}}>
              Edit Categories
            </Text>
          </View>
          <View
            style={{
              width: 35,
              height: 35,
            }}
          />
        </View>
      </View>
      <View
        style={{height: '100%', flex: 0, backgroundColor: backgroundColor}}>
        <Text
          allowFontScaling={false}
          style={{
            color: code_color.blueDark,
            fontSize: moderateScale(20),
            fontFamily: 'Comfortaa-SemiBold',
            textAlign: 'center',
            marginTop: moderateScale(30),
            marginBottom: moderateScale(20)
          }}>
          {'Select the Topics \n of your Stories'}
        </Text>

        {dataStory.map(item => (
          <TouchableOpacity
            onPress={() => {
              setSelectStory(item.id);
            }}
            style={{
              alignItems: 'center',
              marginVertical: 2,
              // borderColor:
              //   selectStory === item.id ? code_color.splash : 'white',
              padding: 2,
              // borderWidth: 1,
              // borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: `${BACKEND_URL}${item.image?.url}`}}
              resizeMode="contain"
              // source={{
              //   uri: 'https://backend-dev-erotales.mooti.app/assets/images/categories/i_miss_u.png',
              // }}
              style={{
                width: moderateScale(Dimensions.get('window').width - 50),
                height: moderateScale(85),
                borderWidth: 2,
                borderRadius: 10,
                borderColor:
                selectStory === item.id ? code_color.splash : 'white',
                // backgroundColor:
                //   selectStory === item.name ? code_color.splash : 'white',
              }}
            />
            <Text
              allowFontScaling={false}
              style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: code_color.white,
              }}>
              {item?.name}
            </Text>
            <TouchableOpacity
              onPress={() => setSelectStory(item.id)}
              style={{
                backgroundColor:
                  selectStory === item.id ? code_color.splash : 'white',
                borderRadius: 30,
                width: 25,
                height: 25,
                position: 'absolute',
                top: 35,
                left: moderateScale(45),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ChecklistSvg />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
    
        <TouchableOpacity
          style={{
            backgroundColor: code_color.yellow,
            alignItems: 'center',
            justifyContent: 'center',
            height: 52,
            borderRadius: 12,
            marginTop: 30,
            marginHorizontal: 20
            // width: '100%',
          }}
          onPress={() => {
            fetchUpdate()
          }}>
          <Text style={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: code_color.black,
              }}>Save</Text>
        </TouchableOpacity>
      </View>
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

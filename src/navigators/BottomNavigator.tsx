import React, {Component, useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {code_color} from '../utils/colors';
import LoveSvg from './../assets/icons/bottom/love.jsx';
import LoveOutline from './../assets/icons/bottom/loveOutline.jsx';
import FontSvg from './../assets/icons/bottom/font.jsx';
import LibrarySvg from './../assets/icons/bottom/library.jsx';
import SettingSvg from './../assets/icons/bottom/settings.jsx';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {navigate} from '../shared/navigationRef';
import BottomBarContext from './BottomBarContex';
import LibraryScreen from '../screens/libraryPage/libraryScreen';
import MainScreen from '../screens/mainPage/mainScreen';
import Main from './Main';
import FontScreen from '../screens/fontPage/fontScreen';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import SettingsPage from '../screens/settingsPage/settingsPage';
import AnimatedLottieView from 'lottie-react-native';
import {imgHearts, imgSC, imgStep2, imgStep4} from '../assets/images';
import Button from '../components/buttons/Button';
import i18n from '../i18n';
import StepHeader from '../layout/step/stepHeader';
import {handleSetSteps, handleSetStory} from '../store/defaultState/actions';
import store from '../store/configure-store';
import {
  addStory,
  deleteMyStory,
  getStoryDetail,
  getStoryList,
} from '../shared/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isIphoneXorAbove} from '../utils/devices';
import {fixedFontSize, hp, wp} from '../utils/screen';
import ShareSvg from '../assets/icons/shareDefault';
import {
  ADD_STORY_TO_LIBRARY,
  STORY_LIKED,
  eventTracking,
} from '../helpers/eventTracking';
import {useIsFocused} from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import {moderateScale} from 'react-native-size-matters';
import ModalShareStory from '../components/modal-share-story';
import { fetch } from '@react-native-community/netinfo';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Library = ({userProfile, stepsTutorial, backgroundColor}) => {
  const isFocused = useIsFocused();
  const [menu, setMenu] = useState([
    {
      image: ShareSvg,
      name: 'SHARE',
      value: 'Main',
    },
    {
      image:
        userProfile?.userStory?.is_collection === null ? (
          <LoveOutline width={20} height={20} fill={userProfile?.colorTheme} />
        ) : (
          <LoveSvg width={20} height={20} fill={userProfile?.colorTheme} />
        ),
      name: 'SAVE',
      value: 'Main',
    },
    {
      image: LibrarySvg,
      name: 'MY LIBRARY',
      value: 'Library',
    },
    {
      image: FontSvg,
      name: 'TEXT',
      value: 'Font',
    },
    {
      image: SettingSvg,
      name: 'SETTINGS',
      value: 'Settings',
    },
  ]);
  const [screen, setScreen] = useState('SHARE');
  const bottomBarContext = React.useContext(BottomBarContext);
  const {isBottomBarVisible, setBottomBarVisibility} = bottomBarContext;

  const handleSomeAction = (value: string) => {
    // misalnya setelah mengklik suatu tombol
    setBottomBarVisibility(value);
    if (value == 'Main') {
      navigate('Main', {isFromBottomBar: true});
    }
    if (value == 'ExploreLibrary') {
      navigate('ExploreLibrary');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          bottom: 0,
          flexDirection: 'column',
        }}>
        <SafeAreaView
          style={{
            position: 'absolute',
            top:
              isBottomBarVisible === 'Settings'
                ? (Platform.OS === 'android' &&
                    Dimensions.get('window').height > 908) ||
                  Dimensions.get('window').height < 909
                  ? -200
                  : -151
                : isBottomBarVisible === 'Font' && Platform.OS === 'android'
                ? -Dimensions.get('window').height / 2
                : isBottomBarVisible === 'Font' && Platform.OS === 'ios'
                ? -Dimensions.get('window').height /
                  (!isIphoneXorAbove() ? 2.8 : 2)
                : isBottomBarVisible === 'Library'
                ? -Dimensions.get('window').height /
                  (Platform.OS === 'android' ? 2.6 : 2.7)
                : 0,
            width: '100%',
            height: '100%',
            flex: 0,
          }}>
          {/* <MainScreen
              pressScreen={() => handleSomeAction('Main')}
              route={undefined}
              colorText={userProfile?.colorText}
            /> */}
          {isBottomBarVisible != 'Main' ? (
            <TouchableOpacity
              onPress={() => handleSomeAction('Main')}
              style={{
                position: 'absolute',
                top:
                  isBottomBarVisible === 'Settings'
                    ? 10
                    : isBottomBarVisible === 'Library'
                    ? hp(20)
                    : hp(130),
                flex: 0,
                width: '100%',
                height: isBottomBarVisible === 'Library' ? wp(350) : wp(200),
                alignItems: 'center',
                backgroundColor:
                  isBottomBarVisible === 'Library' ||
                  isBottomBarVisible === 'Settings'
                    ? 'rgba(0,0,0,0.5)'
                    : null,
              }}>
              {isBottomBarVisible != 'Font' ? (
                <TouchableOpacity
                  onPress={() => handleSomeAction('Main')}
                  style={{
                    backgroundColor: '#f1f1f1',
                    position: 'absolute',
                    top: isBottomBarVisible === 'Library' ? hp(110) : hp(70),
                    left: '27%',
                    paddingHorizontal: hp(25),
                    paddingVertical: hp(5),
                    borderRadius: hp(20),
                    alignItems: 'center',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      textAlign: 'center',
                      fontSize: moderateScale(13),
                      color: code_color.grey,
                    }}>
                    {'Tap here to get back\n to the Story'}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </TouchableOpacity>
          ) : null}
        </SafeAreaView>
        <View
          style={{
            // position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            backgroundColor: 'white',
            paddingTop: 5,
            shadowColor: code_color.grey,
            shadowOffset: {width: 5, height: 5},
            shadowRadius: 5,
            shadowOpacity: 1,
            // elevation: 5,
          }}>
          {menu.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => handleSomeAction(item.value)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 5,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  marginRight: item.name === 'SHARE' ? -20 : 0,
                  marginLeft: item.name === 'SETTINGS' ? -20 : 0,
                  // marginHorizontal: hp(10),
                  backgroundColor:
                    item.value === isBottomBarVisible
                      ? userProfile?.colorTheme
                      : null,
                }}>
                {item.name === 'SAVE' &&
                userProfile?.userStory?.is_collection === null ? (
                  <LoveOutline
                    width={hp(20)}
                    height={hp(20)}
                    fill={userProfile?.colorTheme}
                  />
                ) : item.name === 'SAVE' &&
                  userProfile?.userStory?.is_collection !== null ? (
                  <LoveSvg
                    width={hp(20)}
                    height={hp(20)}
                    fill={userProfile?.colorTheme}
                  />
                ) : (
                  <item.image
                    width={hp(20)}
                    height={hp(20)}
                    fill={
                      item.value === isBottomBarVisible
                        ? code_color.white
                        : userProfile?.colorTheme
                    }
                  />
                )}

                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: fixedFontSize(10),
                    color:
                      item.value === isBottomBarVisible
                        ? code_color.white
                        : userProfile?.colorTheme,
                  }}>
                  {item.name === 'SAVE' &&
                  userProfile?.userStory?.is_collection === null
                    ? 'SAVE'
                    : item.name === 'SAVE' &&
                      userProfile?.userStory?.is_collection != null
                    ? 'SAVED'
                    : item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {isBottomBarVisible === 'Library' && isFocused ? (
          <LibraryScreen handleSomeAction={handleSomeAction} />
        ) : isBottomBarVisible === 'Font' && isFocused ? (
          <FontScreen />
        ) : isBottomBarVisible === 'Settings' && isFocused ? (
          <SettingsPage />
        ) : null}
      </View>
      {/* )} */}
    </View>
  );
};

function MyTabs(props) {
  const bottomBarContext = React.useContext(BottomBarContext);
  const {isBottomBarVisible, setBottomBarVisibility} = bottomBarContext;
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [visibleShare, setVisibleShare] = React.useState(false);
  const [isSaved, setIsSaved] = useState(
    props.userStory?.is_collection ? true : false,
  );
  const [title, setTitle] = React.useState('Save');
  const [titleBottom, setTitleBottom] = React.useState('SAVE');
  const [imgHeartsTranslateY] = useState(new Animated.Value(0));
  const [imgHeartsTranslateX] = useState(new Animated.Value(-50));
  const positionX = useRef(new Animated.Value(0)).current;
  const positionY = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(0)).current;
  let height = 0;
  if (Platform.OS === 'ios') {
    height = wp(75);
  } else {
    height = hp(55);
  }
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setIsSaved(props.userStory?.is_collection ? true : false);
  }, [props.userStory?.is_collection]);

  const handleSomeAction = value => {
    // misalnya setelah mengklik suatu tombol
    setBottomBarVisibility(value); // Memunculkan bottom bar
    // navigate('Main', {isFromBottomBar: true});
  };
  const handleFetchSaveAnim = async () => {
    // Start the downward animation when the image is saved
    const jumpAndFallAnimation = Animated.parallel([
      // Animasi lompatan ke kiri
      Animated.timing(positionX, {
        toValue: -85,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      // Animasi jatuh ke bawah
      Animated.timing(positionY, {
        toValue: 400, // Ganti nilai ini sesuai kebutuhan tinggi jatuh
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]);

    setTitle('saved');
    setTitleBottom('SAVED');

    jumpAndFallAnimation.start(() => {
      setTimeout(() => {
        positionX.setValue(0);
        positionY.setValue(0);
      }, 1000);
    });
  };
  const offline = () => {

    Alert.alert(
      'YOU SEEM TO BE OFFLINE',
      'Please check your internet connection and try again.',
      [
        {
          text: 'OK',
          onPress: async () => ({}),
        },
      ],
    );
  }
  const handleFetchSave = async () => {
    if (props.userStory?.is_collection === null) {
     
      fetch().then(async state => {
        if (state.isConnected) {
          setIsSaved(true);
          const response = await addStory(props.userStory?.id);
          if (response.status === 'success') {
            setVisibleModal(true);
            setTimeout(() => {
              handleFetchSaveAnim();
            }, 500);
            setTimeout(() => {
              setVisibleModal(false);
            }, 1600);
            try {
              const resp = await getStoryDetail(props.userStory?.id);
              eventTracking(ADD_STORY_TO_LIBRARY);
              eventTracking(STORY_LIKED);
              store.dispatch(handleSetStory(resp.data));
            } catch (error) {}
          }
        } else {
          // const newMp3Url = `${BACKEND_URL}${userStory?.audio?.audio_en}`;
          // const fileName = `${userStory?.category?.name}.mp3`; // Nama file yang diinginkan
          // const destinationPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
          // const fileExists = await RNFS.exists(destinationPath);
          // if (fileExists) {
  
          //   navigate('Media');
          // } else {
            offline()
  
  
          // }
        }
      });
    } else {
      fetch().then(async state => {
        if (state.isConnected) {
          setIsSaved(false);
      const data = await deleteMyStory(props.userStory?.id);
      setTitle('save');
      if (data.status === 'success') {
        try {
          const resp = await getStoryDetail(props.userStory?.id);
          store.dispatch(handleSetStory(resp.data));
        } catch (error) {}
      }
        }else{
          offline()
        }
      })
      
    }
  };
  const love = require('../assets/lottie/ripple.json');

  return (
    <>
      <Tab.Navigator
        backBehavior="none"
        initialRouteName="Main"
        detachInactiveScreens
        //initialRouteName={screenName.HOMEPAGE}
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'white',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#f2f2f2',
          },
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
           
            // height: Platform.OS === 'ios' && Dimensions.get('window').height === 667 ? 20 : null
            // height: 48,
          },
          tabBarStyle: {
            height,
            backgroundColor: 'white',
            display: isBottomBarVisible === 'Main' ? 'flex' : 'none',
          },
        }}>
        <Tab.Screen
          name="Main"
          component={MainScreen}
          options={({route}) => ({
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TouchableOpacity
                onPress={() => {
                  setVisibleShare(true);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                  height: 50,

                  // marginLeft: 70,
                  // width: 85,
                }}>
                <ModalShareStory
                  main={true}
                  storyData={props.userStory}
                  isVisible={visibleShare}
                  onClose={() => {
                    setVisibleShare(false);
                  }}
                  type={props?.userProfile?.data?.type}
                />
                <ShareSvg
                  width={wp(20)}
                  height={hp(20)}
                  fill={props?.colorTheme}
                />

                <Text
                  allowFontScaling={false}
                  style={{
                    color: focused ? props?.colorTheme : props?.colorTheme,
                    fontSize: fixedFontSize(11),
                    marginTop: wp(2),
                  }}>
                  {'SHARE'}
                </Text>
              </TouchableOpacity>
            ),
          })}
          listeners={({route, navigation}) => ({
            state: state => {
              handleSomeAction(
                state.data.state.routes[state.data.state.index].name,
              );
            },
          })}
        />
        <Tab.Screen
          name="Save"
          component={MainScreen}
          options={({route}) => ({
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TouchableOpacity
                onPress={() => {
                  handleFetchSave();
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: -15,
                  height: 50,
                  width: 100,

                  // display: !onhideBottom ? 'flex' : 'none',
                }}>
                <Modal
                  visible={visibleModal}
                  animationType="fade"
                  transparent
                  onDismiss={() => setVisibleModal(false)}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'black',
                        padding: wp(20),
                        borderRadius: wp(20),
                        alignItems: 'center',
                      }}>
                      <Animated.View
                        style={{
                          transform: [
                            {translateY: positionY},
                            {translateX: positionX},
                          ],
                        }}>
                        <Image
                          source={imgHearts}
                          resizeMode="contain"
                          style={{width: wp(50), height: hp(50)}}
                        />
                      </Animated.View>
                      <Text
                        allowFontScaling={false}
                        style={{
                          color: code_color.white,
                          textAlign: 'center',
                          fontSize: fixedFontSize(15),
                        }}>
                        {'Story saved &\nadded to library'}
                      </Text>
                    </View>
                  </View>
                </Modal>
                {/* {props?.stepsTutorial === 2 ? (
                <View style={{position: 'absolute', bottom: wp(-20)}}>
                  <AnimatedLottieView
                    source={love}
                    style={{width: wp(100), height: hp(100)}}
                    autoPlay
                    duration={3000}
                    loop={true}
                  />
                </View>
              ) : null} */}
                {isSaved ? (
                  <LoveSvg
                    width={wp(20)}
                    height={hp(20)}
                    fill={props?.colorTheme}
                  />
                ) : (
                  <LoveOutline
                    width={wp(20)}
                    height={hp(20)}
                    fill={props?.colorTheme}
                  />
                )}
                <Text
                  allowFontScaling={false}
                  style={{
                    color: focused ? props?.colorTheme : props?.colorTheme,
                    fontSize: fixedFontSize(11),
                    marginTop: wp(2),
                  }}>
                  {isSaved ? 'SAVED' : 'SAVE'}
                </Text>
              </TouchableOpacity>
            ),
          })}
          listeners={({route, navigation}) => ({
            state: state => {
              handleSomeAction(
                state.data.state.routes[state.data.state.index].name,
              );
            },
          })}
        />
        <Tab.Screen
          name="Library"
          component={MainScreen}
          options={({route}) => ({
            tabBarIcon: ({color, focused}) => {
              return (
                <TouchableOpacity
                  onPress={() => handleSomeAction('Library')}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',

                    // marginLeft: 80,
                    width: 100,
                    height: 50,
                  }}>
                  <LibrarySvg
                    width={wp(20)}
                    height={hp(20)}
                    fill={props?.colorTheme}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: focused ? props?.colorTheme : props?.colorTheme,
                      fontSize: fixedFontSize(11),
                      marginTop: wp(2),
                    }}>
                    MY LIBRARY
                  </Text>
                </TouchableOpacity>
              );
            },
          })}
          listeners={({route, navigation}) => ({
            state: state => {
              handleSomeAction(
                state.data.state.routes[state.data.state.index].name,
              );
            },
          })}
        />

        <Tab.Screen
          name="Font"
          component={MainScreen}
          options={({route}) => ({
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',

                    width: 100,
                    height: 50,
                  }}>
                  <FontSvg
                    width={wp(20)}
                    height={hp(20)}
                    fill={props?.colorTheme}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: focused ? props?.colorTheme : props?.colorTheme,
                      fontSize: fixedFontSize(11),
                      marginTop: wp(2),
                    }}>
                    TEXT
                  </Text>
                </View>
              );
            },
          })}
          listeners={({route, navigation}) => ({
            state: state => {
              handleSomeAction(
                state.data.state.routes[state.data.state.index].name,
              );
            },
          })}
        />
        <Tab.Screen
          name="Settings"
          component={MainScreen}
          options={({route}) => ({
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    width: 100,
                    height: 50,
                  }}>
                  <SettingSvg
                    width={wp(20)}
                    height={wp(20)}
                    fill={props?.colorTheme}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: focused ? props?.colorTheme : props?.colorTheme,
                      fontSize: fixedFontSize(11),
                      marginTop: wp(2),
                    }}>
                    SETTINGS
                  </Text>
                </View>
              );
            },
          })}
          listeners={({route, navigation}) => ({
            state: state => {
              handleSomeAction(
                state.data.state.routes[state.data.state.index].name,
              );
            },
          })}
        />
      </Tab.Navigator>
      {isBottomBarVisible != 'Main' ? (
        <Library
          userProfile={props}
          stepsTutorial={undefined}
          backgroundColor={props?.backgroundColor}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  homeIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  accountProfile: {
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(25),
    height: wp(25),
  },
});

class MyTabsComponent extends Component {
  forceComponentUpdate = () => {
    this.forceUpdate();
  };
  render() {
    const {colorTheme, stepsTutorial, userStory, backgroundColor, colorText, userProfile} =
      this.props;
    const tapProps = {
      colorTheme,
      stepsTutorial,
      forceUpdate: this.forceComponentUpdate,
      userStory,
      backgroundColor,
      colorText,
      userProfile
    };
    return <MyTabs {...tapProps} />;
  }
}

export default connect(states, dispatcher)(MyTabsComponent);

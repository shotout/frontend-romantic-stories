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
import {ADD_STORY_TO_LIBRARY, eventTracking} from '../helpers/eventTracking';
import { useIsFocused } from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};
const Library = ({userProfile, stepsTutorial, backgroundColor}) => {
  const isFocused = useIsFocused();
  const [menu, setMenu] = useState([
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
  const [screen, setScreen] = useState('SAVE');
  const bottomBarContext = React.useContext(BottomBarContext);
  const {isBottomBarVisible, setBottomBarVisibility} = bottomBarContext;

  const handleSomeAction = (value: string) => {
    // misalnya setelah mengklik suatu tombol
    setBottomBarVisibility(value);
    if (value == 'Main') {
      navigate('Main');
    }
    if (value == 'ExploreLibrary') {
      navigate('ExploreLibrary');
    }
    // Memunculkan bottom bar
  };

  return (
    <View style={{flex: 1}}>
      {isBottomBarVisible === 'Main' ? (
        <View style={{flex: 1, top: -20}}>
 <MainScreen
         pressScreen={() => handleSomeAction('Main')}
         route={undefined}
         colorText={userProfile?.colorText}
       />
        </View>
        
        // <FastImage source={imgSC}
        // resizeMode={FastImage.resizeMode.contain}
        // style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />
      ) : (
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
                  ? -151
                  : isBottomBarVisible === 'Font' && Platform.OS === 'android'
                  ? -Dimensions.get('window').height / 2
                  : isBottomBarVisible === 'Font' && Platform.OS === 'ios'
                  ? -Dimensions.get('window').height /
                    (!isIphoneXorAbove() ? 2.8 : 2)
                  : isBottomBarVisible === 'Library'
                  ? -Dimensions.get('window').height / 2.7
                  : 0,
              width: '100%',
              height: '100%',
              flex: 0,
            }}>
            <MainScreen
              pressScreen={() => handleSomeAction('Main')}
              route={undefined}
              colorText={userProfile?.colorText}
            />
            {isBottomBarVisible != 'Main' ? (
              <TouchableOpacity
                onPress={() => handleSomeAction('Main')}
                style={{
                  position: 'absolute',
                  top: isBottomBarVisible === 'Settings' ? 10 : isBottomBarVisible === 'Library' ? wp(20) : wp(130),
                  flex: 0,
                  width: '100%',
                  height: isBottomBarVisible === 'Library' ? wp(350) : wp(200),
                  alignItems: 'center',
                  backgroundColor: isBottomBarVisible === 'Library' || isBottomBarVisible === 'Settings' ?  'rgba(0,0,0,0.5)' : null
                }}>
                <TouchableOpacity
                  onPress={() => handleSomeAction('Main')}
                  style={{
                    backgroundColor: '#f1f1f1',
                    position: 'absolute',
                    top: isBottomBarVisible === 'Library' ? wp(120) : wp(70),
                    left: '30%',
                    paddingHorizontal: wp(20),
                    paddingVertical: wp(5),
                    borderRadius: wp(20),
                    alignItems: 'center',
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      textAlign: 'center',
                    }}>
                    {'Tap here to get back\n to the Story'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ) : null}
          </SafeAreaView>
          <View
            style={{
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
              elevation: 5,
            }}>
            {menu.map((item, i) => {
              return (
                <TouchableOpacity
                  onPress={() => handleSomeAction(item.value)}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    marginHorizontal: 10,
                    backgroundColor:
                      item.value === isBottomBarVisible
                        ? userProfile?.colorTheme
                        : null,
                  }}>
                  {item.name === 'SAVE' &&
                  userProfile?.userStory?.is_collection === null ? (
                    <LoveOutline
                      width={20}
                      height={20}
                      fill={userProfile?.colorTheme}
                    />
                  ) : item.name === 'SAVE' &&
                    userProfile?.userStory?.is_collection !== null ? (
                    <LoveSvg
                      width={20}
                      height={20}
                      fill={userProfile?.colorTheme}
                    />
                  ) : (
                    <item.image
                      width={20}
                      height={20}
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
                      fontSize: 10,
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
          {
            isBottomBarVisible === 'Library' && isFocused ? (
              <LibraryScreen handleSomeAction={handleSomeAction} />
            ) : isBottomBarVisible === 'Font' && isFocused ? (
              <FontScreen />
            ) : isBottomBarVisible === 'Settings' && isFocused ? (
              <SettingsPage />
            ) : null
            // <LibraryScreen handleSomeAction={handleSomeAction} />
          }
        </View>
      )}
    </View>
  );
};

function MyTabs(props) {
  const bottomBarContext = React.useContext(BottomBarContext);
  const {isBottomBarVisible, setBottomBarVisibility} = bottomBarContext;
  const [visibleModal, setVisibleModal] = React.useState(false);
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

  const handleSomeAction = value => {
    setVisible(true)
    // misalnya setelah mengklik suatu tombol
    setBottomBarVisibility(value); // Memunculkan bottom bar
  };
  const handleFetchSaveAnim = async () => {
    // Start the downward animation when the image is saved
    const jumpAndFallAnimation = Animated.parallel([
      // Animasi lompatan ke kiri
      Animated.timing(positionX, {
        toValue: -50,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      // Animasi jatuh ke bawah
      Animated.timing(positionY, {
        toValue: 400, // Ganti nilai ini sesuai kebutuhan tinggi jatuh
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]);

    setTimeout(() => {
      setTitle('saved');
      setTitleBottom('SAVED');
    }, 1300);
    // Mulai animasi
    setTimeout(() => {
      jumpAndFallAnimation.start(() => {
        setTimeout(() => {
          positionX.setValue(0);
          positionY.setValue(0);
        }, 1000);
      });
    }, 500);
  };
  const handleFetchSave = async () => {
    if (props.userStory?.is_collection === null) {
      const response = await addStory(props.userStory?.id);
      if (response.status === 'success') {
        try {
          const resp = await getStoryDetail(props.userStory?.id);
          eventTracking(ADD_STORY_TO_LIBRARY);
          store.dispatch(handleSetStory(resp.data));
        } catch (error) {}
      }
      setVisibleModal(true);
      setTimeout(() => {
        handleFetchSaveAnim();
      }, 300);
      setTimeout(() => {
        setVisibleModal(false);
      }, 2500);
    } else {
      const data = await deleteMyStory(props.userStory?.id);
      setTitle('save');
      if (data.status === 'success') {
        try {
          const resp = await getStoryDetail(props.userStory?.id);
          store.dispatch(handleSetStory(resp.data));
        } catch (error) {}
      }
    }
  };
  const love = require('../assets/lottie/ripple.json');
  // alert(props?.backgroundColor)

  return (
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
                if (props.stepsTutorial <= 1) {
                  handleFetchSave();
                }
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
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
              {props?.stepsTutorial === 2 ? (
                <View style={{position: 'absolute', bottom: wp(-20)}}>
                  <AnimatedLottieView
                    source={love}
                    style={{width: wp(100), height: hp(100)}}
                    autoPlay
                    duration={3000}
                    loop={true}
                  />
                </View>
              ) : null}
              {props.userStory?.is_collection === null ? (
                <LoveOutline
                  width={wp(20)}
                  height={hp(20)}
                  fill={props?.colorTheme}
                />
              ) : (
                <LoveSvg
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
                {props.userStory?.is_collection === null ? 'SAVE' : 'SAVED'}
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
        children={() => (
          <Library
            userProfile={props}
            stepsTutorial={props.stepsTutorial}
            backgroundColor={props?.backgroundColor}
          />
        )}
        options={({route}) => ({
          tabBarIcon: ({color, focused}) => {
            if (props.stepsTutorial <= 1) {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
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
                </View>
              );
            } else {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (props.stepsTutorial <= 1) {
                      handleSomeAction('Library');
                    }
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
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
            }
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
        children={() => (
          <Library
            userProfile={props}
            stepsTutorial={undefined}
            backgroundColor={props?.backgroundColor}
          />
        )}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, focused}) => {
            if (props.stepsTutorial <= 1) {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
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
            } else {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (props.stepsTutorial <= 1) {
                      handleSomeAction('Font');
                    }
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
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
                </TouchableOpacity>
              );
            }
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
        children={() => (
          <Library
            userProfile={props}
            stepsTutorial={undefined}
            backgroundColor={props?.backgroundColor}
          />
        )}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, focused}) => {
            if (props.stepsTutorial <= 1) {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
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
            } else {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (props.stepsTutorial <= 1) {
                      handleSomeAction('Settings');
                    }
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                  }}>
                  <SettingSvg
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
                    SETTINGS
                  </Text>
                </TouchableOpacity>
              );
            }
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
    const {colorTheme, stepsTutorial, userStory, backgroundColor, colorText} =
      this.props;
    const tapProps = {
      colorTheme,
      stepsTutorial,
      forceUpdate: this.forceComponentUpdate,
      userStory,
      backgroundColor,
      colorText,
    };
    return <MyTabs {...tapProps} />;
  }
}

export default connect(states, dispatcher)(MyTabsComponent);

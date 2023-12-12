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
import {imgHearts, imgStep2, imgStep4} from '../assets/images';
import Button from '../components/buttons/Button';
import i18n from '../i18n';
import StepHeader from '../layout/step/stepHeader';
import {handleSetSteps, handleSetStory} from '../store/defaultState/actions';
import store from '../store/configure-store';
import {addStory, deleteMyStory, getStoryDetail, getStoryList} from '../shared/request';
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
  const [menu, setMenu] = useState([
    {
      image:  userProfile?.userStory?.is_collection === null ? (
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
    <View
      style={{
        flex: 1,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        flexDirection: 'column',
      }}>
      <View
        style={{
          position: 'absolute',
          top:
            isBottomBarVisible === 'Settings'
              ? -70
              : -Dimensions.get('window').height / 2.5,
          width: '100%',
          height: '100%',
          flex: 0,
        }}>
        <MainScreen pressScreen={() => handleSomeAction('Main')} route={undefined} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
          backgroundColor: 'white',
          paddingTop: 5,
          backgroundColor: backgroundColor,
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
                {item.name === 'SAVE' && userProfile?.userStory?.is_collection === null ? (
                  <LoveOutline width={20} height={20} fill={userProfile?.colorTheme} />
                ) : item.name === 'SAVE' && userProfile?.userStory?.is_collection !== null ? (
                  <LoveSvg width={20} height={20} fill={userProfile?.colorTheme} />
                ) : <item.image
                width={20}
                height={20}
                fill={
                  item.value === isBottomBarVisible
                    ? code_color.white
                    : userProfile?.colorTheme
                }
              />
                }
              
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 10,
                  color:
                    item.value === isBottomBarVisible
                      ? code_color.white
                      : userProfile?.colorTheme,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {isBottomBarVisible === 'Library' ? (
        <LibraryScreen handleSomeAction={handleSomeAction} />
      ) : isBottomBarVisible === 'Font' ? (
        <FontScreen />
      ) : (
        <SettingsPage />
      )}
    </View>
  );
};

function MyTabs(props) {
  const bottomBarContext = React.useContext(BottomBarContext);
  const {isBottomBarVisible, setBottomBarVisibility} = bottomBarContext;
  const [visibleModal, setVisibleModal] = React.useState(false)
  const [imgHeartsTranslateY] = useState(new Animated.Value(0));
  const [imgHeartsTranslateX] = useState(new Animated.Value(0));
  let height = 0;
  if (Platform.OS === 'ios') {
    height = 80;
  } else {
    height = 55;
  }
  const [visible, setVisible] = useState(true);

  const handleSomeAction = value => {
    // misalnya setelah mengklik suatu tombol
    setBottomBarVisibility(value); // Memunculkan bottom bar
  };
  const handleFetchSaveAnim = async () => {
    // ... (your existing code)

    // Start the downward animation when the image is saved
    Animated.timing(imgHeartsTranslateY, {
      toValue: 1000, // Change this value to control how much it moves downwards
      duration: 1500, // Change this value to control the duration of the animation
      useNativeDriver: false, // Use a custom easing function
     
    }).start(() => {
      // Animation finished, reset the translateY value for the next use
      imgHeartsTranslateY.setValue(0)
      // imgHeartsTranslateY.setValue(50);
    });
    Animated.timing(imgHeartsTranslateX, {
      toValue: 1000, // Change this value to control how much it moves downwards
      duration: 1000, // Change this value to control the duration of the animation
      useNativeDriver: false,
      easing: Easing.bezier(0, 0.1, -0.50, 0.1), // Use a custom easing function

    }).start(() => {
      // Animation finished, reset the translateY value for the next use
      imgHeartsTranslateX.setValue(0)
      // imgHeartsTranslateY.setValue(50);
    });
  };
  const handleFetchSave = async () => {
    if (props.userStory?.is_collection === null) {
      const response = await addStory(props.userStory?.id);
      if(response.status === 'success'){
        try {
          const resp = await getStoryDetail(props.userStory?.id);
          store.dispatch(handleSetStory(resp.data));
        } catch (error) {
        
        }
      }
      setVisibleModal(true)
     setTimeout(() => {
      handleFetchSaveAnim()
     }, 300);
      setTimeout(() => {
        setVisibleModal(false)
      }, 1500);
      
    }else{
      const data = await deleteMyStory(props.userStory?.id);
     
      if(data.status === 'success'){
        try {
          const resp = await getStoryDetail(props.userStory?.id);
          store.dispatch(handleSetStory(resp.data));
        } catch (error) {
        
        }
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
        tabBarActiveTintColor: props?.colorTheme,
        tabBarInactiveTintColor: props?.backgroundColor === '#2C3439' ? 'white' : '#C4C4C4',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#f2f2f2',
        },
        tabBarStyle: {
          height,
          backgroundColor: props?.backgroundColor,
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
                handleFetchSave();
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
          <View style={{backgroundColor: 'black', padding: 20, borderRadius: 20, alignItems: 'center'}}>
          <Animated.View
                  style={{
                    transform: [{ translateY: imgHeartsTranslateY },   { translateX: imgHeartsTranslateX}, ],
                    
                  }}
                >
                  
                  <Image
                    source={imgHearts}
                    resizeMode="contain"
                    style={{ width: 50, height: 50 }}
                  />
                </Animated.View>
          <Text allowFontScaling={false} style={{color: code_color.white, textAlign: 'center', fontSize: 15}}>{`Story saved &\nadded to library`}</Text>
          </View>
        
          </View>
          </Modal>
              {props?.stepsTutorial === 2 ? (
                <View style={{position: 'absolute', bottom: -20}}>
                  <AnimatedLottieView
                    source={love}
                    style={{width: 100, height: 100}}
                    autoPlay
                    duration={3000}
                    loop={true}
                  />
                </View>
              ) : null}
              {props.userStory?.is_collection === null ? (
                <LoveOutline width={20} height={20} fill={props?.colorTheme} />
              ) : (
                <LoveSvg width={20} height={20} fill={props?.colorTheme} />
              )}
              <Text
                allowFontScaling={false}
                style={{
                  color: focused ? props?.colorTheme : props?.colorTheme,
                  fontSize: 11,
                  marginTop: 2,
                }}>
                SAVE
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
          <Library userProfile={props} stepsTutorial={props.stepsTutorial}  backgroundColor={props?.backgroundColor}/>
        )}
        // component={Library}
        options={({route}) => ({
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}>
              <LibrarySvg width={20} height={20} fill={props?.colorTheme} />
              <Text
                allowFontScaling={false}
                style={{
                  color: focused ? props?.colorTheme : props?.colorTheme,
                  fontSize: 11,
                  marginTop: 2,
                }}>
                MY LIBRARY
              </Text>
            </View>
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
        name="Font"
        children={() => <Library userProfile={props} stepsTutorial={undefined}  backgroundColor={props?.backgroundColor}/>}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}>
              <FontSvg width={20} height={20} fill={props?.colorTheme} />
              <Text
                allowFontScaling={false}
                style={{
                  color: focused ? props?.colorTheme : props?.colorTheme,
                  fontSize: 11,
                  marginTop: 2,
                }}>
                TEXT
              </Text>
            </View>
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
        name="Settings"
        children={() => <Library userProfile={props} stepsTutorial={undefined} backgroundColor={props?.backgroundColor} />}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}>
              <SettingSvg width={20} height={20} fill={props?.colorTheme} />
              <Text
                allowFontScaling={false}
                style={{
                  color: focused ? props?.colorTheme : props?.colorTheme,
                  fontSize: 11,
                  marginTop: 2,
                }}>
                SETTINGS
              </Text>
            </View>
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
    width: 25,
    height: 25,
  },
});

class MyTabsComponent extends Component {
  forceComponentUpdate = () => {
    this.forceUpdate();
  };
  render() {
    const {colorTheme, stepsTutorial, userStory, backgroundColor} = this.props;
    const tapProps = {
      colorTheme,
      stepsTutorial,
      forceUpdate: this.forceComponentUpdate,
      userStory,
      backgroundColor
    };
    return <MyTabs {...tapProps} />;
  }
}

export default connect(states, dispatcher)(MyTabsComponent);

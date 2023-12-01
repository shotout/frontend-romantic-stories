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
import {addStory, deleteMyStory, getStoryList} from '../shared/request';
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
const Library = ({userProfile, stepsTutorial}) => {
  const [menu, setMenu] = useState([
    {
      image: LoveOutline,
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
        <MainScreen pressScreen={() => handleSomeAction('Main')} />
      </View>
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
              <item.image
                width={20}
                height={20}
                fill={
                  item.value === isBottomBarVisible
                    ? code_color.white
                    : userProfile?.colorTheme
                }
              />
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
  let height = 0;
  if (Platform.OS === 'ios') {
    height = 80;
  } else {
    height = 55;
  }
  const [visible, setVisible] = useState(true);
  // alert(JSON.stringify(props.userStory?.data[0].id))
  const handleSomeAction = value => {
    // misalnya setelah mengklik suatu tombol
    setBottomBarVisibility(value); // Memunculkan bottom bar
  };
  const handleFetchSave = async () => {
    if (props.userStory?.data[0].is_collection === null) {
      addStory(props.userStory?.data[0].id);
      setVisibleModal(true)
      setTimeout(() => {
        setVisibleModal(false)
      }, 1000);
      const resp = await getStoryList();
      store.dispatch(handleSetStory(resp.data));
    }else{
      deleteMyStory(props.userStory?.data[0].id);
      const resp = await getStoryList();
      store.dispatch(handleSetStory(resp.data));
    }
  };
  const love = require('../assets/lottie/urgent.json');
  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName="Main"
      detachInactiveScreens
      //initialRouteName={screenName.HOMEPAGE}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: props?.colorTheme,
        tabBarInactiveTintColor: '#C4C4C4',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#f2f2f2',
        },
        tabBarStyle: {
          height,
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
            <Image source={imgHearts} resizeMode='contain' style={{width: 50, height: 50}} />
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
              {props.userStory?.data[0].is_collection === null ? (
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
          <Library userProfile={props} stepsTutorial={props.stepsTutorial} />
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
        children={() => <Library userProfile={props} />}
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
        children={() => <Library userProfile={props} />}
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
    const {colorTheme, stepsTutorial, userStory} = this.props;
    const tapProps = {
      colorTheme,
      stepsTutorial,
      forceUpdate: this.forceComponentUpdate,
      userStory,
    };
    return <MyTabs {...tapProps} />;
  }
}

export default connect(states, dispatcher)(MyTabsComponent);

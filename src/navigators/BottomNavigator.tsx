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
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {code_color} from '../utils/colors';
import LoveSvg from './../assets/icons/bottom/love.jsx';
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
import { imgStep2, imgStep4 } from '../assets/images';
import Button from '../components/buttons/Button';
import i18n from '../i18n';
import StepHeader from '../layout/step/stepHeader';
import {handleSetSteps} from '../store/defaultState/actions';
import store from "../store/configure-store";
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
  console.log('masuk library'+stepsTutorial)
  const [menu, setMenu] = useState([
    {
      image: LoveSvg,
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

 
  const renderProgress = () => <StepHeader currentStep={4} />;
  const renderTutorial = () => {
    return (
      <SafeAreaView
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height + Dimensions.get('window').height,
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
          
        {renderProgress()}
        <View
          style={{
            backgroundColor: '#3F58DD',
            borderRadius: 10,
            padding: 10,
            marginHorizontal: 40,
            alignItems: 'center',
            marginTop: '20%',
            paddingTop: 50,
          }}>
          <Image
            source={imgStep4}
            resizeMode="contain"
            style={{width: 100, height: 200, position: 'absolute', top: -100}}
          />
          <Text
            style={{
              color: code_color.white,
              textAlign: 'center',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {`Re-discover your favorite\nStories that are saved\nin your Library.`}
          </Text>
          
          <Button
            style={{
              backgroundColor: code_color.yellow,
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}
            title={i18n.t('Next')}
            onPress={() => {   
              store.dispatch(handleSetSteps(4 + 1))
              handleSomeAction('ExploreLibrary')
            
            }}
          />
        </View>
      </SafeAreaView>
    )
  }
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
          top: isBottomBarVisible === 'Settings' ? -70 : -300,
          width: '100%',
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
       {/* {renderTutorial()} */}
    </View>
  );
};


function MyTabs(props) {
  const bottomBarContext = React.useContext(BottomBarContext);
  const {isBottomBarVisible, setBottomBarVisibility} = bottomBarContext;

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
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // display: !onhideBottom ? 'flex' : 'none',
              }}>
                {props?.stepsTutorial === 3 ?
                <View style={{position: 'absolute', bottom: -20}}>
                <AnimatedLottieView
                source={love}
                style={{width: 100, height: 100}}
                autoPlay
                duration={3000}
                loop={true}
              />
                </View> : null}
              
              <LoveSvg width={20} height={20} fill={props?.colorTheme} />
              <Text
                allowFontScaling={false}
                style={{
                  color: focused ? props?.colorTheme : '#C4C4C4',
                  fontSize: 11,
                  marginTop: 2,
                }}>
                SAVE
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
        name="Library"
        children={() => 
             <Library userProfile={props} stepsTutorial={props.stepsTutorial}  />
      }
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
                  color: focused ? props?.colorTheme : '#C4C4C4',
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
                  color: focused ? props?.colorTheme : '#C4C4C4',
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
                  color: focused ? props?.colorTheme : '#C4C4C4',
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
}
  render() {
    const {colorTheme, stepsTutorial} = this.props;
    const tapProps = {
      colorTheme,
      stepsTutorial,
      forceUpdate: this.forceComponentUpdate,
    };
    console.log('masuk sini'+stepsTutorial)
    return <MyTabs {...tapProps} />;
  }
}

export default connect(states, dispatcher)(MyTabsComponent);

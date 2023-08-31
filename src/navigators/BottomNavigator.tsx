import React, {Component, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  SafeAreaView,
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
const Library = () => {
  const [menu, setMenu] = useState([
    {
      image: LoveSvg,
      name: 'SAVE',
    },
    {
      image: LibrarySvg,
      name: 'MY LIBRARY',
    },
    {
      image: FontSvg,
      name: 'TEXT',
    },
    {
      image: SettingSvg,
      name: 'SETTINGS',
    },
  ]);
  const [screen, setScreen] = useState('SAVE')
  const bottomBarContext = React.useContext(BottomBarContext);
  const {setBottomBarVisibility} = bottomBarContext;

  const handleSomeAction = (value) => {
    // misalnya setelah mengklik suatu tombol
    if(value == 'SAVE'){
        setBottomBarVisibility(true);
        navigate('homeStack');
    }else{
        setBottomBarVisibility(false);
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
              onPress={() => handleSomeAction(item.name)}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginHorizontal: 10,
                backgroundColor:
                  item.name === 'MY LIBRARY' ? code_color.blueDark : null,
              }}>
              <item.image
                width={20}
                height={20}
                fill={
                  item.name === 'MY LIBRARY'
                    ? code_color.white
                    : code_color.splash
                }
              />
              <Text
                style={{
                  fontSize: 10,
                  color:
                    item.name === 'MY LIBRARY'
                      ? code_color.white
                      : code_color.splash,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <LibraryScreen />
    </View>
  );
};

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name={'Home'} component={Home} />
    </Stack.Navigator>
  );
}

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


  const handleSomeAction = () => {
    // misalnya setelah mengklik suatu tombol
    setBottomBarVisibility(false); // Memunculkan bottom bar
  };

  return (
    <Tab.Navigator
      backBehavior="none"
      initialRouteName="homeStack"
      detachInactiveScreens
      //initialRouteName={screenName.HOMEPAGE}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#3AC5D1',
        tabBarInactiveTintColor: '#C4C4C4',
        headerShown: false,
        headerStyle: {
          backgroundColor: '#f2f2f2',
        },
        tabBarStyle: {
          height,
          display: isBottomBarVisible ? 'flex' : 'none',
        },
      }}>
      <Tab.Screen
        name="homeStack"
        component={HomeStack}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // display: !onhideBottom ? 'flex' : 'none',
              }}>
              <LoveSvg width={20} height={20} />
              <Text
                style={{
                  color: focused ? code_color.splash : '#C4C4C4',
                  fontSize: 11,
                  marginTop: 2,
                }}>
                SAVE
              </Text>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="favoriteStack"
        component={Library}
        options={({route}) => ({
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}>
              <LibrarySvg width={20} height={20} />
              <Text
                style={{
                  color: focused ? code_color.splash : '#C4C4C4',
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
            handleSomeAction();
          },
        })}
      />

      <Tab.Screen
        name="riwayatStack"
        component={Library}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}>
              <FontSvg width={20} height={20} />
              <Text
                style={{
                  color: focused ? code_color.splash : '#C4C4C4',
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
              handleSomeAction();
            },
          })}
      />
      <Tab.Screen
        name="profile"
        component={Library}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}>
              <SettingSvg width={20} height={20} />
              <Text
                style={{
                  color: focused ? code_color.splash : '#C4C4C4',
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
              handleSomeAction();
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
  shouldComponentUpdate(nextProps: {onhideBottom: any}) {
    let shouldComponentUpdate = false;

    const {onhideBottom, token, profile, profileActive} = this.props;
    if (onhideBottom !== nextProps?.onhideBottom) {
      shouldComponentUpdate = true;
    }
    // if (token !== nextProps?.token) {
    //   shouldComponentUpdate = true;
    // }
    // if (
    //   profile?.data?.profile_picture !==
    //   nextProps?.profile?.data?.profile_picture
    // ) {
    //   shouldComponentUpdate = true;
    // }
    // if (
    //   JSON.stringify(profileActive) !== JSON.stringify(nextProps?.profileActive)
    // ) {
    //   shouldComponentUpdate = true;
    // }
    return shouldComponentUpdate;
  }

  render() {
    const {onhideBottom} = this.props;
    const tapProps = {
      onhideBottom,
    };
    return <MyTabs {...tapProps} />;
  }
}
export default MyTabsComponent;

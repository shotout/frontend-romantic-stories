/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, Fragment, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
  ScrollView,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import {ava1, bg, cover1, cover2, libraryAdd, logo} from '../../assets/images';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import {getDefaultLanguange, isIphoneXorAbove} from '../../utils/devices';
import Button from '../../components/buttons/Button';
import {navigate} from '../../shared/navigationRef';
import LibrarySvg from '../../assets/icons/bottom/library.jsx';
import SearchSvg from '../../assets/icons/search.jsx';
import DescendingSvg from '../../assets/icons/descending.jsx';
import BackRightSvg from '../../assets/icons/backRight.jsx';
import DotSvg from '../../assets/icons/dot.jsx';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  PanGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {sizing} from '../../utils/styling';
import QuotesContent from '../../components/quotes-content-fast-image';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import {connect} from 'react-redux';
import {checkDeviceRegister, getListAvatarTheme, getStoryList} from '../../shared/request';

const {width, height} = Dimensions.get('window');

const MainScreen = ({userProfile, userStory, handleSetStory, fontSize, backgroundColor, colorTheme, fontFamily}) => {
  console.log('INI FONT'+JSON.stringify(fontFamily));
  const isDarkMode = useColorScheme() === 'dark';
  const flatListRef = useRef();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const animationValue = useRef(new Animated.Value(0)).current;
  const [folded, setFolded] = useState(false);
  const initialIndexContent = 0;
  const [showModalSubscribe, setShowModalSubscribe] = useState(false);
  const [activeSlide, setActiveSlide] = useState(initialIndexContent);
  const [isUserHasScroll, setUserScrollQuotes] = useState(false);
  // const [dataBook, setBook] = useState(userStory);
  const [me, setMe] = useState(null)
  const [partner, setPartner] = useState(null)

  const [dataBook, setBook] = useState([
    {
      title: 'Fistful of Reefer: A Pulpy Action Series from Schism 8',
      detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, arcu in imperdiet auctor, metus sem cursus tortor, sed fringilla orci metus ac ex. Nunc pharetra, lacus in egestas vulputate, nisi erat auctor lectus, vitae pulvinar metus metus et ligula. Etiam porttitor urna nec dignissim lacinia. Ut eget justo congue, aliquet tellus eget, consectetur metus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut ac turpis dolor. Donec eu arcu luctus, volutpat dolor et, dapibus libero. Curabitur porttitor lorem non felis porta, ut ultricies sem maximus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum`,
    },
    {
      title: 'Fistful of Reefer: A Pulpy Action Series from Schism 8',
      detail: `hemmm`,
    },
    {
      title: 'Fistful of Reefer: A Pulpy Action Series from Schism 8',
      detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, arcu in imperdiet auctor, metus sem cursus tortor, sed fringilla orci metus ac ex. Nunc pharetra, lacus in egestas vulputate, nisi erat auctor lectus, vitae pulvinar metus metus et ligula. Etiam porttitor urna nec dignissim lacinia. Ut eget justo congue, aliquet tellus eget, consectetur metus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut ac turpis dolor. Donec eu arcu luctus, volutpat dolor et, dapibus libero. Curabitur porttitor lorem non felis porta, ut ultricies sem maximus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum`,
    },
  ]);
  const onMomentoumScrollEnd = e => {
    const height = sizing.getDimensionHeight(2);
    const pageNumber = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.y / height + 0.5) + 1, 0),
      dataBook?.data?.length || 0,
    );
    setActiveSlide(pageNumber - 1);
    startAnimation();
    handleLoadMore(pageNumber);
    if (pageNumber - 1 !== activeSlide && !isUserHasScroll) {
      setUserScrollQuotes(true);
    }
  };
  const handleGesture = evt => {
    const {nativeEvent} = evt;
    if (nativeEvent.velocityX < -614) {
    }
  };
  const onDoubleTap = event => {
    if (!isUserHasScroll && event.nativeEvent.state === State.BEGAN) {
      setUserScrollQuotes(true);
    }
    if (event.nativeEvent.state === State.ACTIVE) {
      // handleLike();
    }
  };
  const startAnimation = () => {
    setFolded(!folded);

    Animated.timing(animationValue, {
      toValue: folded ? 0 : 1,
      duration: 1000,
      useNativeDriver: false, // Set this to true for better performance, but note that not all properties are supported with native driver
    }).start();
  };
  const handleLoadMore = async value => {
    // const params = {
    //   page: userStory?.current_page + 1,
    // };
    // try {
    //   const res = await getStoryList(params);
    //   // alert(JSON.stringify(res))
    //   setBook(res.data);
    //   handleSetStory(res.data);
    // } catch (error) {
    //   // alert(error)
    // }
  };
  const rotation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handleThemeAvatar = async() => {
    let params = {
      flag: 'book'
    }
    try {
      const data = await getListAvatarTheme(params)
      if(data?.data){
        setMe(data?.data?.me)
        setPartner(data?.data?.partner)
      }
    } catch (error) {
      
    }
   
   
  }

  useEffect(() => {
    handleThemeAvatar()
  }, [])

  const renderFactItem = ({item, index, disableAnimation}) => {
    return (
      <QuotesContent
        item={item}
        isActive={activeSlide === index}
        isAnimationStart={true}
        themeUser={userProfile?.data}
        fontSize={fontSize}
        bgTheme={colorTheme}
        bg={backgroundColor}
        fontFamily={fontFamily}
        me={me}
        partner={partner}
      />

      // <View style={{ flex: 1 }}>
      //   <Text
      //     style={{
      //       margin: 10,
      //       marginHorizontal: 50,
      //       fontWeight: 'bold',
      //       textAlign: 'center',
      //     }}>
      //     {item.title}
      //   </Text>
      //   <View
      //     style={{
      //       borderColor: code_color.grey,
      //       borderWidth: 1,
      //       marginVertical: 10,
      //     }}
      //   />
      //   <Text
      //     style={{
      //       marginVertical: 10,
      //       fontSize: 16,
      //       textAlign: 'justify',
      //       lineHeight: 30,
      //     }}>
      //     {item.detail}
      //   </Text>
      // </View>
    );
  };

  function renderFlatList() {
    return (
      <PanGestureHandler
        onGestureEvent={handleGesture}
        activeOffsetX={[-40, 40]}>
        <TapGestureHandler onHandlerStateChange={onDoubleTap} numberOfTaps={3}>
          <FlatList
            ref={flatListRef}
            style={{
              flex: 1,
              backgroundColor: backgroundColor,
            }}
            data={dataBook}
            pagingEnabled
            onMomentumScrollEnd={onMomentoumScrollEnd}
            scrollsToTop={false}
            showsVerticalScrollIndicator={false}
            // onEndReached={handleEndReach}
            onEndReachedThreshold={0.9}
            renderItem={renderFactItem}
            keyExtractor={(_item, index) => `${index}`}
            initialScrollIndex={0}
            getItemLayout={(_data, index) => ({
              length: sizing.getDimensionHeight(1),
              offset: sizing.getDimensionHeight(1) * index,
              index,
            })}
            onScrollToIndexFailed={() => {
              console.log('FAILED SCROLL TO INDEX', 5);
            }}
          />
        </TapGestureHandler>
      </PanGestureHandler>
    );
  }
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
      }}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      {/* <View
        style={{
          backgroundColor: code_color.white,
          // paddingTop: isIphoneXorAbove() ? 40 : 0,
        }}
      /> */}

      {renderFlatList()}
    </View>
  );
};

const styles = StyleSheet.create({});

MainScreen.propTypes = {
  activeVersion: PropTypes.any,
};

MainScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(MainScreen);

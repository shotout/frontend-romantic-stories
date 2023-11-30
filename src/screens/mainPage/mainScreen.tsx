/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  useColorScheme,
  StatusBar,
  FlatList,
  Animated,
  Dimensions,
  Pressable,
  Modal,
  SafeAreaView,
} from 'react-native';
import {
  imgBgAvaTips,
  imgBgContent,
  imgBgTips,
  imgLoveLeft,
  imgLoveRight,
  imgStep1,
  imgStep2,
  imgStep5,
} from '../../assets/images';
import {code_color} from '../../utils/colors';
import i18n from '../../i18n/index';
import Button from '../../components/buttons/Button';
import {navigate} from '../../shared/navigationRef';
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
import {
  addPastStory,
  checkDeviceRegister,
  getListAvatarTheme,
  getStoryList,
} from '../../shared/request';
import ModalStoryUnlock from '../../components/modal-story-unlock';
import ModalCongrats from '../../components/modal-congrats';
import ModalNewStory from '../../components/modal-new-story';
import ModalSuccessPurchase from '../../components/modal-success-purchase';
import ModalGetPremium from '../../components/modal-get-premium';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {moderateScale} from 'react-native-size-matters';
import StepHeader from '../../layout/step/stepHeader';
import {useIsFocused} from '@react-navigation/native';
import PagerView, {PagerViewOnPageSelectedEvent} from 'react-native-pager-view';
import {handleNativePayment, handlePayment} from '../../helpers/paywall';
// import * as RNIap from 'react-native-iap';

const {width, height} = Dimensions.get('window');

const MainScreen = ({
  userProfile,
  userStory,
  handleSetStory,
  fontSize,
  backgroundColor,
  colorTheme,
  fontFamily,
  pressScreen,
  route,
  handleSetSteps,
  stepsTutorial,
  isPremium,
  readStory,
  handleReadStory,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [products, setProducts] = useState([]);
  const [isTutorial, setTutorial] = useState({
    visible: false,
    step: stepsTutorial,
  });
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCongrats, setShowModalCongrats] = useState(false);
  const [showModalNewStory, setShowModalNewStory] = useState(false);
  const [showModalSuccessPurchase, setShowModalSuccessPurchase] =
    useState(false);
  const [showModalGetPremium, setShowModalGetPremium] = useState(false);
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
  const [me, setMe] = useState(null);
  const [partner, setPartner] = useState(null);
  const [readLater, setReadLater] = useState(false);
  const [isLoveAnimate, setIsLoveAnimate] = useState<boolean | string>(false);
  const isFocused = useIsFocused();
  const [isSwipingLeft, setIsSwipingLeft] = useState(false);
  const [isSwipingRight, setIsSwipingRight] = useState(false);
  const [isFinishTutorial, setFinishTutorial] = useState(false);
  const [dataBook, setBook] = useState(userStory?.data);
  const [readBook, setReadBook] = useState([]);
  const [dataRead, setData] = useState(readStory);
  const [data, setRead] = useState([]);

  // const [content, setContent] = useState({
  //   content_id: "",
  //   content_en: "",
  // });
  // useEffect(() => {
  //   const charactersPerPage = 1000;
  //   let content_id = "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n        \n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>";
  //   let content_en = "<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n        \n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>\n\n        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>";
  //   // Membagi konten HTML menjadi blok-blok teks dengan panjang karakter tertentu
  //   const removeHtmlTags = (html) => {
  //     const text = he.decode(html.replace(/<[^>]+>/g, '')); // Use he library for HTML entity decoding
  //     return text || '';
  //   };
  //   content_id = removeHtmlTags(content_id);
  //   content_en = removeHtmlTags(content_en);

  //   // Membuat halaman dengan blok-blok teks
  //   // const blocks_id = content_id.match(new RegExp(`.{1,${charactersPerPage}}`, 'g'));
  //   // const blocks_en = content_en.match(new RegExp(`.{1,${charactersPerPage}}`, 'g'));
  //   const splitContent = (text) => {
  //     const regex = new RegExp(`.{1,${charactersPerPage}}`, 'g');
  //     return text.match(regex) || [];
  //   };
  //   const blocks_id = splitContent(content_id);
  //   const blocks_en = splitContent(content_en);

  //   const pagesArray_id = blocks_id.map((block, index) => ({
  //     id: index,
  //     content: block,
  //   }));

  //   const pagesArray_en = blocks_en.map((block, index) => ({
  //     id: index,
  //     content: block,
  //   }));
  //  alert('data content'+JSON.stringify(pagesArray_en))
  //   console.log('data content'+JSON.stringify(pagesArray_en))
  //   setContent({
  //     content_id: pagesArray_id,
  //     content_en: pagesArray_en,
  //   });

  // }, []);
  // const [dataBook, setBook] = useState([
  //   {
  //     title: 'Fistful of Reefer: Test 1',
  //     detail:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, arcu in imperdiet auctor, metus sem cursus tortor, sed fringilla orci metus ac ex. Nunc pharetra, lacus in egestas vulputate, nisi erat auctor lectus, vitae pulvinar metus metus et ligula. Etiam porttitor urna nec dignissim lacinia. Ut eget justo congue, aliquet tellus eget, consectetur metus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut ac turpis dolor. Donec eu arcu luctus, volutpat dolor et, dapibus libero. Curabitur porttitor lorem non felis porta, ut ultricies sem maximus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum',
  //   },
  //   {
  //     title: 'Fistful of Reefer: Test 2',
  //     detail: 'hemmm',
  //   },
  //   {
  //     title: 'Fistful of Reefer: Test 3',
  //     detail:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus scelerisque, arcu in imperdiet auctor, metus sem cursus tortor, sed fringilla orci metus ac ex. Nunc pharetra, lacus in egestas vulputate, nisi erat auctor lectus, vitae pulvinar metus metus et ligula. Etiam porttitor urna nec dignissim lacinia. Ut eget justo congue, aliquet tellus eget, consectetur metus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut ac turpis dolor. Donec eu arcu luctus, volutpat dolor et, dapibus libero. Curabitur porttitor lorem non felis porta, ut ultricies sem maximus. In hac habitasse platea dictumst. Aenean in congue orci. Nulla sollicitudin feugiat diam et tristique. Vestibulum',
  //   },
  // ]);

  const checkingRead = pageNumber => {
    const existingEntry = readStory
      ? readStory.find(
          item => item?.id === dataBook[0].id && item?.page === pageNumber,
        )
      : undefined;

    if (!existingEntry) {
      const newData = {
        id: dataBook[0].id,
        page: pageNumber,
      };

      // Dispatch action to update readStory in the Redux store
      handleReadStory([...readStory, newData]);

      console.log(JSON.stringify(readStory));
    }
  };

  useEffect(() => {
    if (readStory === null) {
      let data = [
        {
          id: dataBook[0].id,
          page: activeSlide,
        },
      ];
      handleReadStory(data);
    }
  }, []);
  const onScroll = async (e: PagerViewOnPageSelectedEvent) => {
    // const offsetY = e.nativeEvent.contentOffset.x;
    // const height = sizing.getDimensionWidth(0.89);
    // const pageNumber = Math.min(
    //   Math.max(Math.floor(offsetY / height + 0.5), 0),
    //   dataBook?.length || 0,
    // );
    const pageNumber = e.nativeEvent.position;
    const timeoutLove = setTimeout(() => {
      if (pageNumber === dataBook?.length - 1) {
        setIsLoveAnimate(false);
      }
    }, 3000);

    checkingRead(pageNumber);
    // handleReadStory(pageNumber)
    // setReadBook(prevReadBook => {
    //   // Use Set to store unique page numbers
    //   const updatedReadBook = new Set([...prevReadBook, pageNumber]);
    //   return Array.from(updatedReadBook);
    // });
    // if (pageNumber === dataBook?.length - 1 && readBook.includes(pageNumber)) {
    //   // Show alert or perform other actions
    //   alert('You reached the last page and it is marked as read!');
    // }
    if (pageNumber === 2) {
      setIsLoveAnimate(true);
      if (isLoveAnimate !== 'stop') {
        setTimeout(() => {
          setIsLoveAnimate(true);
        }, 200);
      }
      setTimeout(() => {
        if (isLoveAnimate) {
          setIsLoveAnimate('false');
        }
      }, 3200);
      setTimeout(() => {}, 3400);
    }
    const existingEntry = readStory
      ? readStory.find(
          (item: any) =>
            item?.id === dataBook[0].id && item?.page === pageNumber,
        )
      : undefined;
    if (!existingEntry && pageNumber === dataBook?.length - 1) {
      // jika nanti pertama kali melakukan update data terakhir
      await addPastStory(dataBook[0].id);
      setShowModalCongrats(true);
    } else if (
      existingEntry &&
      pageNumber === dataBook?.length - 1 &&
      !isPremium
    ) {
      //jika tidak premium maka akan terus menampilan modal setiap terakhir
      setShowModalCongrats(true);
    }
    if (pageNumber === dataBook?.length - 1) {
      //   if(isPremium){
      //     const data = await AsyncStorage.getItem('isFirstTime');
      //     // AsyncStorage.removeItem('isFirstTime');
      //     // alert(data)
      //     if (data === 'yes') {
      //     } else {
      //       setShowModalCongrats(true);
      //       AsyncStorage.setItem('isFirstTime', 'yes');
      //     }
      //   }else{
      //     setShowModalCongrats(true);
      //   }
      // } else {
      //   clearTimeout(timeoutLove);
      //   setIsLoveAnimate(false);
    }
    // purchaseSubscription()
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
  const handleTouchStart = e => {
    // Mendapatkan posisi sentuhan
    const touchX = e.nativeEvent.locationX;
    // Menghitung setengah lebar layar
    const halfScreenWidth = Dimensions.get('window').width / 2;

    // Jika sentuhan terjadi di sebelah kiri, set isSwipingLeft ke true
    if (touchX < halfScreenWidth) {
      setIsSwipingLeft(true);
      if (activeStep === 1) {
      } else {
        setTutorial({
          ...isTutorial,
          step: isTutorial.step - 1,
        });
        setActiveStep(prevStep => prevStep - 1);
        handleSetSteps(activeStep - 1);
      }
    }
    // Jika sentuhan terjadi di sebelah kanan, set isSwipingRight ke true
    else {
      handleNext();
      setIsSwipingRight(true);
    }
  };

  const handleNext = () => {
    const content =
      'Being the youngest one in my crew, and in my twenties, with a pretty much an old school mindset is kinda hard as I find difficulties to actually fit in. I’ve been there before: the loyal friend who has to be there for her girlfriends when they get dumped for the silliest and dumbest reasons. these days isn’t worth a single teardrop, and most importantly, having to hear them crying which deliberately forces me to come up with stories and jokes in order to cheer them up.';
    setActiveStep(prevStep => prevStep + 1); // Menambahkan 1 ke langkah saat mengklik "Next"
    handleSetSteps(stepsTutorial + 1);
    if (activeStep === 2) {
      navigate('Library');
    } else if (stepsTutorial === 5) {
      navigate('Share', {
        selectedContent:
          ' To be completely and shamelessly honest, I was against getting into a relationship for a number of reasons.',
        start: content?.substring(0, 30),
        end: content.substring(30, 30 + 30),
      });
    }
  };

  const handleTouchEnd = () => {
    // Reset status swipe saat sentuhan selesai
    setIsSwipingLeft(false);
    setIsSwipingRight(false);
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

  const handleThemeAvatar = async () => {
    // (angry,confused,cry,dizzy,excited,friendly,inlove,positive.scare,think)
    let params = {
      flag: 'friendly',
    };
    try {
      const data = await getListAvatarTheme(params);
      if (data?.data) {
        setMe(data?.data?.me);
        setPartner(data?.data?.partner);
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleThemeAvatar();
    // handleSetSteps(0);
    const checkTutorial = async () => {
      // AsyncStorage.setItem('isTutorial', 'yes');
      // handleSetSteps(0);
      const isFinishTutorial = await AsyncStorage.getItem('isTutorial');

      if (isFinishTutorial === 'yes' && isTutorial.step === 0) {
        setFinishTutorial(true);
        setTutorial({
          visible: true,
          step: 1,
        });
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          setTutorial({
            ...isTutorial,
            step: isTutorial.step + 1,
          });
          setActiveStep(1);
          handleSetSteps(1);
        }, 5000);
      } else if (activeStep > 3 && activeStep < 5) {
        navigate('Library');
      }
    };
    checkTutorial();
  }, []);

  const renderFactItem = ({item, index}) => {
    return (
      <QuotesContent
        item={item}
        isActive={activeSlide === index}
        totalStory={dataBook.length}
        pageActive={index}
        isAnimationStart={isLoveAnimate}
        themeUser={userProfile?.data}
        fontSize={fontSize}
        bgTheme={colorTheme}
        bg={backgroundColor}
        fontFamily={fontFamily}
        me={me}
        partner={partner}
        source={undefined}
        isPremium={isPremium}
      />
    );
  };

  // function renderFlatList() {
  //   return (
  //     <PanGestureHandler
  //       onGestureEvent={handleGesture}
  //       activeOffsetX={[-40, 40]}>
  //       <TapGestureHandler onHandlerStateChange={onDoubleTap} numberOfTaps={3}>
  //         <FlatList
  //           // ref={flatListRef}
  //           style={{
  //             flex: 1,
  //             backgroundColor: backgroundColor,
  //           }}
  //           data={dataBook}
  //           pagingEnabled
  //           onMomentumScrollEnd={onMomentoumScrollEnd}
  //           scrollsToTop={false}
  //           horizontal
  //           showsVerticalScrollIndicator={false}
  //           showsHorizontalScrollIndicator={false}
  //           // onEndReached={handleEndReach}
  //           onEndReachedThreshold={0.9}
  //           renderItem={renderFactItem}
  //           keyExtractor={(_item, index) => `${index}`}
  //           initialScrollIndex={0}
  //           getItemLayout={(_data, index) => ({
  //             length: sizing.getDimensionWidth(0.5),
  //             offset: sizing.getDimensionWidth(0.5) * index,
  //             index,
  //           })}
  //           onScrollToIndexFailed={() => {
  //             console.log('FAILED SCROLL TO INDEX', 5);
  //           }}
  //         />
  //       </TapGestureHandler>
  //     </PanGestureHandler>
  //   );
  // }

  function renderFlatList() {
    return (
      <PagerView
        style={{flex: 1}}
        initialPage={0}
        transitionStyle="curl"
        onPageSelected={e => onScroll(e)}>
        {dataBook.map((dtb, index) => {
          return (
            <View
              style={{
                flex: 0,
                alignItems: 'center',
                backgroundColor: backgroundColor,
                paddingTop: 20,
                paddingHorizontal: 20,
              }}>
              {renderFactItem({item: dtb, index})}
            </View>
          );
        })}
      </PagerView>
    );
  }

  useEffect(() => {
    async function fetchData() {
      const isFinishTutorial = await AsyncStorage.getItem('isTutorial');
      if (isFinishTutorial === 'yes') {
        setFinishTutorial(true);
      } else {
        setFinishTutorial(false);
      }
    }
    fetchData();
  }, [isFocused]);

  const handleUnlock = async () => {
      const data = await handleNativePayment()
      if(data){
        setShowModalNewStory(false);
        setShowModalSuccessPurchase(true);
      }else{
        setShowModalNewStory(false);
      }
  }
  const handleUnlimited = async () => {
   
    //
    try {
      const paymentResult = await handlePayment();
      if (paymentResult.success) {
        setShowModalGetPremium(true);
        setShowModalNewStory(false);
        console.log('Pembayaran berhasil:', paymentResult.result);
        // Lakukan tindakan setelah pembayaran berhasil
      } else {
        setShowModalNewStory(false);
        console.log('Pembayaran gagal:', paymentResult.result);
        // Lakukan tindakan setelah pembayaran gagal
      }
    } catch (error) {
      setShowModalNewStory(false);
      console.error('Terjadi kesalahan:', error);
      // Tangani kesalahan yang mungkin terjadi
    }
    // setShowModalGetPremium(true);
  }

  const renderProgress = () => <StepHeader currentStep={stepsTutorial} />;
  const renderTutorial = () => {
    if (isFinishTutorial) {
      if (activeStep === 0) {
        return (
          <Modal
            visible={visible}
            animationType="fade"
            transparent
            onDismiss={() => setVisible(false)}>
            <ImageBackground
              source={imgBgTips}
              resizeMode="cover"
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                flex: 1,
                alignItems: 'center',
              }}>
              <Image
                source={imgBgAvaTips}
                resizeMode="contain"
                style={{width: '80%', height: '100%'}}
              />
              <Image
                source={imgLoveLeft}
                resizeMode="contain"
                style={{
                  width: '30%',
                  height: '100%',
                  position: 'absolute',
                  top: -70,
                  left: 0,
                }}
              />
              <Image
                source={imgLoveRight}
                resizeMode="contain"
                style={{
                  width: '30%',
                  height: '100%',
                  position: 'absolute',
                  top: -70,
                  right: 0,
                }}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  bottom: 0,
                  width: Dimensions.get('window').width,
                  height: '58%',
                  borderTopRightRadius: 60,
                  borderTopLeftRadius: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ImageBackground
                  source={imgBgContent}
                  resizeMode="contain"
                  style={{
                    width: Dimensions.get('window').width,
                    height: 250,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#5873FF',
                      fontSize: 30,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontFamily: 'Comfortaa-SemiBold',
                    }}>
                    {`Hey, ${userProfile?.data?.name}\nYou’re all set!`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      textAlign: 'center',
                      fontWeight: '100',
                      marginTop: 10,
                    }}>
                    {"Let's show you how \nEroTales works..."}
                  </Text>
                </ImageBackground>
              </View>
            </ImageBackground>
          </Modal>
        );
      } else if (activeStep <= 3 || activeStep <= 5 || stepsTutorial <= 5) {
        const content = `Being the youngest one in my crew, and in my twenties, with a pretty much an old school mindset is kinda hard as I find difficulties to actually fit in.
      I’ve been there before: the loyal friend who has to be there for her girlfriends when they get dumped for the silliest and dumbest reasons. these days isn’t worth a single teardrop, and most importantly, having to hear them crying which deliberately forces me to come up with stories and jokes in order to cheer them up.`;
        return (
          <SafeAreaView
            // onTouchStart={handleTouchStart}
            // onTouchEnd={handleTouchEnd}
            style={{
              position: 'absolute',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,

              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            {renderProgress()}
            <View
              style={{
                backgroundColor: '#3F58DD',
                borderRadius: 20,
                padding: 10,
                marginHorizontal: 40,
                alignItems: 'center',
                marginTop: '40%',
                paddingTop: 50,
              }}>
              <Image
                source={
                  activeStep === 1 && activeStep != 5
                    ? imgStep1
                    : activeStep === 5 || stepsTutorial == 5
                    ? imgStep5
                    : imgStep2
                }
                resizeMode="contain"
                style={{
                  width: 100,
                  height: 200,
                  position: 'absolute',
                  top: -100,
                }}
              />
              <Text
                style={{
                  color: code_color.white,
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 20,
                }}>
                {activeStep === 1 && activeStep != 5
                  ? 'Discover a brand new\nEroTales Story every day.\n\nHungry for more?\nUnlock additional Stories\nanytime!'
                  : activeStep === 5 || stepsTutorial == 5
                  ? 'Save & transform parts of the\nStory into a Custom\nQuote by selecting it.'
                  : 'Like & save your \nfavorite Stories.'}
              </Text>

              <Button
                style={{
                  backgroundColor: code_color.yellow,
                  padding: 10,
                  paddingHorizontal: 40,
                  borderRadius: 20,
                  marginVertical: 10,
                }}
                title={i18n.t('Next')}
                onPress={() => handleNext()}
              />
            </View>
          </SafeAreaView>
        );
      }
    }
  };

  const renderView = () => {
    if (route?.name != 'Main') {
      return (
        <Pressable
          onPress={() => (route?.name != 'Main' ? pressScreen() : null)}
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
          <ModalStoryUnlock
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            data={undefined}
            restart={undefined}
            edit={undefined}
            readLater={readLater}
          />
          <ModalCongrats
            isVisible={showModalCongrats}
            onClose={() => setShowModalCongrats(false)}
            onGotIt={() => {
              setShowModalCongrats(false);
              if (isPremium) {
                setShowModal(true);
              } else {
                setShowModalNewStory(true);
              }
            }}
          />
          <ModalSuccessPurchase
            isVisible={showModalSuccessPurchase}
            onClose={() => setShowModalSuccessPurchase(false)}
          />
          {renderTutorial()}
          {renderFlatList()}
        </Pressable>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: backgroundColor,
            flex: 1,
            // paddingHorizontal: 20,
            // paddingTop: 20,
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
          <ModalStoryUnlock
            isVisible={showModal}
            onClose={() => setShowModal(false)}
            data={undefined}
            restart={undefined}
            edit={undefined}
            readLater={readLater}
          />
          <ModalCongrats
            isVisible={showModalCongrats}
            onClose={() => setShowModalCongrats(false)}
            onGotIt={() => {
              setShowModalCongrats(false);
              if (isPremium) {
                setShowModal(true);
              } else {
                setShowModalNewStory(true);
              }
            }}
          />
          <ModalNewStory
            isVisible={showModalNewStory}
            onClose={() => setShowModalNewStory(false)}
            onWatchAds={() => {
              setShowModalNewStory(false);
              setShowModal(true);
            }}
            onUnlock={() => {
              handleUnlock()
            }}
            onGetUnlimit={() => {
<<<<<<< HEAD
              handleUnlimited()
=======
              setShowModalNewStory(false);
              handlePayment();
              setShowModalGetPremium(true);
>>>>>>> 316354e756f99623389ceeaffcd3f901c57bac5f
            }}
          />
          <ModalSuccessPurchase
            isVisible={showModalSuccessPurchase}
            onClose={() => setShowModalSuccessPurchase(false)}
          />
          <ModalGetPremium
            isVisible={showModalGetPremium}
            onGotIt={() => {
              setShowModalGetPremium(false);
              setShowModal(true);
            }}
            onClose={() => setShowModalGetPremium(false)}
          />
          {renderFlatList()}
          {renderTutorial()}
        </View>
      );
    }
  };
  return renderView();
}

const styles = StyleSheet.create({});

MainScreen.propTypes = {
  activeVersion: PropTypes.any,
  pressScreen: PropTypes.any,
};

MainScreen.defaultProps = {
  activeVersion: null,
};

export default connect(states, dispatcher)(MainScreen);

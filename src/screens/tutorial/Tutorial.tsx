import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  PanResponder,
  Modal,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  useProgress,
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';
import ModalShareStory from '../../components/modal-share-story';
import PropTypes from 'prop-types';
import dispatcher from './dispatcher';
import states from './states';
import styles from './styles';
import {code_color} from '../../utils/colors';
import {bgGetUnlimit, imgBgAvaTips, imgBgTips, imgHearts, imgLoveLeft, imgLoveRight, imgSelect} from '../../assets/images';
import {goBack, navigate} from '../../shared/navigationRef';
import LoveSvg from '../../assets/icons/bottom/love.jsx';
import CloseIcon from '../../assets/icons/close';
import LoveOutline from '../../assets/icons/loveOutline';
import Prev5 from '../../assets/icons/prev5';
import Pause from '../../assets/icons/pause';
import Play from '../../assets/icons/play';
import Next5 from '../../assets/icons/next5';
import ShareSvg from '../../assets/icons/share';
import {connect} from 'react-redux';
import {sizing} from '../../shared/styling';
import {BACKEND_URL} from '../../shared/static';
import StepHeader from '../../layout/step/stepHeader';
import {Step1, Step2, Step3, Step5} from '../../layout/tutorial';
import {fixedFontSize, hp, wp} from '../../utils/screen';
import {addStory, deleteMyStory, getStoryDetail} from '../../shared/request';
import {handleSetStory} from '../../store/defaultState/actions';
import store from '../../store/configure-store';
import { ADD_STORY_TO_LIBRARY, AUDIO_PLAYED, eventTracking } from '../../helpers/eventTracking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import AnimatedLottieView from 'lottie-react-native';

const confettiAnimate = require('../../assets/lottie/confetti.json');
const rippleAnimate = require('../../assets/lottie/ripple.json');

function ScreenTutorial({route, stepsTutorial, handleSetSteps, userProfile}) {
  const [activeStep, setActiveStep] = useState(stepsTutorial);
  const [isFinishTutorial, setFinishTutorial] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isStartConfetti, setIsStartConfetti] = useState(false);
  const [isTutorial, setTutorial] = useState({
    visible: false,
    step: stepsTutorial,
  });

  const handleTouchStart = e => {
    // Mendapatkan posisi sentuhan
    const touchX = e.nativeEvent.locationX;
    // Menghitung setengah lebar layar
    const halfScreenWidth = Dimensions.get('window').width / 2.5;

    // Jika sentuhan terjadi di sebelah kiri, set isSwipingLeft ke true
    if (touchX < halfScreenWidth) {
      handlePrev();
    }
    // Jika sentuhan terjadi di sebelah kanan, set isSwipingRight ke true
    else {
      navigate('Library');
    }
  };
  const handlePrev = () => {
    handleSetSteps(2);
    navigate('Main');
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setIsStartConfetti(true);
        setTimeout(() => {
          setIsStartConfetti(false);
        }, 1000);
      }, 1000);
    }
  }, [visible]);

  useEffect(() => {
    const checkTutorial = async () => {
      const isFinishTutorial = await AsyncStorage.getItem('isTutorial');
      if (isFinishTutorial === 'yes' && isTutorial.step === 0) {
        setFinishTutorial(true);
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          setTutorial({
            ...isTutorial,
            step: isTutorial.step + 1,
          });
          setActiveStep(1);
          handleSetSteps(1);
        }, 3500);
      } else if (activeStep === 2 || activeStep === 3) {
        setFinishTutorial(false);
        // setIsRippleAnimate(true);
        // setTimeout(() => {
        //   setFinishTutorial(true);
        //   setIsRippleAnimate(false);
        // }, 3000);
        if (route?.name == 'Main') {
          setTimeout(() => {
            navigate('Media');
          }, 2500);
        }
      } else if (activeStep === 4) {
        navigate('ExploreLibrary');
      } else if (
        activeStep === 6 ||
        activeStep === 7 ||
        activeStep === 8 ||
        activeStep === 9
      ) {
        const content =
          'Being the youngest one in my crew, and in my twenties, with a pretty much an old school mindset is kinda hard as I find difficulties to actually fit in. I’ve been there before: the loyal friend who has to be there for her girlfriends when they get dumped for the silliest and dumbest reasons. these days isn’t worth a single teardrop, and most importantly, having to hear them crying which deliberately forces me to come up with stories and jokes in order to cheer them up.';
        navigate('Share', {
          selectedContent:
            ' To be completely and shamelessly honest, I was against getting into a relationship for a number of reasons.',
          start: content?.substring(0, 30),
          end: content.substring(30, 30 + 30),
        });
      }
    };
    checkTutorial();
  }, [])

  const renderProgress = () => <StepHeader currentStep={4} />;

  // const renderTutorial = () => {
  //   if (stepsTutorial === 3) {
  //     return (
  //       <SafeAreaView
  //         onTouchStart={handleTouchStart}
  //         // onTouchEnd={handleTouchEnd}
  //         pointerEvents="box-only"
  //         style={{
  //           position: 'absolute',
  //           width: Dimensions.get('window').width,
  //           height: Dimensions.get('window').height,
  //           top: 0,
  //           backgroundColor: 'rgba(0,0,0,0.3)',
  //         }}>
  //         {renderProgress()}
  //         <Step3
  //           handleNext={() => {
  //             navigate('Library');
  //           }}
  //           handlePrev={() => {
  //             handleSetSteps(2);
  //             navigate('Main');
  //           }}
  //         />
  //       </SafeAreaView>
  //     );
  //   }
  // };

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
              <Animatable.Image
                animation={{
                  from: {
                    bottom: '-50%',
                  },
                  to: {
                    bottom: '0%',
                  },
                  easing: 'ease-out-back',
                }}
                delay={200}
                duration={800}
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
                  borderTopRightRadius: wp(60),
                  borderTopLeftRadius: wp(60),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: Dimensions.get('window').width,
                    height: wp(250),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {isStartConfetti && (
                    <AnimatedLottieView
                      source={confettiAnimate}
                      style={{
                        width: '80%',
                        // height: 500,
                        // bottom: 20,
                        // left: -40,
                        top: '-8%',
                        left: '7%',
                        position: 'absolute',
                        zIndex: 2,
                      }}
                      autoPlay
                      duration={1000}
                      loop={false}
                    />
                  )}
                  <Animatable.Text
                    delay={0}
                    animation={'fadeInUp'}
                    duration={1000}
                    style={{
                      color: '#5873FF',
                      fontSize: 30,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontFamily: 'Comfortaa-SemiBold',
                      marginBottom: wp(50),
                    }}>
                    {`Hey, ${
                      userProfile?.data?.name === null
                        ? ''
                        : userProfile?.data?.name
                    }\nYou’re all set!`}
                  </Animatable.Text>
                  <Animatable.Text
                    delay={2000}
                    animation={'fadeIn'}
                    duration={800}
                    style={{
                      fontSize: fixedFontSize(24),
                      textAlign: 'center',
                      fontWeight: '100',
                      marginTop: wp(10),
                    }}>
                    {"Let's show you how \nEroTales works..."}
                  </Animatable.Text>
                </View>
              </View>
            </ImageBackground>
          </Modal>
        );
      } else if (activeStep <= 3 || activeStep <= 5 || stepsTutorial <= 5) {
        const content = `Being the youngest one in my crew, and in my twenties, with a pretty much an old school mindset is kinda hard as I find difficulties to actually fit in.
      I’ve been there before: the loyal friend who has to be there for her girlfriends when they get dumped for the silliest and dumbest reasons. these days isn’t worth a single teardrop, and most importantly, having to hear them crying which deliberately forces me to come up with stories and jokes in order to cheer them up.`;
        return (
          <SafeAreaView
            onTouchStart={handleTouchStart}
            // onTouchEnd={handleTouchEnd}
            pointerEvents="box-only"
            style={{
              position: 'absolute',
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,

              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            {activeStep != 5 && stepsTutorial != 5 && stepsTutorial != 3
              ? renderProgress()
              : null}
            {activeStep === 1 ? (
              <Step1 handleNext={() => {}} />
            ) : activeStep === 5 || stepsTutorial == 5 ? (
              <View style={{alignItems: 'center'}}>
                <ImageBackground
                  source={imgSelect}
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    marginTop: '-10%',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      opacity: 1,
                      marginTop: wp(40),
                    }}>
                    {renderProgress()}
                  </View>

                  <Step5
                    handleNext={() => {}}
                    handlePrev={handlePrev}
                  />
                </ImageBackground>
              </View>
            ) : (
              <Step2
                handleNext={() => {}}
                handlePrev={() => {
                  setActiveStep(1);
                  handleSetSteps(1);
                }}
              />
            )}
          </SafeAreaView>
        );
      }
    }
  };
  return (
    <>
    {renderTutorial()}
    </>
      
      
  );
}

export default connect(states, dispatcher)(ScreenTutorial);

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
import {
  audioScreen,
  imgBgAvaTips,
  imgBgTips,
  imgLoveLeft,
  imgLoveRight,
  imgQuoteNew,
  imgSelect,
  tips_step1,
  tips_step4,
  tips_step5,
  xpAndLevel,
} from '../../assets/images';
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
import {
  Step1,
  Step2,
  Step3,
  Step4,
  Step4_2,
  Step5,
  Step6,
  Step7,
  Step8,
} from '../../layout/tutorial';
import {fixedFontSize, hp, wp} from '../../utils/screen';
import {addStory, deleteMyStory, getStoryDetail} from '../../shared/request';
import {handleSetStory} from '../../store/defaultState/actions';
import store from '../../store/configure-store';
import {
  ADD_STORY_TO_LIBRARY,
  AUDIO_PLAYED,
  ONBOARDING_COMPLETE,
  eventTracking,
} from '../../helpers/eventTracking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import AnimatedLottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';
import {handlePayment} from '../../helpers/paywall';
import moment from 'moment';

const confettiAnimate = require('../../assets/lottie/confetti.json');
const rippleAnimate = require('../../assets/lottie/ripple.json');

function ScreenTutorial({route, stepsTutorial, handleSetSteps, userProfile}) {
  const [activeStep, setActiveStep] = useState(stepsTutorial);
  const [isFinishTutorial, setFinishTutorial] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showModal1Step7, setShowModal1Step7] = useState(false);
  const [showModal2Step7, setShowModal2Step7] = useState(false);
  const [isStartConfetti, setIsStartConfetti] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [imageSource, setImageSource] = useState(tips_step1);
  const [image, setImage] = useState(tips_step1);
  const [isTutorial, setTutorial] = useState({
    visible: false,
    step: stepsTutorial,
  });
  const [show, setShow] = useState(false);
  const timeout7SecRef = useRef<any>();
  const step7Ref = useRef<any>();
  const step7_2Ref = useRef<any>();

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
      handleNext();
      // navigate('Library');
    }
  };
  const handlePrev = () => {
    if (stepsTutorial > 1) {
      stopTimeout();
      setActiveStep((prevStep: number) => prevStep - 1);
      handleSetSteps(stepsTutorial - 1);
      if (stepsTutorial === 8) {
        clearTimeout(step7Ref.current);
        clearTimeout(step7_2Ref.current);
        setShowModal1Step7(false);
        setShowModal2Step7(false);
        startStep7();
      }
    }
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

  const startStep7_2 = () => {
    clearTimeout(step7_2Ref.current); // Clears existing timeout
    step7_2Ref.current = setTimeout(() => {
      setShowModal2Step7(true);
    }, 2600);
  };

  const startStep7 = () => {
    clearTimeout(step7Ref.current); // Clears existing timeout
    step7Ref.current = setTimeout(() => {
      setShowModal1Step7(true);
      clearTimeout(step7Ref.current);
      setTimeout(() => {
        setShowModal1Step7(false);
        startStep7_2();
      }, 8500);
    }, 1000);
  };

  const startTimeout = () => {
    clearTimeout(timeout7SecRef.current);
    timeout7SecRef.current = setTimeout(
      () => {
        // Your logic here
        handleNext();
      },
      stepsTutorial === 7
        ? 18500
        : stepsTutorial === 6
        ? 5500
        : stepsTutorial === 3 || stepsTutorial === 4
        ? 7500
        : 7000,
    ); // Set a new timeout
  };
  const stopTimeout = () => {
    clearTimeout(timeout7SecRef.current); // Stop the active timeout
  };
  useEffect(() => {
    if (stepsTutorial < 8) {
      startTimeout();
    }
  }, [stepsTutorial]);

  useEffect(() => {
    // handleSetSteps(0);
    // setTutorial({...isTutorial, step: 0});
    // setActiveStep(0);
    AsyncStorage.setItem('isTutorial', 'yes');
    setFinishTutorial(true);
    const checkTutorial = async () => {
      const isFinishTutorial = await AsyncStorage.getItem('isTutorial');
      if (isFinishTutorial === 'yes' && isTutorial.step === 0) {
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
        // setFinishTutorial(false);
        // setIsRippleAnimate(true);
        // setTimeout(() => {
        //   setFinishTutorial(true);
        //   setIsRippleAnimate(false);
        // }, 3000);
        // if (route?.name == 'Main') {
        //   setTimeout(() => {
        //     navigate('Media');
        //   }, 2500);
        // }
      } else if (activeStep === 4) {
        // navigate('ExploreLibrary');
      } else if (
        activeStep === 6 ||
        activeStep === 7 ||
        activeStep === 8 ||
        activeStep === 9
      ) {
        const content =
          'Being the youngest one in my crew, and in my twenties, with a pretty much an old school mindset is kinda hard as I find difficulties to actually fit in. I’ve been there before: the loyal friend who has to be there for her girlfriends when they get dumped for the silliest and dumbest reasons. these days isn’t worth a single teardrop, and most importantly, having to hear them crying which deliberately forces me to come up with stories and jokes in order to cheer them up.';
        // navigate('Share', {
        //   selectedContent:
        //     ' To be completely and shamelessly honest, I was against getting into a relationship for a number of reasons.',
        //   start: content?.substring(0, 30),
        //   end: content.substring(30, 30 + 30),
        // });
      }
    };
    checkTutorial();
  }, []);

  const renderProgress = () => <StepHeader currentStep={stepsTutorial + 1} />;

  const handleNext = () => {
    if (stepsTutorial < 8) {
      setActiveStep((prevStep: number) => prevStep + 1); // Menambahkan 1 ke langkah saat mengklik "Next"
      handleSetSteps(stepsTutorial + 1);
      if (stepsTutorial === 6) {
        clearTimeout(step7Ref.current);
        clearTimeout(step7_2Ref.current);
        setShowModal1Step7(false);
        setShowModal2Step7(false);
        startStep7();
      } else {
        if (stepsTutorial === 4) {
          setImage(tips_step1);
        }
        clearTimeout(step7Ref.current);
        clearTimeout(step7_2Ref.current);
        setShowModal1Step7(false);
        setShowModal2Step7(false);
      }
    } else {
      checkInstall();
      AsyncStorage.removeItem('isTutorial');
      handleSetSteps(0);
      eventTracking(ONBOARDING_COMPLETE);
      // setTimeout(() => {
      //     handlePayment('onboarding');
      // }, 200);

      navigate('Bottom');
    }
  };
  const checkInstall = async () => {
    const getFirstInstall = await AsyncStorage.getItem('firstInstall');
    const stringifyDate = Date.now().toString();
    if (getFirstInstall === null) {
      await AsyncStorage.setItem('firstInstall', stringifyDate);
    }
  };
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
      } else if (
        activeStep < 3 ||
        (activeStep > 3 && activeStep == 6) ||
        (stepsTutorial > 3 && stepsTutorial == 6)
      ) {
        return (
          <>
            {activeStep === 1 ? (
              <>
                <Step1 handleNext={() => {}} />
              </>
            ) : activeStep === 6 || stepsTutorial == 6 ? (
              <View style={{alignItems: 'center'}}>
                <ImageBackground
                  source={imgSelect}
                  style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    marginTop: '-13%',
                  }}>
                  <View style={{top: wp(50)}}>
                    <Step5 handleNext={() => {}} handlePrev={handlePrev} />
                  </View>
                </ImageBackground>
              </View>
            ) : (
              <>
                <Animatable.View
                  delay={3000}
                  animation={'fadeOut'}
                  style={{
                    position: 'absolute',
                    bottom: -wp(24),
                    left: -wp(15),
                  }}>
                  <AnimatedLottieView
                    source={rippleAnimate}
                    style={{
                      width: wp(150),
                    }}
                    autoPlay
                    duration={4000}
                    loop={true}
                  />
                </Animatable.View>

                <Step2
                  handleNext={() => handleNext()}
                  handlePrev={() => {
                    setActiveStep(1);
                    handleSetSteps(1);
                  }}
                />
              </>
            )}
          </>
        );
      } else if (stepsTutorial === 3) {
        return (
          <View style={{alignItems: 'center'}}>
            <ImageBackground
              source={audioScreen}
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                marginTop: '-13%',
              }}>
              <Step3 handleNext={handleNext} handlePrev={handlePrev} />
            </ImageBackground>
          </View>
        );
      } else if (stepsTutorial === 4) {
        return (
          <>
            <Step4 handleNext={handleNext} />
            <Animatable.View
              delay={3000}
              animation={'fadeIn'}
              style={{
                position: 'absolute',
                bottom: -wp(100),
                left: '10%',
              }}>
              <AnimatedLottieView
                source={rippleAnimate}
                style={{
                  width: wp(300),
                }}
                autoPlay
                duration={3000}
                loop={true}
              />
            </Animatable.View>
          </>
        );
      } else if (stepsTutorial === 5) {
        return <Step4_2 handleNext={handleNext} handlePrev={handlePrev} />;
      } else if (stepsTutorial === 7) {
        return (
          <View>
            {showModal1Step7 ? <Step6 /> : null}
            {showModal2Step7 ? <Step7 handleNext={handleNext} /> : null}
          </View>
        );
      } else if (stepsTutorial === 8) {
        return (
          <View>
            <Step8 handleNext={handleNext} />
          </View>
        );
      }
    }
  };
  useEffect(() => {
    setImageSource(getImageBasedOnStep(stepsTutorial));
  }, [stepsTutorial, activeStep]);

  const getImageBasedOnStep = (step: number) => {
    switch (step) {
      case 3:
        return tips_step1;
      case 4:
        return tips_step4;
      case 5:
        return tips_step5;
      case 7:
        return imgQuoteNew;
      case 8:
        return xpAndLevel;
      default:
        return tips_step1;
    }
  };

  return (
    <>
      <FastImage
        source={imageSource}
        style={{width: '100%', height: '100%'}}
        resizeMode={FastImage.resizeMode.contain}
      />
      <SafeAreaView
        onTouchStart={handleTouchStart}
        pointerEvents="box-only"
        style={{
          position: 'absolute',
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: stepsTutorial > 6 ? undefined : 'rgba(0,0,0,0.3)',
        }}>
        {renderProgress()}
        {renderTutorial()}
      </SafeAreaView>
    </>
  );
}

export default connect(states, dispatcher)(ScreenTutorial);

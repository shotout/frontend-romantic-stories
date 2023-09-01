import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';
import {sizing} from '../../utils/styling';
import {ava1} from '../../assets/images';
import {code_color} from '../../utils/colors';
export default function QuotesContent({
  item,
  themeUser,
  source,
  isActive,
  isAnimationStart,
  showButtonOption,
  isYellowTrace,
  onPressRating,
  handleShowInterstialAdsLearn,
  main,
  handleShare,
  handleLike,
  showSharePopup,
  quoteLikeStatus,
}) {
  const [isRepeat, setRepeat] = useState(
    item?.repeat?.time != undefined || item?.isRepeat ? true : false,
  );
  const animationValue = useRef(new Animated.Value(0)).current;
  const [folded, setFolded] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const counter = useRef(0);
  const activeStatus = useRef(false);

  useEffect(() => {
    if (isActive && isAnimationStart) {
      // startAnimation();
      // activeStatus.current = true;
    // } else {
    //   // stopAnimation();
    }
  }, [isActive, isAnimationStart]);
  const startAnimation = () => {
    setFolded(!folded);

    Animated.timing(animationValue, {
      toValue: folded ? 0 : 1,
      duration: 100,
      useNativeDriver: false, // Set this to true for better performance, but note that not all properties are supported with native driver
    }).start();
    // animationValue.stopAnimation();
  };
  const rotation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <View>
      {/* {renderBackgroundImage()} */}
      <Animated.View
        style={{
          width: '100%',
          height: sizing.getDimensionHeight(Platform.OS === 'android' ? 0.82 : 0.84),
          // backgroundColor: 'red',
          // borderBottomColor: 'black',
          // borderWidth: 1,
          transform: [{rotateX: rotation}],
        }}>
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={ava1}
            resizeMode="contain"
            style={{
              width: 100,
              height: 200,
              opacity: 0.6,
            }}
          />
        </View>
        <Text
          style={{
            marginHorizontal: 50,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          {item?.title}
        </Text>
        <View style={{borderWidth: 1, borderColor: code_color.grey}} />
        <View style={styles.ctnIcon}>
          <View style={styles.quotesWrapper}>
            <View style={styles.txtQuotesWrapper}>
              <Text style={[styles.ctnQuotes]}>{item?.detail}</Text>
            </View>
          </View>
        </View>
        {/* </ImageBackground> */}
      </Animated.View>
    </View>
  );
}

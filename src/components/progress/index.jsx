import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {hp, wp} from '../../utils/screen';
import {code_color} from '../../utils/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const GojekProgressBar = ({levelingUser, bgTheme}) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const animatedScrollOffset = new Animated.Value(scrollOffset);
  const [infoCardPosition, setInfoCardPosition] = useState(0);
  const animatedPosition = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const levels = [
    {
      created_at: '2023-12-06T07:45:22.000000Z',
      desc: 'Romance \nRookie',
      id: 1,
      name: 'level 1',
      status: 2,
      updated_at: null,
      value: 0,
      value_desc: '0 XP',
    },
    {
      created_at: '2023-12-06T07:45:22.000000Z',
      desc: 'Heartfelt \nAdventurer',
      id: 2,
      name: 'level 2',
      status: 2,
      updated_at: null,
      value: 5,
      value_desc: '5 XP',
    },
    {
      created_at: '2023-12-06T07:45:22.000000Z',
      desc: 'Passion \nPioneer',
      id: 3,
      name: 'level 3',
      status: 2,
      updated_at: null,
      value: 25,
      value_desc: '25 XP',
    },
    {
      created_at: '2023-12-06T07:45:22.000000Z',
      desc: 'Flirty \nFictionista',
      id: 4,
      name: 'level 4',
      status: 2,
      updated_at: null,
      value: 80,
      value_desc: '80 XP',
    },
    {
      created_at: '2023-12-06T07:45:22.000000Z',
      desc: 'Passion \nProwler',
      id: 5,
      name: 'level 5',
      status: 2,
      updated_at: null,
      value: 200,
      value_desc: '200 XP',
    },
    {
      created_at: '2023-12-06T07:45:22.000000Z',
      desc: 'Heartfelt \nVoyager',
      id: 6,
      name: 'level 6',
      status: 2,
      updated_at: null,
      value: 400,
      value_desc: '400 XP',
    },
    {
      created_at: '2023-12-06T07:45:22.000000Z',
      desc: 'Sizzling \nStoryteller',
      id: 7,
      name: 'level 7',
      status: 2,
      updated_at: null,
      value: 600,
      value_desc: '600 XP',
    },
    {
      created_at: '2023-12-06T07:45:22.000000Z',
      desc: 'Naughty \nNovelist',
      id: 8,
      name: 'level 8',
      status: 2,
      updated_at: null,
      value: 800,
      value_desc: '800 XP',
    },
    {
      created_at: '2023-12-06T07:45:22.000000Z',
      desc: 'EroTales \nSuperstar',
      id: 9,

      name: 'level 9',
      status: 2,
      updated_at: null,
      value: 1200,
      value_desc: '1200 XP',
    },
    {
      created_at: '2023-12-06T07:45:22.000000Z',
      desc: 'EroTales \nLegend',
      id: 10,
      name: 'level 10',
      status: 2,
      updated_at: null,
      value: 1800,
      value_desc: '1800 XP',
    },
  ];
  const progress = levelingUser?.user_level?.point;
  const levelCount = levels.length;
  const progressBarWidth = 1800;
  const spaceBetweenLevels = progressBarWidth / (levelCount - 1);
  const [lastAchievedLevelIndex, setLastAchievedLevelIndex] = useState(0);
  // Calculate the position of the progress bar
  const position =
    (progress / levels[levelCount - 1].value) *
    (progressBarWidth - spaceBetweenLevels);

  const infoCardRef = useRef(null);
  useEffect(() => {
    Animated.timing(animatedScrollOffset, {
      toValue: position,
      duration: 100,
      useNativeDriver: false,
    }).start();
   
    let lastAchievedIndex = 0;

    if (progress > 0 && levels && levels.length > 0) {
      for (let i = 0; i < levels.length; i++) {
        const currentLevel = levels[i];

        if (progress >= currentLevel.value) {
          lastAchievedIndex = i;
        } else {
          break;
        }
      }
    }

    setLastAchievedLevelIndex(lastAchievedIndex);
  }, [animatedScrollOffset, position, progress, levels]);

  const calculateProgressPosition = (progress, levels) => {
    const totalWidth = (Dimensions.get('window').width * 1000) / 100;
    let position = 0;

    if (progress > 0 && levels && levels.length > 0) {
      for (let i = 0; i < levels.length; i++) {
        const currentLevel = levels[i];

        if (progress <= currentLevel.value) {
          const prevLevel = levels[i - 1] || {value: 0};
          const progressInRange =
            (progress - prevLevel.value) /
            (currentLevel.value - prevLevel.value);
          position =
            i * (totalWidth / (levels.length - 1)) +
            progressInRange * (totalWidth / (levels.length - 1));
          break;
        }
      }
    }

    return position;
  };

  const renderLevels = () => {
    return levels.map((level, index) => (
      <View key={index} style={styles.levelContainer}>
        {index === lastAchievedLevelIndex && (
          <InfoCard
            position={calculateProgressPosition(level.value, levels)}
            message={'Your Level'}
          />
        )}
        {/* Tambahkan titik di tengah level */}
        <View style={[styles.point, {borderColor: bgTheme}]} />
        <Text style={styles.levelText}>{level?.desc}</Text>
      </View>
    ));
  };
  useEffect(() => {
    Animated.timing(animatedScrollOffset, {
      toValue: position,
      duration: 100,
      useNativeDriver: false,
    }).start();
  
    let lastAchievedIndex = 0;
  
    if (progress > 0 && levels && levels.length > 0) {
      for (let i = 0; i < levels.length; i++) {
        const currentLevel = levels[i];
  
        if (progress >= currentLevel.value) {
          lastAchievedIndex = i;
        } else {
          break;
        }
      }
    }
  
    setLastAchievedLevelIndex(lastAchievedIndex);
  
    // Scroll ke posisi baru
    scrollViewRef.current.scrollTo({ x: position, animated: true });
  
  }, [animatedScrollOffset, position, progress, levels]);
  // useEffect(() => {
  //   setInfoCardPosition(position);
  // }, [progress, levels]);

  const InfoCard = ({message}) => {
    const positions = calculateProgressPosition(progress, levels);
    return (
      <Animated.View style={[styles.infoCardContainer]}>
        <View style={styles.infoCardBubble} />
        <View style={styles.infoCard}>
          <Text allowFontScaling={false} style={{color: code_color.white}}>
            {message}
          </Text>
        </View>
      </Animated.View>
    );
  };
  return (
    <ScrollView
    ref={scrollViewRef}
    horizontal
    showsHorizontalScrollIndicator={false}
    // onScroll={(event) => setScrollOffset(event.nativeEvent.contentOffset.x)}
    scrollEventThrottle={16}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: wp(950),
              backgroundColor: code_color.greyDefault,
            },
          ]}
        />
        {/* <InfoCard message={'Your Level'} /> */}
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: animatedScrollOffset.interpolate({
                inputRange: levels.map(level => level.value),
                outputRange: levels.map(
                  (_, index) => `${(index / (levels.length - 1)) * 100}%`,
                ),
                extrapolate: 'clamp',
              }),
              backgroundColor: progress > 0 ? bgTheme : code_color.grey,
            },
          ]}
        />

        {renderLevels()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 200,
    marginLeft: wp(30),
  },
  progressBar: {
    height: wp(10),
    position: 'absolute',
    top: '25%',
    left: 0,
    borderRadius: 10,
  },
  levelContainer: {
    width: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    marginTop: 0,
    color: '#333',
    textAlign: 'center',
    marginRight: 30,
  },
  point: {
    width: wp(28),
    height: wp(28),
    backgroundColor: code_color.yellow,
    borderRadius: 20,
    borderWidth: 5,
    right:  Dimensions.get('window').height === 667 ? '80%':'70%',
    transform: [{translateY: -5}],
    position: 'absolute',
    top: Dimensions.get('window').height === 667 ? -35 : -40,
  },
  progressFilled: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#4CAF50', // Set the color for the filled progress
  },
  progressRemaining: {
    ...StyleSheet.absoluteFillObject,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'gray', // Set the color for the remaining progress
  },

  infoCardContainer: {
    position: 'absolute',
    alignItems: 'center',
    // justifyContent: 'flex-start', // Align to the top
    padding: 10,
    top: -90,
  },
  infoCardBubble: {
    position: 'absolute',
    top: '119%',
    left: '13%',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: code_color.blackDark, // Adjust this color if needed
    transform: [{rotate: '180deg'}],
  },
  infoCard: {
    backgroundColor: code_color.blackDark,
    borderRadius: 5,
    height: 30,
    paddingHorizontal: 5,
    // width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default GojekProgressBar;

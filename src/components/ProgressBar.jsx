import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, ScrollView } from 'react-native';
import { code_color } from '../utils/colors';
import { moderateScale } from 'react-native-size-matters';
import { hp } from '../utils/screen';

const ProgressBar = ({  bgTheme, levelingUser }) => {

  const [showInfo, setShowInfo] = useState(null);
  const animatedProgress = new Animated.Value(progress || 0);
  const progress = levelingUser?.user_level?.point;
  useEffect(() => {
    if (progress !== undefined) {
      Animated.timing(animatedProgress, {
        toValue: progress,
        duration: 200, // Durasi animasi dalam milidetik
        useNativeDriver: false, // Jika menggunakan Native Driver, beberapa properti tidak dapat diubah secara dinamis
      }).start();
    }
    // Animasikan perubahan nilai progress
    
  }, [progress]);
  

  const renderProgress = () => {
    if (progress < 80 || progress === undefined) {
      return renderCase1();
    } else if (progress => 80 && progress <= 600) {
      return renderCase2();
    } else {
      return renderCase3();
    }
  };

  const renderCase1 = () => (
    <View>
      <View style={styles.container}>
      <Animated.View
          style={[
            styles.progressBar,
            {
              width: animatedProgress.interpolate({
                inputRange: [0, 5, 25, 79],
                outputRange: ['0%', '25%', '90%', '100%'],
              }),
              backgroundColor: bgTheme,
            },
          ]}
        />
      </View>
      {showInfo && (
        <InfoCard position={showInfo.position} message={showInfo.message} />
      )}
      <Pressable
        onPress={() =>
          setShowInfo({
            position: {top: '-500%', left: '-10%'},
            message: 'Your Level',
          })
        }
        style={[styles.dot, {left: '0%', borderColor: bgTheme}]}
      />
      <Text
        style={{
          position: 'absolute',
          textAlign: 'center',
          left: -10,
          top: moderateScale(15),
          fontSize: moderateScale(10),
        }}>{`Romance \n Rookie`}</Text>
      <Pressable
        onPress={() =>
          setShowInfo({
            position: {top: '-500%', left: '20%'},
            message: 'Your Level',
          })
        }
        style={[
          styles.dot,
          {
            left: '30%',
            transform: [{translateX: -5}, {translateY: -5}],
            borderColor: bgTheme,
          },
        ]}
      />
      <Text
        style={{
          position: 'absolute',
          textAlign: 'center',
          left: '23%',
          top: moderateScale(15),
          fontSize: moderateScale(10),
        }}>{`Heartfelt\n Adventurer`}</Text>
      <Pressable
        onPress={() =>
          setShowInfo({
            position: {top: '-500%', right: '10%'},
            message: 'Your Level',
          })
        }
        style={[styles.dot, {right: '10%', borderColor: bgTheme}]}
      />
      <Text
        style={{
          position: 'absolute',
          right: '5%',
          textAlign: 'center',
          top: moderateScale(15),
          fontSize: moderateScale(10),
        }}>{`Passion \nPioneer`}</Text>
    </View>
  );

  const renderCase2 = () => (
    <View>
      <View style={styles.container}>
      <Animated.View
          style={[
            styles.progressBar,
            {
              width: animatedProgress.interpolate({
                inputRange: [0, 80, 200, 400, 600],
                outputRange: ['0%', '0%', '30%', '60%', '100%'],
              }),
              backgroundColor: bgTheme,
            },
          ]}
        />
      </View>
      {showInfo && (
        <InfoCard position={showInfo.position} message={showInfo.message} />
      )}
      <Pressable
         onPress={() =>
           setShowInfo({
             position: {top: '-500%', left: '-10%'},
             message: 'Your Level',
           })
         }
         style={[styles.dot, {left: '0%', borderColor: bgTheme}]}
       />
       <Text
         style={{
           position: 'absolute',
           textAlign: 'center',
           left: -10,
           top: moderateScale(15),
           fontSize: moderateScale(10),
         }}>{`Flirty \n Fictionista`}</Text>
       <Pressable
         onPress={() =>
           setShowInfo({
             position: {top: '-500%', left: '20%'},
             message: 'Your Level',
           })
         }
         style={[
           styles.dot,
           {
             left: '30%',
             transform: [{translateX: -5}, {translateY: -5}],
             borderColor: bgTheme,
           },
         ]}
       />
       <Text
         style={{
           position: 'absolute',
           textAlign: 'center',
           left: '23%',
           top: moderateScale(15),
           fontSize: moderateScale(10),
         }}>{`Passion \n Prowler`}</Text>
       <Pressable
         onPress={() =>
           setShowInfo({
             position: {top: '-500%', right: '10%'},
             message: 'Your Level',
           })
         }
         style={[styles.dot, {right: '35%', borderColor: bgTheme}]}
       />
       <Text
         style={{
           position: 'absolute',
           right: '30%',
           textAlign: 'center',
           top: moderateScale(15),
           fontSize: moderateScale(10),
         }}>{`Heartfelt \nVoyager`}</Text>
          <Pressable
         onPress={() =>
           setShowInfo({
             position: {top: '-500%', right: '10%'},
             message: 'Your Level',
           })
         }
         style={[styles.dot, {right: '0%', borderColor: bgTheme}]}
       />
       <Text
         style={{
           position: 'absolute',
           right: '0%',
           textAlign: 'center',
           top: moderateScale(15),
           fontSize: moderateScale(10),
         }}>{`Sizzling \nStoryteller`}</Text>
         
     
       
    </View>
  );

  const renderCase3 = () => (
    <View>
      <View style={styles.container}>
      <Animated.View
          style={[
            styles.progressBar,
            {
              width: animatedProgress.interpolate({
                inputRange: [0, 800, 1200, 1650, 1800],
                outputRange: ['0%', '50%', '55%', '80%', '100%'],
              }),
              backgroundColor: bgTheme,
            },
          ]}
        />
      </View>
      {showInfo && (
        <InfoCard position={showInfo.position} message={showInfo.message} />
      )}
      
      <Pressable
        onPress={() =>
          setShowInfo({
            position: {top: '-500%', left: '20%'},
            message: 'Your Level',
          })
        }
        style={[
          styles.dot,
          {
            left: '0%',
            transform: [{translateX: -5}, {translateY: -5}],
            borderColor: bgTheme,
          },
        ]}
      />
      <Text
        style={{
          position: 'absolute',
          textAlign: 'center',
          left: '-5%',
          top: moderateScale(15),
          fontSize: moderateScale(10),
        }}>{`Naughty \nNovelist`}</Text>
      <Pressable
        onPress={() =>
          setShowInfo({
            position: {top: '-500%', right: '10%'},
            message: 'Your Level',
          })
        }
        style={[styles.dot, {right: '45%', borderColor: bgTheme}]}
      />
      <Text
        style={{
          position: 'absolute',
          right: '40%',
          textAlign: 'center',
          top: moderateScale(15),
          fontSize: moderateScale(10),
        }}>{`EroTales \nSuperstar`}</Text>
         <Pressable
        onPress={() =>
          setShowInfo({
            position: {top: '-500%', right: '10%'},
            message: 'Your Level',
          })
        }
        style={[styles.dot, {right: '0%', borderColor: bgTheme}]}
      />
      <Text
        style={{
          position: 'absolute',
          right: '0%',
          textAlign: 'center',
          top: moderateScale(15),
          fontSize: moderateScale(10),
        }}>{`EroTales \nLegend`}</Text>
    </View>
  );

  const InfoCard = ({ position, message }) => (
    <View style={[styles.infoCard, position]}>
      <Text allowFontScaling={false} style={{ color: code_color.white }}>
        {message}
      </Text>
    </View>
  );

  return (
    <View  style={{ marginBottom: moderateScale(60), }}>
      {renderProgress()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 10,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
  },
  dot: {
    position: 'absolute',
    width: hp(20),
    height: hp(20),
    backgroundColor: code_color.yellow,
    borderRadius: hp(20),
    borderWidth: 3,
    top: '10%',
    transform: [{ translateY: -5 }],
  },
  infoCard: {
    position: 'absolute',
    padding: 10,
    backgroundColor: code_color.blackDark,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ProgressBar;


import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import {code_color} from '../utils/colors';
import { moderateScale } from 'react-native-size-matters';

const ProgressBar = ({progress}) => {
  const [showInfo, setShowInfo] = useState(null);
  let status = 'Noob';
  if (progress >= 33 && progress < 66) {
    status = 'Expert';
  } else if (progress >= 66) {
    status = 'Pro';
  }
  const InfoCard = ({position, message}) => {
    return (
      <View style={[styles.infoCard, position]}>
        <Text allowFontScaling={false} style={{ color: code_color.white }}>{message}</Text>
      </View>
    );
  };
  return (
    <View style={{marginBottom: moderateScale(60)}}>
      <View style={styles.container}>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />

        {/* Dots for each step */}

        {/* <Text style={styles.label}>{status}</Text> */}
      </View>
      {showInfo && (
        <InfoCard position={showInfo.position} message={showInfo.message} />
      )}
      <Pressable
        onPress={() =>
          setShowInfo({
            position: {top: '-500%', left: '-30%'},
            message: 'Keep it up! 90 XP to Lorem',
          })
        }
        style={[styles.dot, {left: '0%'}]}
      />
      <Text style={{position: 'absolute', left: 0, top: moderateScale(15), fontSize: moderateScale(10)}}>{`Romance \n Rookie`}</Text>
      <Pressable
        onPress={() =>
          setShowInfo({
            position: {top: '-500%', left: '0%'},
            message: 'Keep it up! 90 XP to Lorem',
          })
        }
        style={[
          styles.dot,
          {left: '50%', transform: [{translateX: -5}, {translateY: -5}]},
        ]}
      />
       <Text style={{position: 'absolute', left: '40%',  top: moderateScale(15), fontSize: moderateScale(10)}}>{`Heartfelt\n Adventurer`}</Text>
      <Pressable
        onPress={() =>
          setShowInfo({
            position: {top: '-500%', right: '10%'},
            message: 'Keep it up! 90 XP to Lorem',
          })
        }
        style={[styles.dot, {right: '10%'}]}
      />
       <Text style={{position: 'absolute', right: '5%',  top: moderateScale(15), fontSize: moderateScale(10)}}>{`Passion \nPioneer`}</Text>
      
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
    backgroundColor: code_color.splash,
  },
  dot: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: code_color.yellow,
    borderRadius: 20,
    borderColor: code_color.splash,
    borderWidth: 3,
    top: '10%',
    transform: [{translateY: -5}],
  },
  label: {
    marginLeft: 10,
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

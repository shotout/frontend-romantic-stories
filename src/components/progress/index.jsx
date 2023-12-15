import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';

const ProgressBarWithIndicators = ({ progress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const indicatorPositions = [20, 40, 60, 80, 100];

  const indicators = indicatorPositions.map((position, index) => {
    const indicatorPosition = animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [0, position],
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.progressIndicator,
          { left: `${position}%`, transform: [{ translateX: indicatorPosition }] },
        ]}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progress, { width: `${progress}%` }]} />
        {indicators}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    backgroundColor: '#ddd',
    borderRadius: 15,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  progress: {
    height: '100%',
    backgroundColor: '#5cb85c',
    borderRadius: 15,
    position: 'absolute',
  },
  progressIndicator: {
    position: 'absolute',
    top: -15,
    width: 40,
    height: 40,
    backgroundColor: '#d9534f',
    borderRadius: 15,
    marginLeft: -15,
    zIndex: 2,
  },
});

export default ProgressBarWithIndicators;

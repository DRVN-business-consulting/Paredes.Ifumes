import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const ProgressBar = ({ progress, isDark }) => {
  return (
    <View style={styles.container}>
      <View style={[
        styles.barBackground,
        { backgroundColor: isDark ? '#666' : '#eee' }
      ]}>
        <Animated.View 
          style={[
            styles.barFill,
            { width: `${progress}%`, backgroundColor: isDark ? '#4caf50' : '#3b5998' }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  barBackground: {
    height: 10,
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#3b5998',
    borderRadius: 5,
  },
  progressText: {
    marginTop: 5,
  },
});

export default ProgressBar;

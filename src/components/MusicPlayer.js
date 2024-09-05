import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Switch } from 'react-native';
import ProgressBar from './ProgressBar';
import { useTheme } from '../theme/ThemeContext';

const MusicPlayer = ({ songName, songDuration, onGoBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const opacity = new Animated.Value(1);
  const { theme, toggleTheme, isDark, setBorderColor } = useTheme();

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    Animated.timing(opacity, {
      toValue: isPlaying ? 1 : 0.5,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(() => {
        setProgress(prev => {
          const newProgress = (prev + 100 / (songDuration));
          if (newProgress >= 100) {
            clearInterval(id);
            return 100;
          }
          return newProgress;
        });
      }, 100); // Update every second
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    
    return () => clearInterval(intervalId);
  }, [isPlaying, songDuration]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={[styles.backButton, { backgroundColor: isDark ? '#333' : 'black' }]} onPress={onGoBack}>
        <Text style={[styles.backButtonText, { color: isDark ? '#ccc' : '#fff' }]}>🔙</Text>
      </TouchableOpacity>

      {/* Card with Music Player */}
      <View style={[
        styles.card, 
        { 
          backgroundColor: isDark ? '#444' : '#fff', 
          borderColor: theme.borderColor, 
          borderWidth: 2, 
          marginTop: '50%' 
        }
      ]}>
        <Text style={[styles.songName, { color: isDark ? '#ddd' : '#000' }]}>{songName}</Text>
        <ProgressBar progress={progress} isDark={isDark} />
        <Animated.View style={{ opacity }}>
          <TouchableOpacity 
            style={[styles.playPauseButton, { backgroundColor: isDark ? '#555' : '#3b5998' }]} 
            onPress={togglePlayPause}
          >
            <Text style={[styles.playPauseButtonText, {color: isDark ? '#ddd' : '#fff' }]}>
              {isPlaying ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Switch and Theme Buttons */}
      <View style={[styles.themeContainer, { marginTop: '50%' }]}>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
        <View style={styles.colorButtonsContainer}>
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: 'red' }]}
            onPress={() => setBorderColor('red')}
          />
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: 'blue' }]}
            onPress={() => setBorderColor('blue')}
          />
          <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: 'green' }]}
            onPress={() => setBorderColor('green')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
  },
  backButton: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 20,
  },
  songName: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  playPauseButton: {
    borderRadius: 20,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '10%',
  },
  playPauseButtonText: {
    fontSize: 16,
  },
  themeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
});

export default MusicPlayer;

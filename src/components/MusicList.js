// src/components/MusicList.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Switch, Image } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const songs = [
  { id: '1', title: 'Song 1', image: require('../../assets/icon.png') }, // Add image paths here
  { id: '2', title: 'Song 2', image: require('../../assets/favicon.png') },
];

const MusicList = ({ onSongSelect }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [selectedColor, setSelectedColor] = useState('red'); // Default color is red

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const getBorderColor = (index) => {
    return selectedColor; // Use selectedColor for all items
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Title */}
      <Text style={[styles.titleText, { color: theme.text, marginTop: '10%', marginBottom: '20%' }]}>List of Songs</Text>

      <FlatList
        data={songs}
        renderItem={({ item, index }) => {
          const borderColor = getBorderColor(index);

          return (
            <TouchableOpacity
              style={[styles.item, { borderColor: borderColor, backgroundColor: theme.buttonBackground }]}
              onPress={() => onSongSelect(item)}
            >
              {/* Image */}
              <Image source={item.image} style={styles.image} />

              <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
      />
      <View style={styles.switchContainer}>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
 
      </View>
      <View style={styles.colorButtonsContainer}>
        <TouchableOpacity
          style={[styles.colorButton, { backgroundColor: 'red' }]}
          onPress={() => handleColorChange('red')}
        />
        <TouchableOpacity
          style={[styles.colorButton, { backgroundColor: 'blue' }]}
          onPress={() => handleColorChange('blue')}
        />
        <TouchableOpacity
          style={[styles.colorButton, { backgroundColor: 'green' }]}
          onPress={() => handleColorChange('green')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row', // Align items horizontally
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center', // Center items vertically
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16, // Space between image and text
  },
  title: {
    fontSize: 18,
  },
  switchContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  colorButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
});

export default MusicList;

import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import MusicList from './src/components/MusicList';
import MusicPlayer from './src/components/MusicPlayer';

const App = () => {
  return (
    <ThemeProvider>
      <Main />
    </ThemeProvider>
  );
};

const Main = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const { theme } = useTheme();

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  const handleBack = () => {
    setSelectedSong(null);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={theme.text === '#fff' ? 'light-content' : 'dark-content'} />
      {selectedSong ? (
        <MusicPlayer 
          songName={selectedSong.title}
          songDuration={180} // Replace this with actual duration if available
          onGoBack={handleBack} 
        />
      ) : (
        <MusicList onSongSelect={handleSongSelect} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import HomeScreen from './screen/HomeScreen';

function App(): React.JSX.Element {
  enableScreens();
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}

export default App;

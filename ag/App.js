import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Providers from './src';

const App = () => {
  return (
    <SafeAreaProvider>
      <Providers />
    </SafeAreaProvider>
  );
};

export default App;

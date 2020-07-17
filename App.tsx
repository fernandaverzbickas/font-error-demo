import React, { useState } from 'react';
import { Provider } from 'react-redux'

import { AppLoading } from 'expo';
import * as Font from 'expo-font'
import 'moment/locale/pt-br'
import { View, Text } from 'react-native';
import Icon from './src/components/shared/Icons/Icon';

export default function App() {
  const [isReady, setReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={() => _loadAssets()}
        onFinish={() => setReady(true)}
        onError={e => _handleLoadingError(e)}
      />
    );
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'circularstdbold' }}>Testing Error on Font 1</Text>
      <Text style={{ fontFamily: 'circularstdmedium' }}>Testing Error on Font 2</Text>
      <Text style={{ fontFamily: 'circularstd' }}>Testing Error on Font 3</Text>
      <Icon name="file-invoice-dollar-solid" size={56} color="red" />
    </View>
  );
}
// font loading function
const _loadAssets = async () => {
  await Font.loadAsync({
    'circularstd': require('./assets/fonts/CircularStd-Book.ttf'),
    'circularstdbold': require('./assets/fonts/CircularStd-Bold.ttf'),
    'circularstdmedium': require('./assets/fonts/CircularStd-Medium.ttf'),
    'lineawesome': require('./assets/fonts/line-awesome.ttf')
  });
}

const _handleLoadingError = (error: any) => {
  console.log(error);
};
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'

import store from './src/redux/store/store'
import Router from './src/navigation/Router'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { AppLoading } from 'expo';
import moment from 'moment'
import 'moment/locale/pt-br'

export default function App() {
  const [resourcesLoaded, setResourcesLoaded] = useState(false)

  const loadResources = async () => {
    try {
      await SplashScreen.preventAutoHideAsync()
      await Font.loadAsync({
         'CircularStd': require('./assets/fonts/CircularStd-Book.ttf'),
         'CircularStdBold': require('./assets/fonts/CircularStd-Bold.ttf'),
         'CircularStdMedium': require('./assets/fonts/CircularStd-Medium.ttf'),
         'LineAwesome': require('./assets/fonts/line-awesome.ttf')
      })
      if (Font.isLoaded('CircularStd') && Font.isLoaded('CircularStdBold')  && Font.isLoaded('CircularStdMedium')) {
        setResourcesLoaded(true)
        await SplashScreen.hideAsync()
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadResources()
    moment().locale('pt-br')
  }, [])

  if (!resourcesLoaded) return <AppLoading />
  else {
    return (
      <Provider store={store}>
        <Router></Router>
      </Provider>
    )
  }
}

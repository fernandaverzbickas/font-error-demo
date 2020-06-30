import React, { useEffect, useState } from 'react'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store/store'
import {tokenValidation} from '../redux/actions/token'
import AsyncStorage from '@react-native-community/async-storage';

import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import { AppLoading } from 'expo';
import * as RootNavigation from './RootNavigation'


const Router = () => {
  const tokenIsValid = useSelector((state: RootState) => state.userContent)
  const login = useSelector((state: RootState) => state.login)
  const [checkedToken, setCheckedTokenOnInit] = useState(false)
  const Stack = createStackNavigator()
  const dispatch = useDispatch()
  const [token, setToken] = useState('')


  useEffect(() => {
    getStoreData()
    getTokenValidation()

    const interval = setInterval(() => getTokenValidation(), 60000)
    return () => {
      clearInterval(interval)
    }
  }, [login.token]) 

  useEffect(() => {
    if (tokenIsValid.error) {
      RootNavigation.navigate({name: 'Login', params: {}})
    }
  }, [tokenIsValid])

  const getTokenValidation = async () => {
    await dispatch(tokenValidation())
    setCheckedTokenOnInit(true)
  }

  const getStoreData = async () => {
    try {
      const cachedToken = await AsyncStorage.getItem('@login_token')
      if(cachedToken !== null) {
        setToken(cachedToken)
      }
    } catch(e) {
      console.log(e)
    }
  }
  
  const verifyToken = () => {
    if (token && tokenIsValid.success) return 'Home'
    else return 'Login'
  }

  if (checkedToken) {
    return (
      <NavigationContainer ref={RootNavigation.navigationRef}>
        <Stack.Navigator initialRouteName={verifyToken()}>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return <AppLoading />
  }
}

export default Router
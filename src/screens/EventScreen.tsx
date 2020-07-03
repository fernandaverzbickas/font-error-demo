import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { createStackNavigator, StackNavigationOptions, StackHeaderProps } from '@react-navigation/stack';
import EventsList from '../components/events/list/listOverview'
import { Colors, Typography } from '../styles';

const EventsStack = createStackNavigator()

const Event = () => {
  const headerOptions : StackNavigationOptions = {
    headerShown: true,
    headerTitle: 'Eventos',
    headerTitleStyle: {
      fontFamily: Typography.CircularStd600,
      color: Colors.LIGHT,
      fontSize: 28,
      lineHeight: 35,
      letterSpacing: -0.5,
      top: 13,
    },
    headerTitleAlign: 'left',
    headerStyle: {
      backgroundColor: Colors.BTBLUE,
      height: 127,
      shadowOffset: {width: 0, height: 0}
    },
  }

  return (
    <EventsStack.Navigator initialRouteName="User" mode="modal">
      <EventsStack.Screen name="User" component={EventsList} options={headerOptions}></EventsStack.Screen>  
    </EventsStack.Navigator>
  )
}

const styles = StyleSheet.create({
});

export default Event
import React from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import EventsList from '../components/events/list/listOverview'
import { Colors, Typography } from '../styles';
import EventIndex from '../components/events/details/eventIndex';
import Icon from '../components/shared/Icons/Icon';

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

  const reportHeaderOptions : StackNavigationOptions = {
    headerShown: true,
    headerTitle: 'Relatório Geral',
    headerTitleStyle: {
      fontFamily: Typography.CircularStd500,
      color: Colors.LIGHT,
      fontSize: 14,
      lineHeight: 18,
    },
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.BTBLUE,
      height: 86,
      shadowOffset: {width: 0, height: 0},
      elevation: 0,
    },
    headerBackImage: () => <View style={{marginLeft: Platform.select({ios: true}) ? 16 : 0}}><Icon name="arrow-left-solid" color={Colors.LIGHT} size={24}/></View>
  }

  return (
    <EventsStack.Navigator initialRouteName="EventsList" mode="modal">
      <EventsStack.Screen name="EventsList" component={EventsList} options={headerOptions}></EventsStack.Screen>  
      <EventsStack.Screen name="EventReport" component={EventIndex} options={reportHeaderOptions}></EventsStack.Screen>  
    </EventsStack.Navigator>
  )
}

const styles = StyleSheet.create({
});

export default Event
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
      top: -28
    },
    headerStyle: {
      backgroundColor: Colors.BTBLUE,
      height: 209,
    }
  }

  const mainHeaderComponent = ({scene, previous, navigation} : any) => {
      return (
        <View>
          <Text>Events</Text>
        </View>
      )
    } 



  return (
    <EventsStack.Navigator initialRouteName="User" mode="modal">
      <EventsStack.Screen name="User" component={EventsList} options={headerOptions}></EventsStack.Screen>  
    </EventsStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Event
import React from 'react'
import {StyleSheet} from 'react-native'
import { createBottomTabNavigator,  BottomTabBarOptions } from '@react-navigation/bottom-tabs';
import Event from './EventScreen';
import User from './UserScreen';
import { Colors } from '../styles';
import Icon from '../components/shared/Icons/IconImage'
import Financial from './FinancialScreen';
import Support from './SupportScreen';

const Tab = createBottomTabNavigator()

const barOption : BottomTabBarOptions = {
  showLabel: false,
  keyboardHidesTabBar: false,
  activeTintColor: Colors.ACTIVE,
  inactiveTintColor: Colors.GREY60,
  activeBackgroundColor: Colors.LIGHT,
  inactiveBackgroundColor: Colors.LIGHT,
  labelStyle: {
    fontSize: 24,
    lineHeight: 49
  },
  labelPosition: 'below-icon',
  adaptive: false,
  allowFontScaling: true,
  style: {
    height: 49,
    maxHeight: 49
  }  
}

const Home = () => {
  const screenOptions = ({route, navigation} : any) => {
    let iconName = ''
    switch (route.name) {
      case 'Events':
        iconName = 'eventTabIcon'
        break
      case 'Financial':
        iconName = 'financialTabIcon'
        break
      case 'Support': 
        iconName = 'supportTabIcon'
        break
      case 'User':
        iconName = 'usersTabIcon'
        break
      default:
        break
    }
    return ({
      title: '',
      tabBarIcon: (({color} : any) => (<Icon name={iconName} color={color} size={32} />))
    })
  }

  return (
    <Tab.Navigator tabBarOptions={barOption} backBehavior="history" initialRouteName="Events" screenOptions={(props) => screenOptions(props)}>
      <Tab.Screen name="Events" component={Event}/>
      <Tab.Screen name="Financial" component={Financial}/>
      <Tab.Screen name="Support" component={Support}/>
      <Tab.Screen name="User" component={User}/>
    </Tab.Navigator>
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

export default Home
import React from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Colors, Typography } from '../styles';
import Icon from '../components/shared/Icons/Icon';
import FinancialIndex from '../components/financial/financialIndex';
import FinancialBalance from '../components/financial/financialBalance';
import FinancialOrganizer from '../components/financial/financialOrganizer';

const FinancialStack = createStackNavigator()

const Financial = () => {
  const headerOptions : StackNavigationOptions = {
    headerShown: true,
    headerTitle: 'Financeiro',
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
      shadowOffset: {width: 0, height: 0},
      elevation: 0
    },
  }

  const financialBalanceHeaderOptions : StackNavigationOptions = {
    headerShown: true,
    headerTitle: '',
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
    <FinancialStack.Navigator initialRouteName="FinancialIndex" mode="modal">
      <FinancialStack.Screen name="FinancialIndex" component={FinancialIndex} options={headerOptions}></FinancialStack.Screen>  
      <FinancialStack.Screen name="FinancialOrganizer" component={FinancialOrganizer} options={{headerShown: false}}></FinancialStack.Screen>  
      <FinancialStack.Screen name="FinancialBalance" component={FinancialBalance} options={financialBalanceHeaderOptions}></FinancialStack.Screen>  
    </FinancialStack.Navigator>
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

export default Financial
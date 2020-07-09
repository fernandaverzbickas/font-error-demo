import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Colors, Typography } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from '../shared/Icons/Icon';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { getOrganizerById } from '../../redux/actions/findOrganizerById';
import FinancialBalanceList from './financialBalanceList';

const FinancialIndex = ({navigation, route} : any) => {
  const currentSelectedOrganizer = useSelector((state: RootState) => state.currentSelectedOrganizer)
  const dispatch = useDispatch()

  const selectOrganizer = () => {
    navigation.navigate('FinancialOrganizer')
  }

  useEffect(() => {
    currentOrganizer()
  }, [])

  useEffect(() => {
    currentOrganizer()
  }, [route])

  const currentOrganizer = async () => {
    const organizer = await AsyncStorage.getItem('@current_organizer') || 'Selecione o Organizador'
    dispatch(getOrganizerById(organizer))
  }

  const organizerStatus = () => {
    if (currentSelectedOrganizer.loading) return 'Buscando...'
    else if (currentSelectedOrganizer.success) return currentSelectedOrganizer.currentOrganizer.nome
    else if (currentSelectedOrganizer.error) return currentSelectedOrganizer.error
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerInfo}>
        <TouchableOpacity onPress={selectOrganizer} activeOpacity={1} style={styles.selectOrganizerButton}>
          <Text style={styles.organizer}>{organizerStatus()}</Text>
          <Icon name="angle-down-solid" color={Colors.LIGHT} size={24} />
        </TouchableOpacity>
      </View>
      <FinancialBalanceList navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  headerInfo: {
    backgroundColor: Colors.BTBLUE,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 56,
    paddingLeft: 16
  },
  selectOrganizerButton: {
    height: 40,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  organizer: {
    marginRight: 8,
    fontFamily: Typography.CircularStd500,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.LIGHT
  }
});

export default FinancialIndex
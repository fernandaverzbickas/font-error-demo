import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import { Colors, Typography } from '../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrganizers } from '../../redux/actions/userOrganizers';
import { RootState } from '../../redux/store/store';
import { CircularStd500 } from '../../styles/typography';
import { ButtonLightPrimary } from '../shared/Buttons';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FinancialOrganizer = ({navigation} : any) => {
  const dispatch = useDispatch()
  const userOrganizersList = useSelector((state: RootState) => state.userOrganizers)
  const [currentOrganizer, setCurrentOrganizer] = useState('')

  useEffect(() => {
    getCurrentOrganizer()
    dispatch(getUserOrganizers())
  }, [])

  const getCurrentOrganizer = async () => {
    const organizer = await AsyncStorage.getItem('@current_organizer') || ''
    setCurrentOrganizer(organizer)
  }

  const changeOrganizer = async (organizerId : string | number) => {
    setCurrentOrganizer(organizerId.toString())
    try {
      await AsyncStorage.setItem('@current_organizer', organizerId.toString())
    } catch (e) {
      console.log(e)
    }
  }

  const organizer = (item : any) => {
    return (
      <TouchableOpacity style={currentOrganizer == item.codigo ? styles.selectedOrganizer : null} onPress={() => changeOrganizer(item.codigo)} activeOpacity={1}>
        <Text style={styles.organizerName}>{item.nome}</Text>
      </TouchableOpacity>
      )
  }
 
  const list = () => {
    if (userOrganizersList.loading) return <ActivityIndicator size={32} color={Colors.ACTIVE} />
    else if (userOrganizersList.success) return (
      <View style={styles.listContainer}>
        <FlatList
          data={userOrganizersList.userOrganizers}
          keyExtractor={(item: any) => JSON.stringify(item)}
          renderItem={({item} : any) => organizer(item)}
          style={{marginBottom: 24}}
        />
        <ButtonLightPrimary   
          text="Continuar" 
          color={Colors.ACTIVE}
          height={44}
          onPress={() => navigation.navigate('FinancialIndex', { onSelect: currentOrganizer})}
        />
      </View>
    )
    else if (userOrganizersList.error) return <Text>{userOrganizersList.error}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma Organização...</Text>
      {list()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT,
    paddingVertical: 124
  },
  title: {
    fontFamily: Typography.CircularStd600,
    color: Colors.ACTIVE,
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    marginBottom: 60
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 48
  },
  organizerName: {
    fontFamily: CircularStd500,
    color: Colors.GREY100,
    lineHeight: 64,
    fontSize: 16,
    textAlign: 'center'
  },
  selectedOrganizer: {
    backgroundColor: Colors.BLUE12,
    borderRadius: 100
  }
});

export default FinancialOrganizer
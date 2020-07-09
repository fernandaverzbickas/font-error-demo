import React, { useState, useEffect, lazy } from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import { Colors, Typography } from '../../../styles'
import { LinearGradient } from 'expo-linear-gradient'
import Icon from '../../shared/Icons/Icon'
import moment from 'moment'
import Chip from '../../shared/Chip'
import EventGraph from './eventPresentationGraph'
import { TouchableOpacity } from 'react-native-gesture-handler'


const EventPresentationCard = ({event, navigation}:any) => {
  let imageUrl = event.capa ? event.capa.url : 'https://s3.amazonaws.com/blueticket-cdn/images/imagens/compact/21420.jpg'

  const formatDate = (date : string) => {
    let formattedDate = moment(date, 'YYYY-MM-DD HH:mm:ss').format('dddd, DD/MM/YYYY - HH:mm[h]').replace('-feira', '')
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  }

  let eventCity = event.cidade[0].nome ? `- ${event.cidade[0].nome} - ${event.cidade[0].estado}` : null

  let eventVisibility = () => {
    let visibility = {
      text: '',
      textColor: '',
      backgroundColor: ''
    }
    switch (event.site_visibilidade) {
      case 'N':
        visibility.text = 'Privado'
        visibility.textColor = Colors.ACTIVE
        visibility.backgroundColor = Colors.ACTIVE_TRANSPARENT
        break
      case 'P':
        visibility.text = 'Público'
        visibility.textColor = Colors.SUCCESS
        visibility.backgroundColor = Colors.SUCCESS_TRANSPARENT
      case 'S': 
        visibility.text = 'Restrito'
        visibility.textColor = Colors.ALERT
        visibility.backgroundColor = Colors.ALERT_TRANSPARENT
      case 'O':
        visibility.text = 'Oculto'
        visibility.textColor = Colors.ATTENTION
        visibility.backgroundColor = Colors.ATTENTION_TRANSPARENT
      default:
        break
    }
    return visibility
  }

  const openEventReport = () => {
    navigation.navigate('EventReport', {event})
  }

  return (
    <TouchableOpacity style={styles.listContainer} onPress={openEventReport} activeOpacity={1}>
      <Image 
      style={styles.coverImage}
      borderRadius={4}
       source={{uri: imageUrl}}></Image>
      <LinearGradient colors={['transparent', 'transparent', 'transparent', 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 1)']} style={styles.linearGradient}/>
      <Text style={styles.eventTitle}>{event.nome}</Text>
      <View style={styles.eventInformationContainer}>
        <View style={styles.row}>
          <Icon name="calendar-check" size={16} color={Colors.GREY100}/>
            <Text style={styles.eventInfo}>{formatDate(event.apresentacoes[0].data)}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="map-marker-solid" size={16} color={Colors.GREY100}/>
          <Text style={styles.eventInfo}>{event.local.nome} {eventCity}</Text>
        </View>
        <View style={{...styles.row, marginVertical: 4.5}}>
          <Chip backgroundColor={Colors.SUCCESS_TRANSPARENT} textColor={Colors.SUCCESS} size="small" text={`${event.total_pdvs_vinculados} PDVs`} iconName="circle-fullfiled"/>
          <View style={{minWidth: 10}}></View>
          <Chip backgroundColor={eventVisibility().backgroundColor} textColor={eventVisibility().textColor} size="small" text={eventVisibility().text} iconName="desktop-solid" iconSize={20}/>
        </View>
        <EventGraph eventCode={event.codigo}/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    minHeight: 408,
    backgroundColor: Colors.LIGHT,
    borderColor: Colors.LIGHT,
    shadowColor: Colors.GREY100,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderRadius: 4,
    marginBottom: 16,
    position: 'relative'
  },
  coverImage: {
    width: '100%',
    height: 194,
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: 194,
  },
  eventTitle: {
    fontFamily: Typography.CircularStd500,
    fontSize: 18,
    lineHeight: 23,
    position: 'absolute',
    top: 150,
    paddingHorizontal: 16
  },
  eventInformationContainer: {
    padding: 16
  },
  row: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventInfo: {
    fontFamily: Typography.CircularStd400,
    color: Colors.GREY100,
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 8
  }
});

export default EventPresentationCard
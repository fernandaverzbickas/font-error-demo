import React, { useState, useEffect } from 'react'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import { Colors, Typography } from '../../../styles'
import moment from 'moment'
import Icon from '../../shared/Icons/Icon'
import Chip from '../../shared/Chip'
import EventSummary from './eventSummary'
import EventSalesPerDate from './eventSalesPerDate'
import EventSalesPerProduct from './eventSalesPerProduct'
import { FlatList } from 'react-native-gesture-handler'


const EventIndex = ({navigation, route} :any) => {
  const event = route.params.event
  useEffect(() => {

  }, [])
  let eventCity = event.cidade[0].nome ? `- ${event.cidade[0].nome} - ${event.cidade[0].estado}` : null

  const formatDate = (date : string) => {
    let formattedDate = moment(date, 'YYYY-MM-DD HH:mm:ss').format('dddd, DD/MM/YYYY - HH:mm[h]').replace('-feira', '')
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
  }

  let eventVisibility = () => {
    let visibility = {
      text: '',
      textColor: '',
      backgroundColor: Colors.LIGHT
    }
    switch (event.site_visibilidade) {
      case 'N':
        visibility.text = 'Privado'
        visibility.textColor = Colors.ACTIVE
        break
      case 'P':
        visibility.text = 'Público'
        visibility.textColor = Colors.SUCCESS
      case 'S': 
        visibility.text = 'Restrito'
        visibility.textColor = Colors.ALERT
      case 'O':
        visibility.text = 'Oculto'
        visibility.textColor = Colors.ATTENTION
      default:
        break
    }
    return visibility
  }

  const switchComponents = (index : any) => {
    let component = <View></View>
    switch (index) {
      case 0:
        component =  <Text style={styles.screenTitle}>Relatório Geral</Text>
        break
      case 1:
        component =  <EventSummary eventId={event.codigo}/>
        break
      case 2: 
        component = <EventSalesPerDate eventId={event.codigo} />
        break
      case 3: 
        component =  <EventSalesPerProduct eventId={event.codigo} />
        break
      default:
        break
    }
    return component
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerInfo}>
        <Text style={styles.eventTitle}>{event.nome}</Text>
        <View>
          <View style={styles.row}>
            <Icon name="calendar-check" size={16} color={Colors.LIGHT}/>
              <Text style={styles.eventInfo}>{formatDate(event.apresentacoes[0].data)}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="map-marker-solid" size={16} color={Colors.LIGHT}/>
            <Text style={styles.eventInfo}>{event.local.nome} {eventCity}</Text>
          </View>
          <View style={styles.chipContainer}>
          <Chip backgroundColor={eventVisibility().backgroundColor} textColor={eventVisibility().textColor} size="small" text={eventVisibility().text} iconName="desktop-solid" iconSize={20}/>
          </View>
        </View>
      </View>
      <FlatList 
        data={[0, 1 , 2, 3]} 
        keyExtractor={(item : any) => item} 
        renderItem={(item : any) => switchComponents(item.item)} 
        style={styles.screenContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerInfo: {
    backgroundColor: Colors.BTBLUE,
    padding: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  eventTitle: {
    fontFamily: Typography.CircularStd500,
    fontSize: 18,
    lineHeight: 23,
    color: Colors.LIGHT,
    marginBottom: 18 
  },
  row: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  eventInfo: {
    fontFamily: Typography.CircularStd400,
    color: Colors.LIGHT,
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 8,
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8
  },
  screenTitle: {
    fontFamily: Typography.CircularStd600,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.25,
    color: Colors.BTBLUE,
    marginBottom: 20
  },
  screenContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    flex: 1
  }
});

export default EventIndex
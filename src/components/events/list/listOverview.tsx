import React, { useState, useEffect } from 'react'
import {View, StyleSheet, FlatList, Dimensions, ActivityIndicator} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getEventList } from '../../../redux/actions/eventList'
import { RootState } from '../../../redux/store/store'
import EventPresentationCard from './eventPresentationCard'
import { Colors } from '../../../styles'


const EventsList = ({navigation}:any) => {
  const dispatch = useDispatch()
  const eventsList = useSelector((state: RootState) => state.eventList.list)
  const [refreshing, setRefresing] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setRefresing(true)
    await dispatch(getEventList())
    setRefresing(false)
  }

  let list = !refreshing 
    ? (<FlatList
    style={styles.flatList}
    onRefresh={() => fetchEvents()}
    refreshing={refreshing}
    keyExtractor={(item : any) => item.codigo.toString()}
    data={eventsList}
    renderItem={(item: any) => (<EventPresentationCard event={item.item}/>)}
    />)
    : (<ActivityIndicator color={Colors.BTBLUE} size={64} style={{marginTop: '50%'}}/>)

  return (
    <View style={styles.listContainer}>
      <View style={styles.fakeHeader}></View>
      {list}
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    position: 'relative',
    zIndex: 10000,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: Colors.LIGHTBLUE
  },
  flatList: {
  },
  fakeHeader: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    backgroundColor: Colors.BTBLUE,
    height: 84,
  }
});

export default EventsList
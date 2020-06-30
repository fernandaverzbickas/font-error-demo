import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'

const EventsList = ({navigation}:any) => {
  return (
    <View style={styles.listContainer}>
      <Text>List</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    position: 'absolute',
    top: -74,
    zIndex: 2,
    paddingHorizontal: 16
  }
});

export default EventsList
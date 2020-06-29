import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Event = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Event Screen</Text>
    </View>
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
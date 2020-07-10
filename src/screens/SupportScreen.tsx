import React, { useState } from 'react'
import {View, Text, StyleSheet, ActivityIndicator, Dimensions} from 'react-native'
import { Colors, Typography } from '../styles'
import WebView from 'react-native-webview'

const Support = () => {
  const [loading, setLoading] = useState(true)

  const loadingArea = () => {
    if (loading) return (
      <View style={{...styles.container, position: 'absolute'}}>
        <ActivityIndicator size={64} color={Colors.LIGHT} />
      </View>
    )
    else return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Atendimento</Text>
      <WebView 
        source={{ uri: `https://blueticket.zendesk.com/hc/pt-br`}}
        style={{ marginTop: -100, flex: 1, position: 'relative', width: Dimensions.get('screen').width, opacity: loading ? 0 : 1 }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {loadingArea()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BTBLUE,
  },
  header: {
    color: Colors.LIGHT,
    fontFamily: Typography.CircularStd600,
    fontSize: 28,
    lineHeight: 35,
    marginBottom:24,
    marginTop:76,
    marginLeft: 16,
    width: '100%'
  }
});

export default Support
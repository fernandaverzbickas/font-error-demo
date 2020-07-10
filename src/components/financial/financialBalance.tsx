import React, { useState } from 'react'
import {View, Text, StyleSheet, Dimensions, ActivityIndicator} from 'react-native'
import {WebView} from 'react-native-webview'
import { Colors } from '../../styles'

const FinancialBalance = ({navigation, route} : any) => {
  const [loading, setLoading] = useState(true)

  const loadingArea = () => {
    if (loading) return (
      <View style={{...styles.container, position: 'absolute'}}>
        <ActivityIndicator size={32} color={Colors.ACTIVE} />
      </View>
    )
    else return null
  }

  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: `http://dev.painel.btservers.com.br/external/financial/${route.params.accountId}/${route.params.token}`}}
        style={{ marginTop: -80, flex: 1, position: 'relative', width: Dimensions.get('screen').width, opacity: loading ? 0 : 1 }}
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
  }
});

export default FinancialBalance
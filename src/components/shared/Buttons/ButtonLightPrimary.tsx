// Style Guide: https://www.figma.com/file/vEDlZjApUKk2t54MvMP7Ff/Design-System?node-id=0%3A1


import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { Typography, Colors } from '../../../styles'

export interface Props {
  onPress: (() => void)
  color: string,
  height: number,
  text?: string,
  width?: number,
  disabled?: boolean,
  marginB?: number
}

const ButtonLightPrimary: React.FC<Props> = (props) => {
  const styles = StyleSheet.create({
    buttonComponent: {
      borderRadius: 56,
      backgroundColor: props.color, 
      height: props.height, 
      width: props.width ? props.width : undefined,
      marginBottom: props.marginB || 0
    },
    buttonComponentDisabled: {
      borderRadius: 56,
      backgroundColor: props.color,
      opacity: 0.5, 
      height: props.height, 
      width: props.width ? props.width : undefined,
      marginBottom: props.marginB || 0
    },
    buttonContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonText: {
      fontFamily: Typography.CircularStd500,
      color: Colors.LIGHT,
      fontSize: 14
    },
  })

  return (
      <TouchableOpacity 
        onPress={props.onPress}
        style={props.disabled ? styles.buttonComponentDisabled : styles.buttonComponent}
        activeOpacity={0.7}
        disabled={props.disabled}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
  )
}



export default ButtonLightPrimary
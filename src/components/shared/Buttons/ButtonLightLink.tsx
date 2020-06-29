// Style Guide: https://www.figma.com/file/vEDlZjApUKk2t54MvMP7Ff/Design-System?node-id=0%3A1


import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { Typography, Colors } from '../../../styles'
import Icon from '../Icons/Icon'

export interface Props {
  onPress: (() => void)
  color: string,
  text?: string,
  disabled?: boolean,
  align?: 'auto' | 'center' | 'justify' | 'left' | 'right',
  marginB?: number
  iconName?: string,
  iconSize?: number,
  iconColor?: string 
}

const ButtonLightPrimary: React.FC<Props> = (props) => {
  const styles = StyleSheet.create({
    buttonContainer: {
      marginBottom: props.marginB || 0
    },
    buttonText: {
      fontFamily: Typography.CircularStd500,
      color: props.color,
      fontSize: 14,
      lineHeight: 18,
      textAlign: props.align || 'left'
    },
    buttonTextDisabled: {
      opacity: 0.5
    }
  })

  return (
      <TouchableOpacity 
        onPress={props.onPress}
        activeOpacity={0.5}
        style={styles.buttonContainer}>
          {
            props.iconName 
            ? <Icon name={props.iconName} size={props.iconSize || 24} color={props.iconColor || Colors.BTBLUE} />
            : <Text style={[styles.buttonText, !!props.disabled && styles.buttonTextDisabled]}>{props.text}</Text>
          }
      </TouchableOpacity>
  )
}



export default ButtonLightPrimary
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Typography, Colors } from '../../styles'
import Icon from './Icons/Icon'
import IconImage from './Icons/IconImage'

export interface Props {
  text: string,
  backgroundColor: string,
  textColor: string,
  size: 'x-small' | 'small' | 'medium' | 'large' | 'x-large',
  iconName?: string,
  iconSize?: number
  iconImage?: string
}

const Chip: React.FC<Props> = (props) => {
  const chipSize = () => {
    let style = {
      size: 24,
      fontSize: 16
    }
    switch (props.size) {
      case 'x-small':
        style.size = 16
        style.fontSize = 10
        break
      case 'small':
        style.size = 24
        style.fontSize = 12
        break
      case 'medium':
        style.size = 32
        style.fontSize = 14
        break
      case 'large': 
        style.size = 54
        style.fontSize = 16
        break
      case 'x-large':
        style.size = 66
        style.fontSize = 18
        break    
      default:
        break;
    }
    return style
  }

  let icon = () => {
    return props.iconName === 'circle-fullfiled' 
    ? <View style={styles.dot}></View>
    : <Icon name={props.iconName} color={props.textColor} size={props.iconSize || chipSize().fontSize} />
  }

  const styles = StyleSheet.create({
    chipContainer: {
      backgroundColor: props.backgroundColor || Colors.ACTIVE_TRANSPARENT,
      borderRadius: chipSize().size,
      height: chipSize().size,
      paddingHorizontal: 12,
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    chipText: {
      lineHeight: chipSize().size,
      fontSize: chipSize().fontSize,
      color: props.textColor || Colors.ACTIVE,
      fontFamily: Typography.CircularStd500,
      marginLeft: (props.iconImage || props.iconName) ? 6 : 0
    },
    dot: {
      height: chipSize().fontSize * 0.8,
      width: chipSize().fontSize * 0.8,
      borderRadius: chipSize().fontSize,
      backgroundColor: props.textColor || Colors.ACTIVE,
    }
  })

  return (
    <View style={styles.chipContainer}>
      {(props.iconName || props.iconImage) 
        ? props.iconName 
          ?  icon() 
          : <IconImage name={props.iconImage || ''} color={props.textColor} size={chipSize().fontSize * 0.8} /> 
        : null
      }
      <Text  style={styles.chipText}>{props.text}</Text>
    </View>
  )
}

export default Chip
import React from 'react'
import {Image, StyleSheet, ImageSourcePropType} from 'react-native'

export interface Props {
  name: string,
  size: number,
  color: string
}

const Icon: React.FC<Props> = (props) => {
  const images : any = {
    eventTabIcon: require('../../../../assets/icons/event-tab-bar-icon.png'),
    financialTabIcon: require('../../../../assets/icons/financial-tab-bar-icon.png'),
    supportTabIcon: require('../../../../assets/icons/support-tab-bar-icon.png'),
    usersTabIcon: require('../../../../assets/icons/users-tab-bar-icon.png')
  }

  return (
    <Image
      source={images[props.name]}
      fadeDuration={0}
      onError={(e) => console.log(e)}
      style={{width: props.size, height: props.size, tintColor: props.color}}
    />
  )
}

export default Icon
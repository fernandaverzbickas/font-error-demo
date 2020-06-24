import React, { useState, useEffect } from 'react'
import {Image, StyleSheet} from 'react-native'

export interface Props {
  name: string,
  size: number
}

const Icon: React.FC<Props> = (props) => {
  const [icon, setIcon] = useState('../../../assets/icons/email-outline.svg')

  useEffect(() => {
    switch (props.name) {
      case 'email.outline':
        setIcon('../../../assets/icons/email-outline.svg')
    }
  }, [props.name])
  return (
    <Image
      source={require('../../../assets/icons/email-outline.svg')}
      // fadeDuration={0}
      // style={{width: props.size, height: props.size}}
    />
  )
}

const styles = StyleSheet.create({
  
});

export default Icon
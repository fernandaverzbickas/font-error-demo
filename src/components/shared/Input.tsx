import React from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {Colors, Typography} from '../../styles/index'
import Icon from './Icon'

export interface Props {
  label: string
  firstLetterUpper?: 'none' | 'sentences' | 'words' | 'characters'
  type?: 'none' | 'username' | 'password'
  marginB: number
  onChangeText?: ((text: string) => void)
  prependIcon?: Boolean
  iconName?: string
  iconSize?: number
  iconColor?: string,
  value?: string
}

const Input: React.FC<Props> = (props) => {
  let prependIcon
  if (props.prependIcon) prependIcon = <Icon name={props.iconName} size={props.iconSize} color={props.iconColor}/>
  else prependIcon = null

  return (
    <View style={{...styles.inputContainer, marginBottom: props.marginB}}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput  
        style={styles.input} 
        autoCapitalize={props.firstLetterUpper || 'sentences'}
        textContentType={props.type || 'none'}
        autoCorrect={false}
        onChangeText={props.onChangeText}
        secureTextEntry={props.type === 'password' ? true : false}
        value={props.value}
      />
      {prependIcon}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: 56,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: Colors.GREY40,
    paddingHorizontal: 12
  },
  label: {
    position: "absolute",
    fontSize: 12,
    lineHeight: 16,
    color: Colors.GREY40,
    fontFamily: Typography.CircularStd400,
    top: 10,
    left: 12
  },
  input: {
    position: "relative",
    top: 10,
    lineHeight: 20,
    fontSize: 16,
    flex: 1,
    flexDirection: 'column',
    fontFamily: Typography.CircularStd400,
    color: Colors.GREY100
  },
});

export default Input
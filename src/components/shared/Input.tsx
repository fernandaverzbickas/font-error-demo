import React, {createRef, useState, useEffect} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {Colors, Typography} from '../../styles/index'
import Icon from './Icons/Icon'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
  hint?: string,
  value?: string,
  passwordSwitch?: boolean // if true, don't set type === 'password'
}


const Input: React.FC<Props> = (props) => {
  const inputRef = createRef<TextInput>()
  const [focused, setFocused] = useState(false)
  const [visiblePassword, setVisiblePassword] = useState(false)


  let prependIcon
  if (props.prependIcon) prependIcon = <Icon name={props.iconName} size={props.iconSize} color={focused ? Colors.BTBLUE : props.iconColor}/>
  else prependIcon = null

  let showHint
  if (props.hint && focused) showHint = <Text style={styles.hint}>{props.hint}</Text>
  else showHint = null

  let passwordIconToggle
  if (props.passwordSwitch) passwordIconToggle = (
    <TouchableOpacity activeOpacity={1} onPress={() => setVisiblePassword(!visiblePassword)}>
      <Icon name={visiblePassword ? 'eye' : 'eye-slash'} size={24} color={focused ? Colors.BTBLUE : Colors.GREY60}></Icon>
    </TouchableOpacity>
  )

  const handleFocus = (event : TouchEvent) => {
    setFocused(true)
  }

  const handleBlur = (event : TouchEvent) => {
    setFocused(false)
  }

  return (
    <View style={{marginBottom: props.marginB}}>
      <TouchableOpacity 
        activeOpacity={1} 
        style={focused ? {...styles.inputContainer, ...styles.inputFocused} : styles.inputContainer}
        onPress={() => inputRef.current?.focus()}
        >
        <Text style={focused ? {...styles.label, ...styles.labelFocused} : styles.label}>{props.label}</Text>
        <TextInput
          ref={inputRef}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoCapitalize={props.firstLetterUpper || 'sentences'}
          textContentType={props.type || 'none'}
          autoCorrect={false}
          onChangeText={props.onChangeText}
          secureTextEntry={(props.passwordSwitch && !visiblePassword) || props.type === 'password'}
          value={props.value}
        />
        {prependIcon}
        {passwordIconToggle}
      </TouchableOpacity>
      {showHint}
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
  inputFocused: {
    borderColor: Colors.BTBLUE,
  },
  labelFocused: {
    color: Colors.BTBLUE
  },
  hint: {
    fontFamily: Typography.CircularStd400,
    color: Colors.BTBLUE,
    paddingLeft: 12,
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4
  }
});

export default Input
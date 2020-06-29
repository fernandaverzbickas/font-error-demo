import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import { Colors, Typography } from '../../styles';
import Input from '../shared/Input'
import { ButtonLightPrimary } from '../shared/Buttons';
import {useDispatch, useSelector} from 'react-redux'
import {updatePassword, updatePasswordInitialState} from '../../redux/store/actions/updatePassword'
import { RootState } from '../../redux/store/store'

const ChangePassword = ({navigation}:any) => {
  const dispatch = useDispatch()
  const updatePasswordStatus = useSelector((state: RootState) => state.updatePassword)
  const [password, setNewPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  let errorText = null

  const changePassword = () => {
    dispatch(updatePassword({password, passwordConfirmation}))
  }

  const changePasswordRules = () => {
    if (password && password.length >= 6 && password === passwordConfirmation) return false
    else return true
  }

  useEffect(() => {
    if (updatePasswordStatus.success) {
      navigation.navigate('User')
      Alert.alert(
        'Sucesso!',
        'Sua senha foi alterada.',
        [
          { text: 'OK', onPress: () => dispatch(updatePasswordInitialState())}
        ],
        { cancelable: false }
      )
    } else if (updatePasswordStatus.error) {
      errorText = <Text style={styles.errorMessage}>Ocorreu um erro. Por favor, tente novamente.</Text>
    }
  }, [updatePasswordStatus])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alterar Senha</Text>
      <Text style={styles.subtitle}>Crie uma nova senha para acessar a sua conta Blueticket.</Text>
      <Input 
          label="Nova Senha" 
          onChangeText={(passwrd : string) => setNewPassword(passwrd)} 
          firstLetterUpper="none" 
          passwordSwitch={true}
          hint="Mínimo de 6 caracteres"
          marginB={24}/>
        <Input 
          label="Confirmar Senha"  
          onChangeText={(passwordConfirm : string) => setPasswordConfirmation(passwordConfirm)} 
          firstLetterUpper="none" 
          passwordSwitch={true}
          marginB={24}
          hint={password.length === passwordConfirmation.length ? password !== passwordConfirmation ? 'Senhas diferentes, tente novamente' : '' : ''}/>
        <ButtonLightPrimary text={updatePasswordStatus.loading ? 'Salvando...' : 'Salvar'} color={Colors.BTBLUE} height={44} onPress={changePassword} disabled={changePasswordRules()}/>
        {errorText}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT,
    flex: 1,
    padding: 16
  },
  title: {
    fontFamily: Typography.CircularStd600,
    color: Colors.GREY100,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.25
  },
  subtitle: {
    fontFamily: Typography.CircularStd400,
    color: Colors.GREY80,
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 16
  },
  errorMessage : {
    fontFamily: Typography.CircularStd400,
    color: Colors.ERROR,
    fontSize: 16,
    lineHeight: 20,
    paddingVertical: 16
  },
});

export default ChangePassword
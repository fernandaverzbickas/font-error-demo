import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store/store'
import { loginUser, sendForgotPasswordEmail, forgotPasswordInitialState } from '../redux/store/actions/login'
import {Colors, Typography} from '../styles/index'
import Input from '../components/shared/Input'
import {ButtonLightPrimary, ButtonLightLink} from '../components/shared/Buttons'
import CustomModal from '../components/shared/Modal'
import forgotPasswordStatus from '../redux/store/reducers/forgotPassword'
import Icon from '../components/shared/Icon'


const Login = ({navigation}: any) => {
  const [loginError, setLoginError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sendEmail, setSendEmail] = useState(username)
  const [pressedButton, setPressedButton] = useState(false)
  const [modal, setModal] = useState(false)

  const login = useSelector((state: RootState) => state.login)
  const sendPasswordStatus = useSelector((state: RootState) => state.forgotPassword)

  const dispatch = useDispatch()

  useEffect(() => {
    newPasswordContent()
    if (pressedButton) {
      if (login.token && !login.loading ) {
        setLoginError(login.error)
        navigation.navigate('Home')
      } else if (login.error) {
        setLoginError(login.error)
      }
      setPressedButton(false)
    }
   })

  const getAccess = async () => {
    await dispatch(loginUser({username, password}))
    setPressedButton(true)
  }

  const toggleModal = () => {
    setSendEmail('')
    dispatch(forgotPasswordInitialState())
    setModal(!modal)
  }

  const sendNewPassword = async () => {
    await dispatch(sendForgotPasswordEmail(sendEmail))
  }

  const newPasswordContent = () => {
    if (!sendPasswordStatus.loading && !sendPasswordStatus.success) {
      return (
        <View>
          <Input
            label="Email"
            firstLetterUpper="none"
            onChangeText={(sendEmail : string) => setSendEmail(sendEmail)}
            marginB={0}
            value={sendEmail}
          />
          {
            sendPasswordStatus.error.length 
              ? <Text style={{paddingLeft: 12, color: Colors.ERROR, fontFamily: Typography.CircularStd400, marginTop: 8}}>{sendPasswordStatus.error}</Text>
              : null
          }
        </View>
      )
    } else if (sendPasswordStatus.loading) {
      return (
          <ActivityIndicator size="large" color={Colors.BTBLUE} />
      )
    } else {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="check-circle" color={Colors.BTBLUE} size={72}/>
          <Text style={{color: Colors.BTBLUE, fontFamily: Typography.CircularStd600, fontSize: 20, marginTop: 24}}>Enviado para o seu e-mail!</Text>
          <Text style={{color: Colors.GREY60, fontFamily: Typography.CircularStd400, fontSize: 14, marginTop: 24, textAlign: 'center'}}>
            Siga as instruções enviadas para o e-mail {sendEmail} para criar sua nova senha!
          </Text>
        </View>
      )
    }
  } 

  return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Entre com sua conta</Text>
        <Input 
          label="Email" 
          onChangeText={(email : string) => setUsername(email)} 
          firstLetterUpper="none" 
          type="username"
          prependIcon={true}
          iconName="envelope"
          iconSize={24}
          iconColor={Colors.GREY40}
          marginB={16}/>
        <Input 
          label="Senha"  
          onChangeText={(password : string) => setPassword(password)} 
          firstLetterUpper="none" 
          type="password" 
          prependIcon={true}
          iconName="lock-solid"
          iconSize={24}
          iconColor={Colors.GREY40}
          marginB={24}/>
          <Text style={styles.errorMessage}>{loginError}</Text>
        <ButtonLightPrimary text="Continuar" height={56} color={Colors.BTBLUE} onPress={getAccess} disabled={!password.length || !username.length} marginB={38}/>
        <ButtonLightLink onPress={toggleModal} text="Esqueci minha senha" color={Colors.BTBLUE} align="center"/>
        <CustomModal
         visible={modal}
         title="Esqueci minha senha"
         subtitle="Digite seu e-mail cadastrado para receber uma mensagem de alteração de senha."
         onModalClose={toggleModal}
         confirmAction={sendNewPassword}
         confirmText="Enviar"
         hideAction={sendPasswordStatus.loading || sendPasswordStatus.success}
         hideSubtitle={sendPasswordStatus.loading || sendPasswordStatus.success}
         content={newPasswordContent()}/>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.LIGHT,
    paddingHorizontal: 24,
    paddingTop: '30%'
  },
  welcome: {
    fontSize: 30,
    lineHeight: 38,
    marginBottom: 16,
    fontFamily: Typography.CircularStd600,
    color: Colors.BTBLUE
  },
  errorMessage: {
    fontFamily: Typography.CircularStd400,
    color: Colors.ERROR,
    position: "relative",
    top: -16,
    left: 12
  }
});

export default Login
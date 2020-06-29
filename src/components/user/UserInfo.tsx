import React from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Linking} from 'react-native'
import { Colors, Typography } from '../../styles';
import Icon from '../shared/Icons/Icon';
import {useDispatch} from 'react-redux'
import { logoutUser } from '../../redux/store/actions/login';
import * as RootNavigation from '../../navigation/RootNavigation'

const UserInfo = ({navigation} : any) => {
  const dispatch = useDispatch()

  const listElements = [
    {text: 'Central de Ajuda', iconName: 'question-circle'},
    {text: 'Alterar Senha', iconName: 'user-lock-solid'},
    {text: 'Sair da Conta', iconName: 'sign-out-alt-solid'},
  ]

  const userAction = (listItem : any) => {
    switch (listItem.text) {
      case 'Central de Ajuda':
        Linking.openURL('https://blueticket.zendesk.com/hc/pt-br/categories/360001718293-Sou-Organizador-de-Eventos')
        break
      case 'Sair da Conta':
        dispatch(logoutUser())
        RootNavigation.navigate({name: 'Login', params: {}})
        break
      case 'Alterar Senha':
        navigation.navigate('ChangePassword')
        break
    }
  }

  const list = (item : any) => {
      return (
        <TouchableOpacity style ={styles.listElement} onPress={() => userAction(item.item)}>
          <Icon color={Colors.GREY100} name={item.item.iconName} size={24}></Icon>
          <Text style={styles.actionTitle}>{item.item.text}</Text>
        </TouchableOpacity>
      )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listElements}
        renderItem={(item) => list(item)}
        keyExtractor={(item) => item.iconName}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Colors.LIGHT,
    paddingTop: 87
  },
  listElement: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 16,
    marginBottom: 24
  },
  actionTitle: {
    color: Colors.GREY100,
    marginLeft: 16,
    fontSize: 18,
    fontFamily: Typography.CircularStd400
  }
});

export default UserInfo
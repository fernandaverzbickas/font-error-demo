import React, { useEffect } from 'react'
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native'
import { createStackNavigator, StackNavigationOptions, StackHeaderProps } from '@react-navigation/stack';
import UserInfo from '../components/user/UserInfo';
import ChangePassword from '../components/user/ChangePassword'
import { Colors, Typography } from '../styles';
import {useSelector} from 'react-redux'
import { RootState } from '../redux/store/store'
import Icon from '../components/shared/Icons/Icon'
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserStack = createStackNavigator()


const User = () => {
  const userInfo = useSelector((state: RootState) => state.userContent.userInfo)
  const headerOptions : StackNavigationOptions = {
    headerShown: true,
    headerTitle: '',
    header: (props : StackHeaderProps) => mainHeaderComponent(props),
    headerStyle: {
      backgroundColor: Colors.BTBLUE,
      height: 182
    }
  }

  let loadedInfo = (
    <View style={{...styles.headerCard, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={Colors.BTBLUE} />
    </View>
  )

  const getInitials = (name : string) => {
    let nameArr = name.split(' ')
    let initials = nameArr[0][0] + nameArr[nameArr.length - 1][0]
    return initials.toUpperCase()
  }

  useEffect(() => {
  }, [userInfo])

  const mainHeaderComponent = ({scene, previous, navigation} : any) => {
    if (userInfo && userInfo.user && userInfo.user.nome) {
      loadedInfo = (
        <View style={styles.headerCard}>
        <View style={styles.nameAvatar}>
            <Text style={styles.avatarInitials}>{getInitials(userInfo.user.nome)}</Text>
          </View>
          <View>
            <Text style={styles.username}>{userInfo.user.nome}</Text>
            <Text style={styles.userEmail}>{userInfo.user.email}</Text>  
          </View>
        </View>
      )
    } 

    return (
      <View style={styles.headerContainer}>
        <Text style={{...styles.headerTitle}}>Conta</Text>
        {loadedInfo}
      </View>
    )
  }

  const passwordChangeHeader = ({scene, previous, navigation} : any) => {
    return <TouchableOpacity style={{paddingTop: 44, paddingLeft: 16, backgroundColor: Colors.LIGHT}} onPress={() => navigation.navigate('User')} activeOpacity={1}>
      <Icon name="arrow-left-solid" color={Colors.BTBLUE} size={24}/>
    </TouchableOpacity>
  }

  return (
    <UserStack.Navigator initialRouteName="User" mode="modal">
      <UserStack.Screen name="User" component={UserInfo} options={headerOptions}></UserStack.Screen>
      <UserStack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: true, header: (props : StackHeaderProps) => passwordChangeHeader(props)}}></UserStack.Screen>
    </UserStack.Navigator>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.BTBLUE,
    height: 182,
    paddingTop: 44,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontFamily: Typography.CircularStd600,
    position: 'absolute',
    bottom: 77,
    fontSize: 28,
    left: 24,
    color: Colors.LIGHT
  },
  headerCard: {
    backgroundColor: Colors.LIGHT,
    shadowColor: '#000',
    elevation:18,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    minHeight: 104,
    bottom: -51,
    left: 24,
    width: '100%',
    borderRadius: 8,
    position: "absolute",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 24
  },
  nameAvatar: {
    borderRadius: 56,
    backgroundColor: Colors.BTBLUE,
    height: 56,
    width: 56,
    marginRight: 20
  },
  avatarInitials: {
    fontFamily: Typography.CircularStd600,
    color: Colors.LIGHT,
    fontSize: 18,
    lineHeight: 56,
    textAlign: 'center',
    letterSpacing: 1,
  },
  username: {
    color: Colors.GREY100,
    fontFamily: Typography.CircularStd500,
    fontSize: 20,
    lineHeight: 28
  },
  userEmail: {
    color: Colors.GREY40,
    fontFamily: Typography.CircularStd400,
    fontSize: 14,
    lineHeight: 20
  }
});

export default User
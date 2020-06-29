import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


const api = axios.create({
  baseURL: 'https://soulapi.dev.btservers.com.br/api',
  timeout: 60000
})

const getStorageData = async () => {
  try {
    const cachedToken = await AsyncStorage.getItem('@login_token')
    if(cachedToken !== null) {
      api.defaults.headers.common['Authorization'] = `Bearer ${cachedToken}`
    }
  } catch(e) {
    console.log(e)
  }
}

getStorageData()

api.interceptors.response.use((response: any) => {
  getError(response)
  return response;
}, (error: any) => {
  if (error.response){
    getError(error.response)
    return Promise.reject(error);
  }
});

function getError(response : any) {
  if (response.status === 401) {
    console.log('Erro 401')
  } else if (response.status === 403) {
    response.json().then((data : any) => {
      console.log('Erro 403', data)
    })
  } else if (response.status === 422) {
    response.json().then((data : any) => {
      console.log('Erro 422', data)
    })
  } else if (response.status >= 500 || response.status === 404) {
    console.error(response)
    console.log('Erro, notifique o suporte')
  }
}

export default api
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://soulapi.dev.btservers.com.br/api',
  timeout: 60000
})

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
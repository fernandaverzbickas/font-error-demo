import { 
  EVENT_LIST_REQUEST, 
  EVENT_LIST_SUCCESS, 
  EVENT_LIST_FAILURE,
} from "./types"
import api from '../../api/api'

const eventListRequest = () => {
  return {
    type: EVENT_LIST_REQUEST
  }
}

const eventListSuccess = (list : any) => {
  return {
    type: EVENT_LIST_SUCCESS,
    payload: list
  }
}

const eventListFailed = () => {
  return {
    type: EVENT_LIST_FAILURE
  }
}

export const getEventList = () => {
  return async function (dispatch: any) {
    dispatch(eventListRequest())
    await api.get('panel/event/list', {params: {page: 0}})
      .then((response) => {
        dispatch(eventListSuccess(response.data))
      })
      .catch((error) => {
        dispatch(eventListFailed())
      })
  }
}
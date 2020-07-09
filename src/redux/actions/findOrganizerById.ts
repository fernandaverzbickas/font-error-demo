import { 
  ORGANIZER_BY_ID_REQUEST,
  ORGANIZER_BY_ID_SUCCESS,
  ORGANIZER_BY_ID_FAILURE
} from "./types"

import api from '../../api/api'

const organizerByIdRequest = () => {
  return {
    type: ORGANIZER_BY_ID_REQUEST
  }
}

const organizerByIdSuccess = (organizer : any) => {
  return {
    type: ORGANIZER_BY_ID_SUCCESS,
    payload: organizer
  }
}

const organizerByIdFailed = () => {
  return {
    type: ORGANIZER_BY_ID_FAILURE
  }
}

export const getOrganizerById = (organizerId : number | string) => {
  return async function (dispatch: any) {
    dispatch(organizerByIdRequest())
    await api.get('panel/user/organizers', {params: {organizer_id: organizerId, status: 'A,P'}})
      .then((response) => {
        dispatch(organizerByIdSuccess(response.data[0]))
      })
      .catch((error) => {
        dispatch(organizerByIdFailed())
      })
  }
}
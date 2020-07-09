import { 
  USER_ORGANIZERS_REQUEST,
  USER_ORGANIZERS_SUCCESS,
  USER_ORGANIZERS_FAILURE
} from "./types"

import api from '../../api/api'

const userOrganizersRequest = () => {
  return {
    type: USER_ORGANIZERS_REQUEST
  }
}

const userOrganizersSuccess = (organizer : any) => {
  return {
    type: USER_ORGANIZERS_SUCCESS,
    payload: organizer
  }
}

const userOrganizersFailed = () => {
  return {
    type: USER_ORGANIZERS_FAILURE
  }
}

export const getUserOrganizers = () => {
  return async function (dispatch: any) {
    dispatch(userOrganizersRequest())
    await api.get('panel/user/organizers', {params: {query: '%'}})
      .then((response) => {
        dispatch(userOrganizersSuccess(response.data))
      })
      .catch((error) => {
        dispatch(userOrganizersFailed())
      })
  }
}
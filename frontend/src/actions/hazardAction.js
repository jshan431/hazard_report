import axios from 'axios';
import {
  HAZARD_CREATE_RESET,
  HAZARD_CREATE_REQUEST,
  HAZARD_CREATE_FAIL,
  HAZARD_CREATE_SUCCESS,
  HAZARD_LIST_FAIL,
  HAZARD_LIST_SUCCESS,
  HAZARD_LIST_REQUEST
} from '../constants/hazardConstants';

import { logout } from './userActions';

export const listHazards = () => async (
  dispatch
) => {
  try {
    dispatch({ type: HAZARD_LIST_REQUEST })

    // use & for additional query params 
    const { data } = await axios.get(
      `/api/hazards`
    )

    dispatch({
      type: HAZARD_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: HAZARD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createHazard = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HAZARD_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/hazards`, {}, config)

    dispatch({
      type: HAZARD_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: HAZARD_CREATE_FAIL,
      payload: message,
    })
  }
}

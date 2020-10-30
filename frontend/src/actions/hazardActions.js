import axios from 'axios';
import {
  HAZARD_CREATE_RESET,
  HAZARD_CREATE_REQUEST,
  HAZARD_CREATE_FAIL,
  HAZARD_CREATE_SUCCESS,
  HAZARD_LIST_FAIL,
  HAZARD_LIST_SUCCESS,
  HAZARD_LIST_REQUEST,
  HAZARD_LIST_FOR_USER_REQUEST,
  HAZARD_LIST_FOR_USER_SUCCESS,
  HAZARD_LIST_FOR_USER_FAIL,
  HAZARD_DETAILS_REQUEST,
  HAZARD_DETAILS_SUCCESS,
  HAZARD_DETAILS_FAIL,
  HAZARD_UPDATE_REQUEST,
  HAZARD_UPDATE_SUCCESS,
  HAZARD_UPDATE_FAIL,
  HAZARD_DELETE_REQUEST,
  HAZARD_DELETE_SUCCESS,
  HAZARD_DELETE_FAIL
} from '../constants/hazardConstants';

import { logout } from './userActions';

export const listHazards = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: HAZARD_LIST_REQUEST })

    // use & for additional query params 
    const { data } = await axios.get(
      `/api/hazards?keyword=${keyword}&pageNumber=${pageNumber}`
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

export const listHazardsForUser = () => async (
  dispatch, getState
) => {
  try {
    dispatch({ type: HAZARD_LIST_FOR_USER_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // use & for additional query params 
    const { data } = await axios.get(
      `/api/hazards/user`, config
    )

    dispatch({
      type: HAZARD_LIST_FOR_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: HAZARD_LIST_FOR_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listHazardDetails = (id) => async (dispatch) => {
  
  try {
    dispatch({ type: HAZARD_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/hazards/${id}`);

    dispatch({
      type: HAZARD_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: HAZARD_DETAILS_FAIL,
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

export const updateHazard = (hazard) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HAZARD_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/hazards/${hazard._id}`,
      hazard,
      config
    )

    dispatch({
      type: HAZARD_UPDATE_SUCCESS,
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
      type: HAZARD_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const deleteHazard = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HAZARD_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/hazards/${id}`, config)

    dispatch({
      type: HAZARD_DELETE_SUCCESS,
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
      type: HAZARD_DELETE_FAIL,
      payload: message,
    })
  }
}

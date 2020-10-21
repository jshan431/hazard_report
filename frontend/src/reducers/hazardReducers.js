import {
  HAZARD_CREATE_RESET,
  HAZARD_CREATE_REQUEST,
  HAZARD_CREATE_FAIL,
  HAZARD_CREATE_SUCCESS,
  HAZARD_LIST_FAIL,
  HAZARD_LIST_SUCCESS,
  HAZARD_LIST_REQUEST
} from '../constants/hazardConstants';

export const hazardCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HAZARD_CREATE_REQUEST:
      return { loading: true }
    case HAZARD_CREATE_SUCCESS:
      return { loading: false, success: true, hazard: action.payload }
    case HAZARD_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case HAZARD_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const hazardListReducer = (state = { hazards: [] }, action) => {
  switch (action.type) {
    case HAZARD_LIST_REQUEST:
      return { loading: true, hazards: [] }
    case HAZARD_LIST_SUCCESS:
      return {
        loading: false,
        hazards: action.payload.hazards
      }
    case HAZARD_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
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
  HAZARD_UPDATE_RESET,
  HAZARD_DELETE_REQUEST,
  HAZARD_DELETE_SUCCESS,
  HAZARD_DELETE_FAIL,
  HAZARD_CREATE_REVIEW_REQUEST,
  HAZARD_CREATE_REVIEW_SUCCESS,
  HAZARD_CREATE_REVIEW_FAIL,
  HAZARD_CREATE_REVIEW_RESET
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

export const hazardListReducer = (state = { hazards: [], loading: false }, action) => {
  switch (action.type) {
    case HAZARD_LIST_REQUEST:
      return { loading: true, hazards: [] }
    case HAZARD_LIST_SUCCESS:
      return {
        loading: false,
        hazards: action.payload.hazards,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case HAZARD_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const hazardListForUserReducer = (state = { hazards: [] }, action) => {
  switch (action.type) {
    case HAZARD_LIST_FOR_USER_REQUEST:
      return { loading: true, hazards: [] }
    case HAZARD_LIST_FOR_USER_SUCCESS:
      return {
        loading: false,
        hazards: action.payload.hazards
      }
    case HAZARD_LIST_FOR_USER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const hazardDetailsReducer = (state = { hazard: { reviews: [], user: {hazards: []}}}, action) => {
  switch(action.type) {
    case HAZARD_DETAILS_REQUEST:
      return { 
        loading: true, 
        ...state        // keep the state as it is
      };
    case HAZARD_DETAILS_SUCCESS:
      return { 
        loading: false, 
        hazard: action.payload
      };
    case HAZARD_DETAILS_FAIL:
      return { 
        loading: false, 
        error: action.payload 
      };
    default: 
      return state
  }
}

export const hazardUpdateReducer = (state = { hazard: {} }, action) => {
  switch (action.type) {
    case HAZARD_UPDATE_REQUEST:
      return { loading: true }
    case HAZARD_UPDATE_SUCCESS:
      return { loading: false, success: true, hazard: action.payload }
    case HAZARD_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case HAZARD_UPDATE_RESET:
      return { hazard: {} }
    default:
      return state
  }
}

export const hazardDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case HAZARD_DELETE_REQUEST:
      return { loading: true }
    case HAZARD_DELETE_SUCCESS:
      return { loading: false, success: true }
    case HAZARD_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const hazardReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case HAZARD_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case HAZARD_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case HAZARD_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case HAZARD_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}
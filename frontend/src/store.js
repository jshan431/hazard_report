import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { hazardListReducer, hazardCreateReducer, hazardDetailsReducer, hazardUpdateReducer, hazardDeleteReducer, hazardListForUserReducer } from './reducers/hazardReducers';

import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers';

const reducer = combineReducers({
  hazardList: hazardListReducer,
  hazardListForUser: hazardListForUserReducer,
  hazardCreate: hazardCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateProfile: userUpdateProfileReducer,
  hazardDetails: hazardDetailsReducer,
  hazardUpdate: hazardUpdateReducer,
  hazardDelete: hazardDeleteReducer,
  userUpdate: userUpdateReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const intialState = {
  userLogin: {userInfo: userInfoFromStorage},

};

const middleware = [thunk];

const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
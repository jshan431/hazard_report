import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { hazardListReducer, hazardCreateReducer, hazardDetailsReducer, hazardUpdateReducer } from './reducers/hazardReducers';

import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';

const reducer = combineReducers({
  hazardList: hazardListReducer,
  hazardCreate: hazardCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  hazardDetails: hazardDetailsReducer,
  hazardUpdate: hazardUpdateReducer
});

// Get the cartItems from local storage if it exist. We use JSON parse to turn the stored string value back to an object

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const intialState = {
  userLogin: {userInfo: userInfoFromStorage},

};

const middleware = [thunk];

const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
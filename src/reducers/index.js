import { combineReducers } from 'redux';

import punsReducer from './punsReducer';
import randomPunReducer from './randomPunReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    puns: punsReducer,
    randomPun: randomPunReducer,
    user: userReducer,
    users: usersReducer
});
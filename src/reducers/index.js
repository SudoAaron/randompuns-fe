import { combineReducers } from 'redux';

import punsReducer from './punsReducer';
import randomPunReducer from './randomPunReducer';
import userReducer from './userReducer';

export default combineReducers({
    puns: punsReducer,
    randomPun: randomPunReducer,
    user: userReducer
});
import { combineReducers } from 'redux';

import punsReducer from './punsReducer';
import randomPunReducer from './randomPunReducer';

export default combineReducers({
    puns: punsReducer,
    randomPun: randomPunReducer
});
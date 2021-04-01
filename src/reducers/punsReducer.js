const punsReducer = (state = [], action) => {
    switch(action.type) {
        case 'FETCH_PUNS':
            return action.payload;
        default: 
            return state;
    }
}

export default punsReducer;
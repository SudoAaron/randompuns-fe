const randomPunReducer = (state = {}, action) => {
    switch(action.type) {
        case 'FETCH_RANDOM_PUN':
            return action.payload;
        default: 
            return state;
    }
}

export default randomPunReducer;
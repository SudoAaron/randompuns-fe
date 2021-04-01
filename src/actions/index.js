import randomPuns from '../apis/randomPuns';

export const fetchPuns = () => async (dispatch) => {
    const response = await randomPuns.get('/puns');
    dispatch({ type: 'FETCH_PUNS', payload: response.data });
}

export const fetchRandomPun = () => async (dispatch) => {
    const response = await randomPuns.get('/puns/random');
    dispatch({ type: 'FETCH_RANDOM_PUN', payload: response.data });
}
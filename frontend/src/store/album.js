import { csrfFetch } from './csrf';
const LOAD = 'albums/LOAD'

const load = (albums) => ({
    type: LOAD,
    payload: albums
})

export const getAllAlbums = () => async dispatch => {
    const response = await csrfFetch(`/api/albums`);
    if (response.ok) {
        const albums = await response.json();
        console.log('what do we receive here', albums)
        await dispatch(load(albums));
    }
};

const initialState = {};


const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            action.payload.forEach(album => newState[album.id] = album);
            return newState;
        default:
            return state;
    }
}
export default albumReducer;

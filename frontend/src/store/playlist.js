import { csrfFetch } from './csrf';
const LOAD = 'playlists/LOAD'

const load = (playlists) => ({
    type: LOAD,
    payload: playlists
})

export const getAllPlaylists = () => async dispatch => {
    const response = await csrfFetch(`/api/playlists`);
    if (response.ok) {
        const playlists = await response.json();
        // console.log('what do we receive here',songs)
        await dispatch(load(playlists));
    }
};

const initialState = {};


const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            action.payload.forEach(playlist => newState[playlist.id] = playlist);
            return newState;
        default:
            return state;
    }
}
export default playlistReducer;

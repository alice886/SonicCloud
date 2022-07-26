import { csrfFetch } from './csrf';
const LOAD = 'songs/LOAD'

const load = (songs) => ({
    type: LOAD,
    payload: songs
})

export const getAllSongs = () => async dispatch => {
    const response = await csrfFetch(`/api/songs/all`);
    if (response.ok) {
        const songs = await response.json();
        // console.log('what do we receive here',songs)
        await dispatch(load(songs));
    }
};
export const getMySongs = () => async dispatch => {
    const response = await csrfFetch(`/api/songs/mysongs`);
    if (response.ok) {
        const songs = await response.json();
        // console.log('what do we receive here',songs)
        await dispatch(load(songs));
    }
};

const initialState = {};


const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            action.payload.forEach(song => newState[song.id] = song);
            return newState;
        default:
            return state;
    }
}
export default songReducer;

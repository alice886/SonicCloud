import { csrfFetch } from './csrf';
const LOAD = 'playlists/LOAD';
const LOAD_ONE = 'playlists/LOAD_ONE';
const ADD_ONE = 'playlists/ADD_ONE';
const REMOVE_ONE = 'playlists/REMOVE_ONE';

const load = (playlists) => ({
    type: LOAD,
    payload: playlists
})
const loadOne = (playlist) => ({
    type: LOAD_ONE,
    payload: playlist
})
const removeOne = (id) => ({
    type: REMOVE_ONE,
    payload: id
})


export const getAllPlaylists = () => async dispatch => {
    const response = await csrfFetch(`/api/playlists/`);
    if (response.ok) {
        const playlists = await response.json();
        // console.log('what do we receive here',songs)
        await dispatch(load(playlists));
        // return playlists;
    }
};

export const getMyPlaylists = () => async dispatch => {
    const response = await csrfFetch(`/api/playlists/myplaylists`);
    if (response.ok) {
        const playlists = await response.json();
        console.log('what do we receive here', playlists)
        await dispatch(load(playlists));
        // return playlists;
    }
};

export const getOnePlaylist = (playlistId) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${playlistId}`);
    // console.log('THUNK print song ID', songId)
    if (response.ok) {
        const playlist = await response.json();
        await dispatch(loadOne(playlist));
    }
};

export const deleteOnePlaylist = (playlistId) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/myplaylists`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlistId)
    });
    // console.log('album id --', albumId);
    if (response.ok) {
        const message = await response.json();
        await dispatch(removeOne(playlistId));
        return message;
    }
    console.log('what is the response ---', response.ok)
};

const initialState = {};


const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = {};
            action.payload.forEach(playlist => newState[playlist.id] = playlist);
            return newState;
        }
        case LOAD_ONE: {
            let newState = { ...action.payload }
            return newState;
        }
        case REMOVE_ONE:
            {
                const newState = { ...state };
                delete newState[action.payload];
                return newState;
            }
        default:
            return state;
    }
}
export default playlistReducer;

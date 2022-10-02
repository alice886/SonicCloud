import { csrfFetch } from './csrf';
const LOAD = 'playlists/LOAD';
const LOAD_ONE = 'playlists/LOAD_ONE';
const ADD_ONE = 'playlists/ADD_ONE';
const EDIT_ONE = 'playlists/EDIT_ONE';
const REMOVE_ONE = 'playlists/REMOVE_ONE';

const load = (playlists) => ({
    type: LOAD,
    payload: playlists
})
const loadOne = (playlist) => ({
    type: LOAD_ONE,
    payload: playlist
})
const addNewPlaylist = (playlist) => ({
    type: ADD_ONE,
    payload: playlist
});
const updateOnePlaylist = (playlist) => ({
    type: EDIT_ONE,
    payload: playlist
});
const removeOne = (id) => ({
    type: REMOVE_ONE,
    payload: id
})
const addNewSongto = (song) => ({
    type: ADD_ONE,
    payload: song
});


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

export const createOnePlaylist = (playload) => async dispatch => {
    const response = await csrfFetch(`/api/playlists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playload)
    });
    if (response.ok) {
        const newAlbum = await response.json();
        await dispatch(addNewPlaylist(newAlbum));
        return newAlbum;
    }
};

export const editOnePlaylist = (playlist) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/myplaylists`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlist)
    });
    if (response.ok) {
        const editedPlaylist = await response.json();
        await dispatch(updateOnePlaylist(editedPlaylist));
        return editedPlaylist;
    }
};

export const deleteOnePlaylist = (payload, playListId) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/myplaylists/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const message = await response.json();
        await dispatch(removeOne(playListId));
        return message;
    }
};

export const deleteSonginPlaylist = (playload) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/myplaylists/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playload)
    });
    if (response.ok) {
        const message = await response.json();
        await dispatch(removeOne(playload));
        return message;
    }
    console.log('what is the response ---', response.ok)
};

export const addSongToPlaylist = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/playlists/myplaylists/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const addedSongtoP = await response.json();
        await dispatch(addNewSongto(addedSongtoP));
        return addedSongtoP;
    }
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
        case ADD_ONE:
            {
                const newState = { ...state, ...action.payload }
                return newState;
            }
        case EDIT_ONE:
            {
                const newState = { ...state, [action.payload.id]: action.payload }
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

import { csrfFetch } from './csrf';
const LOAD = 'albums/LOAD';
const ADD_ONE = 'albums/ADD_ONE';
const REMOVE_ONE = 'albums/REMOVE_ONE';

const load = (albums) => ({
    type: LOAD,
    payload: albums
});

const addOneAlbum = (album) => ({
    type: ADD_ONE,
    payload: album
});

const removeOneAlbum = (albumId) => ({
    type: REMOVE_ONE,
    payload: albumId
});

export const getAllAlbums = () => async dispatch => {
    const response = await csrfFetch(`/api/albums`);
    if (response.ok) {
        const albums = await response.json();
        await dispatch(load(albums));
    }
};

export const getMyAlbums = () => async dispatch => {
    const response = await csrfFetch(`/api/albums/myalbums`);
    if (response.ok) {
        const albums = await response.json();
        await dispatch(load(albums));
    }
};

export const getOneAlbum = () => async dispatch => {
    const response = await csrfFetch(`/api/albums/:albumId`);
    if (response.ok) {
        const album = await response.json();
        await dispatch(load(album));
    }
};

export const deleteOneAlbum = (albumId) => async dispatch => {
    const response = await csrfFetch(`/api/albums/myalbums`,{
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(albumId)
    });
    if (response.ok) {
        const message = await response.json();
        await dispatch(removeOneAlbum(albumId));
    }
};

export const addNewAlbum = (album) => async dispatch => {
    const response = await csrfFetch(`/api/albums/myalbums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    });
    if (response.ok) {
        const newAlbum = await response.json();
        await dispatch(addOneAlbum(newAlbum));
        console.log('detail of the new album ---', newAlbum)
    }
};

const initialState = {};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            {
                const newState = {};
                action.payload.forEach(album => newState[album.id] = album);
                return newState
            };
        case ADD_ONE:
            {
                // if(!state[action.album.name]){
                // const newState = {}
                const newState = { ...state, ...action.album }
                // }
                return newState;
            }
        case REMOVE_ONE:
            {
                const newState = { ...state };
                delete newState[action.albumId];
                return newState;
            }
        default:
            return state;
    }
}
export default albumReducer;

import { csrfFetch } from './csrf';
const LOAD = 'albums/LOAD';
const LOAD_ONE = 'albums/LOAD_ONE';
const ADD_ONE = 'albums/ADD_ONE';
const REMOVE_ONE = 'albums/REMOVE_ONE';
const EDIT_ONE = 'albums/EDIT_ONE';

const load = (albums) => ({
    type: LOAD,
    payload: albums
});

const addOneAlbum = (album) => ({
    type: ADD_ONE,
    payload: album
});

const loadOneAlbum = (album) => ({
    type: LOAD_ONE,
    payload: album
});

const updateOneAlbum = (album) => ({
    type: EDIT_ONE,
    payload: album
});

const removeOneAlbum = (id) => ({
    type: REMOVE_ONE,
    payload:id
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
    else return null;
};

export const getOneAlbum = (albumId) => async dispatch => {
    const response = await csrfFetch(`/api/albums/${albumId}`);
    // console.log('THUNK print albuM ID', albumId)
    if (response.ok) {
        const album = await response.json();
        await dispatch(loadOneAlbum(album));
    }
};

export const editOneAlbum = (album) => async dispatch => {
    const response = await csrfFetch(`/api/albums/myalbums`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album)
    });
    if (response.ok) {
        const editedAlbum = await response.json();
        await dispatch(updateOneAlbum(editedAlbum));
    }
};
export const deleteOneAlbum = (albumId) => async dispatch => {
    const response = await csrfFetch(`/api/albums/myalbums`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(albumId)
    });
    // console.log('album id --', albumId);
    if (response.ok) {
        const message = await response.json();
        await dispatch(removeOneAlbum(albumId));
        return message;
    }
    console.log('what is the response ---',response.ok)
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
        case LOAD_ONE:
            {
                let newState = { ...action.payload }
                return newState;
            }
        case ADD_ONE:
            {
                // if(!state[action.album.name]){
                // const newState = {}
                // }
                const newState = { ...state, ...action.payload }
                return newState;
            }
        case EDIT_ONE:
            {
                // const newState = { ...state }
                // newState[action.payload.id] = action.payload;
                // return newState;
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
export default albumReducer;

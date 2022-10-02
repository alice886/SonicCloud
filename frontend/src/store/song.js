import { csrfFetch } from './csrf';
const LOAD = 'songs/LOAD';
const LOAD_ONE = 'songs/LOAD_ONE';
const ADD_ONE = 'songs/ADD_ONE';
const REMOVE_ONE = 'songs/REMOVE_ONE';
const EDIT_ONE = 'songs/EDIT_ONE';

const load = (songs) => ({
    type: LOAD,
    payload: songs
})

const addOneSong = (song) => ({
    type: ADD_ONE,
    payload: song
});

const loadOneSong = (song) => ({
    type: LOAD_ONE,
    payload: song
});

const updateOneSong = (song) => ({
    type: EDIT_ONE,
    payload: song
});

const removeOneSong = (id) => ({
    type: REMOVE_ONE,
    payload: id
});

export const getAllSongs = () => async dispatch => {
    const response = await csrfFetch(`/api/songs/all`);
    if (response.ok) {
        const songs = await response.json();
        // console.log('what do we receive here',songs)
        await dispatch(load(songs));
    }
};
export const getMySongs = () => async dispatch => {
    const response = await csrfFetch(`/api/songs/mysongs/`);
    if (response.ok) {
        const songs = await response.json();
        // console.log('what do we receive here',songs)
        await dispatch(load(songs));
    }
};

export const getOneSong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`);
    // console.log('THUNK print song ID', songId)
    if (response.ok) {
        const song = await response.json();
        await dispatch(loadOneSong(song));
    }
};

export const editOneSong = (song) => async dispatch => {
    const response = await csrfFetch(`/api/songs/mysongs`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song)
    });

    console.log('response should be false', response);
    if (response.ok) {
        const editedSong = await response.json();
        await dispatch(updateOneSong(editedSong));
        return editedSong;
    }
};

export const deleteOneSong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/mysongs/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(songId)
    });
    if (response.ok) {
        const message = await response.json();
        await dispatch(removeOneSong(songId));
        return message;
    }
};

export const addNewSong = (song) => async dispatch => {
    const { albumId, title, description, url, previewImage} = song;
    const formData = new FormData();
    formData.append("albumId",albumId);
    formData.append("title",title);
    formData.append("description",description);
    formData.append("previewImage",previewImage);
    if(url) formData.append("url",url);

    const response = await csrfFetch(`/api/songs/mysongs/`, {
        method: "POST",
        headers: {  "Content-Type": "multipart/form-data" },
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(song)
        body: formData,
    });
    // if (response.ok) {
        const newSong = await response.json();
        await dispatch(addOneSong(newSong));
        // console.log('what is the newSong', newSong)
        return newSong;
    // }

};

const initialState = {};


const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            action.payload.forEach(song => newState[song.id] = song);
            return newState;
        case LOAD_ONE:
            {
                let newState = { ...action.payload }
                return newState;
            }
        case ADD_ONE:
            {
                // if(!state[action.song.name]){
                // const newState = {}
                // }
                const newState = { ...state, [action.payload.id]: action.payload }
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
export default songReducer;

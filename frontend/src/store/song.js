
const LOAD = 'songs/LOAD'

const load = (songs) => ({
    type: LOAD,
    payload: songs
})

export const getAllSongs = () => async dispatch => {
    const response = await fetch(`/api/songs/all`);
    console.log('allsongs ---', response);
    if (response.ok) {
        const songs = await response.json();
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

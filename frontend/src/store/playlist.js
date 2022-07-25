const LOAD = 'playlists/LOAD'

// const load = (list) => ({
//     type: load,
//     list
// })

// export const getUserDetail = () => async dispatch {
//     const res = await fetch(`/api`)
// if (res.ok) {
//     const list = await res.json();
//     dispatch(load(list))
// }
// }

const initialState = {};

const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const currentUserDetail = {}
            return currentUserDetail;
        default:
            return state;
    }
}
export default playlistReducer;

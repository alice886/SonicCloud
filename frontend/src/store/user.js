

const LOAD = 'users/LOAD'

const load = (list) => ({
    type: LOAD,
    list
})

export const getUserDetail = (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}`);

    if (response.ok) {
        const list = await response.json();
        dispatch(load(list));
    }
};

const initialState = {};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const currentUserDetail = {1:'what'}
            return currentUserDetail;
        default:
            return state;
    }
}
export default userReducer;

import { csrfFetch } from './csrf';
const LOAD = 'comments/LOAD'
const ADD_ONE = 'comments/ADD_ONE'
const EDIT_ONE = 'comments/EDIT_ONE'
const REMOVE = 'comments/REMOVE'

const loadComments = (comments) => ({
    type: LOAD,
    payload: comments
});
const addOneComment = (comment) => ({
    type: ADD_ONE,
    payload: comment
});

const editOneComment = (comment) => ({
    type: EDIT_ONE,
    payload: comment
});

const deleteOneComment = (commentId) => ({
    type: REMOVE,
    payload: commentId
});

export const getSongComments = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`);
    if (response.ok) {
        const comments = await response.json();
        await dispatch(loadComments(comments));
        return comments;
    }
};

export const getMyComments = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/mycomments`);
    if (response.ok) {
        const mycomments = await response.json();
        await dispatch(loadComments(mycomments));
        return mycomments;
    }
};

export const addComment = (songId, comment) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const newComment = await response.json();
        await dispatch(addOneComment(newComment));
        // return newComment;
    }
};

export const editComment = (comment) => async dispatch => {
    const response = await csrfFetch(`/api/comments/mycomments`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const editedComment = await response.json();
        await dispatch(editOneComment(editedComment));
        return editedComment;
    }
};

export const deleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/mycomments`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentId)
    });
    if (response.ok) {
        const message = await response.json();
        await dispatch(deleteOneComment(commentId));
        return message;
    }
    
};



const initialState = {};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            action.payload.forEach(comment => newState[comment.id] = comment);
            return newState;
        default:
            return state;
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
        case REMOVE:
            {
                const newState = { ...state };
                delete newState[action.payload];
                return newState;
            }
    }
}
export default commentReducer;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addComment, getSongComments, editComment, deleteComment } from "../../store/comment";

function SongComments({ songId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const comments = useSelector(state => Object.values(state.comment));
    const sessionUser = useSelector(state => state.session.user);
    const [inputComment, setInputComment] = useState();
    const [showEditText, setShowEditText] = useState(true);
    const [editComment, setEditComment] = useState();
    const [commentSelected, setCommentSelected] = useState();
    const [confrimDelete, setConfirmDelete] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getSongComments(songId))
    }, [dispatch, history, confrimDelete, comments?.length])

    const d = new Date();
    // const egtime = new Date('2022-09-28T04:57:41.000Z');

    const calTime = (time) => {
        const dateTime = new Date(time);
        const diff = (d - dateTime) / (1000 * 60);
        if (diff >= 60 * 24 * 30 * 12) {
            return Math.trunc(diff / (60 * 24 * 30 * 12)) + ' year(s) ago';
        }
        if (diff >= 60 * 24 * 30) {
            return Math.trunc(diff / (60 * 24 * 30)) + ' month(s) ago';
        }
        else if (diff >= 60 * 24) {
            return Math.trunc(diff / (60 * 24)) + ' day(s) ago';
        }
        else if (diff >= 60) {
            return Math.trunc(diff / (60)) + ' hour(s) ago';
        }
        else {
            return Math.trunc(diff) + ' minute(s) ago';
        }
    }

    const handlePostComment = async e => {
        e.preventDefault();
        const payload = {
            songId,
            userId: sessionUser.id,
            body: inputComment
        }

        setErrors([]);
        dispatch(addComment(songId, payload))
            .then((res) => {
                setInputComment('');
                history.push(`/songs/${songId}`);
            })
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors)
                    };
                }
            );

    }

    const getHrMi = timeString => {
        let converted = new Date(timeString);
        let hr = ('0' + converted.getHours()).slice(-2);
        let min = ('0' + converted.getMinutes()).slice(-2);
        return hr + ":" + min;
    }

    const handleEditExpand = async e => {
        e.preventDefault();
        showEditText ? setShowEditText(false) : setShowEditText(true);
        setEditComment(e.target.value);
    }

    const handleEditComment = async e => {
        e.preventDefault();
        const payload = {
            id: e.target.value,
            body: editComment,
        }

        setErrors([]);
        dispatch(addComment(payload))
            .then((res) => {
                history.push(`/songs/${songId}`);
            })
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors)
                    };
                }
            );

    }

    // const testtime = new Date("2022-09-28T18:59:33.464Z")
    // console.log('just posted as ---- ', testtime.getHours())
    // console.log('just posted as ---- ', testtime.getMinutes())
    const handleDeleteConfirm = async e => {
        e.preventDefault();
        confrimDelete ? setConfirmDelete(false) : setConfirmDelete(true);
        setCommentSelected(e.target.value);
    }

    const handleDeleteComment = async (e, id) => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            id: id
        }
        dispatch(deleteComment(payload))
            .then((res) => {
                setConfirmDelete(false);
                history.push(`/songs/${songId}`);
            })
            .catch(
                async (res) => {
                    const data = await res.json();
                    console.log(data)
                    if (data && data.errors) {
                        setErrors(data.errors)
                    };
                }
            );

    }

    return comments && (
        <div>
            <form>
                <ul>
                    {errors.map((error, idx) => {
                        if (error !== 'Invalid value') {
                            return <li key={idx}>{error}</li>
                        }
                    }
                    )}
                </ul>
                <input
                    type="text"
                    placeholder="Write a comment"
                    min="1"
                    required
                    value={inputComment}
                    onChange={e => setInputComment(e.target.value)} />
                <button onClick={handlePostComment}>Post</button>
            </form>
            <div>{comments.length} comment(s)</div>

            {comments && comments.map(comment => {
                if (comment?.User?.id === sessionUser?.id) {
                    return <div key={comment.id} >
                        <div>
                            You at {getHrMi(comment?.updatedAt)}
                        </div>
                        <div>
                            {calTime(comment?.updatedAt)}
                        </div>
                        {!showEditText && <div>
                            {comment?.body}
                        </div>}
                        <button value={comment?.id} onClick={handleEditComment}>✏️</button>
                        <button value={comment?.id} onClick={handleDeleteConfirm}>🗑️</button>
                        {confrimDelete && (commentSelected == comment?.id) && <div className="delete-confirm-bubble" > Do you really want to remove this comment?
                            <button onClick={() => setConfirmDelete(false)}>Cancel</button>
                            <button onClick={e => handleDeleteComment(e, comment?.id)} >Yes</button>
                        </div>}
                    </div>
                }

            })}
            {comments && comments.map(comment => {
                if (comment?.User?.id !== sessionUser?.id) {
                    return <div key={comment?.id}>
                        <div>
                            {comment?.User?.username} at {getHrMi(comment?.updatedAt)}
                        </div>
                        <div>
                            {calTime(comment?.updatedAt)}
                        </div>
                        <div>
                            {comment?.body}
                        </div>
                    </div>
                }

            })}
        </div>
    )
}


export default SongComments;

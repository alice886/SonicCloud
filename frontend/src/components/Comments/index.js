import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addComment, getSongComments, editMyComment, deleteComment } from "../../store/comment";
import '../../css-package/comment.css'

function SongComments({ songId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const comments = useSelector(state => Object.values(state.comment));
    const sessionUser = useSelector(state => state.session.user);
    const [commentLoaded, setCommentLoaded] = useState(false)
    const [inputComment, setInputComment] = useState();
    const [showEditText, setShowEditText] = useState(true);
    const [editComment, setEditComment] = useState();
    const [commentSelected, setCommentSelected] = useState();
    const [confrimDelete, setConfirmDelete] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        dispatch(getSongComments(songId)).then(() => setCommentLoaded(true))
    }, [dispatch, history, confrimDelete, showEditText, commentLoaded, comments?.length])

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

    const newErrors = [];
    useEffect(() => {
        if (inputComment?.length === 0) {
            newErrors.push('Please enter your commment')
        }
        setErrors(newErrors)
        if (!errors.length) setIsDisabled(false);
        else setIsDisabled(true)
    }, [errors.length, newErrors.length, inputComment])

    console.log('what is the length of errors', errors.length)

    const handlePostComment = async e => {
        e.preventDefault();
        const payload = {
            songId,
            userId: sessionUser.id,
            body: inputComment
        }

        if (!inputComment) {
            window.alert('please enter your comment!')
            history.push(`/songs/${songId}`);
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
        setCommentSelected(e.target.value);
    }

    const handleEditComment = async (e, id) => {
        e.preventDefault();
        setCommentLoaded(false);
        const payload = {
            id: id,
            body: editComment,
        }
        setErrors([]);
        dispatch(editMyComment(payload))
            .then((res) => {
                setShowEditText(false);
                setEditComment();
                setCommentSelected();
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
                setCommentSelected();
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


    return (
        <div className="comment-container">
            <form className="comment-top-box">
                <input
                    type="text"
                    placeholder="Write a comment"
                    min="1"
                    required
                    value={inputComment}
                    onChange={e => setInputComment(e.target.value)} />
                <button onClick={handlePostComment} disabled={isDisabled}>Post</button>
                {/* <ul>
                    {errors.map((error, idx) => {
                        if (error !== 'Invalid value') {
                            return <li key={idx}>{error}</li>
                        }
                    }
                    )}
                </ul> */}
            </form>
            <div className="comment-count">{comments.length} comment(s)</div>

            {comments && comments.map(comment => {
                if (comment?.User?.id === sessionUser?.id) {
                    return <div key={comment?.id} className='each-comment'>
                        <div className="each-comment-top">
                            <div className="at-box">
                                You at {getHrMi(comment?.updatedAt)}
                            </div>
                            <div className="ago-box">
                                {calTime(comment?.updatedAt)}
                            </div>
                        </div>
                        <div className="each-comment-buttom">
                            <div className="comment-body-box">{comment?.body}</div>
                            <div className="edit-delete-box">
                                <button value={comment?.id} onClick={handleEditExpand}>✏️</button>
                                <button value={comment?.id} onClick={handleDeleteConfirm}>🗑️</button>

                                {confrimDelete && (commentSelected == comment?.id) && <div className="delete-confirm-bubble" > Do you really want to remove this comment?
                                    <button onClick={() => setConfirmDelete(false)}>Cancel</button>
                                    <button onClick={e => handleDeleteComment(e, comment?.id)} >Yes</button>
                                </div>}
                                {showEditText ? (<div></div>)
                                    : (commentSelected == comment?.id) && (<div>
                                        <input
                                            type="text"
                                            min="1"
                                            placeholder='update comment here'
                                            value={editComment}
                                            onChange={e => setEditComment(e.target.value)} />
                                        <button onClick={() => { setShowEditText(true); setEditComment(); }}>Cancel Edit</button>
                                        <button onClick={e => handleEditComment(e, comment?.id)}>Update</button>
                                    </div>
                                    )}
                            </div>
                        </div>
                    </div>
                }

            })}
            {comments && comments.map(comment => {
                if (comment?.User?.id !== sessionUser?.id) {
                    return <div key={comment?.id} className='each-comment'>
                        <div className="each-comment-top">
                            <div className="at-box">
                                {comment?.User?.username} at {getHrMi(comment?.updatedAt)}
                            </div>
                            <div className="ago-box">
                                {calTime(comment?.updatedAt)}
                            </div>
                        </div>
                        <div className="comment-body-box">
                            {comment?.body}
                        </div>
                    </div>
                }

            })}
        </div>
    )
}


export default SongComments;

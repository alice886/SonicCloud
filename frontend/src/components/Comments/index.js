import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment, getSongComments } from "../../store/comment";

function SongComments({ songId }) {
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state.comment));
    const sessionUser = useSelector(state => state.session.user);
    const [inputComment, setInputComment] = useState();

    useEffect(() => {
        dispatch(getSongComments(songId))
    }, [dispatch])

    const d = new Date();
    const egtime = new Date('2022-09-28T04:57:41.000Z');

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
        dispatch(addComment(payload));
        // if (hello){
        // }

    }

    return (
        <div>
            <form>
                {/* <ul>
                    {errors.map((error, idx) => {
                        if (error !== 'Invalid value') {
                            return <li key={idx}>{error}</li>
                        }
                    }
                    )}
                </ul> */}
                <input
                    type="text"
                    placeholder="Write a comment"
                    min="1"
                    required
                    value={inputComment}
                    onChange={e => setInputComment(e.target.value)} />
                <button onClick={handlePostComment}>Post</button>
            </form>

            {comments && comments.map(comment => {
                return <div key={comment.id}>
                    <div>
                        {comment.User.username} at {(comment.updatedAt.slice(11, 16))}
                    </div>
                    <div>
                        {calTime(comment.updatedAt)}
                    </div>
                    <div>
                        {comment.body}
                    </div>

                </div>
            })}
        </div>
    )
}


export default SongComments;

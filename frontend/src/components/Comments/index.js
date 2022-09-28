import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSongComments } from "../../store/comment";

function SongComments({ songId }) {
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state.comment))

    useEffect(() => {
        dispatch(getSongComments(songId))
    }, [dispatch])

    console.log('songid is ----', songId)
    console.log('comments is ----', comments)

    return (
        <div>
            

            {comments && comments.map(comment => {
                return <div key={comment.id}>
                    <div>
                        {comment.User.username}
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

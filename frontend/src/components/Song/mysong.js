import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory, Redirect } from "react-router-dom";
import { editOneSong, getMySongs } from '../../store/song'
import CreateSongModal from '../SongFormModal/index';

function MySongs() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loadMySongs, setLoadMySongs] = useState(false)
    const [hideEditform, setHideEditForm] = useState(false)

    const sessionUser = useSelector(state => state.session.user);

    const allmysongs = useSelector(state => Object.values(state.song))

    useEffect(() => {
        dispatch(getMySongs()).then(() => setLoadMySongs(true))
    }, [dispatch, allmysongs?.length])

    // const handleEdit = async e => {
    //     e.preventDefault();
    //     const payload = null;

    //     let editSong = await dispatch(editOneSong(payload));
    //     if (editSong) {
    //         history.push(`/songs/mysongs`);
    //     }
    // }


    if (!sessionUser) {
        history.push('/');
    }

    return loadMySongs && (
        <div className="mysongs-container">
            <div className="mysongs-left">
                {sessionUser && <CreateSongModal />}
                <div>You have {allmysongs?.length} songs</div>
            </div>
            <div className="mysongs-right">
                {allmysongs && allmysongs.map((song) => {
                    if (song?.userId === sessionUser?.id) {
                        return <div className="mysongs-each" key={song.id}>
                            <NavLink to={`/songs/${song.id}`}>
                                <img src={song.previewImage} width='150' ></img>
                                <div>{song.title}</div>
                            </NavLink>


                        </div>
                    }
                })}

            </div>
        </div>
    )
}

export default MySongs;

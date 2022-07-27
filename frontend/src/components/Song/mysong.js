import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { editOneSong, getMySongs } from '../../store/song'
import CreateSongForm from './CreateSongForm';

function MySongs() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [hideEditform, setHideEditForm] = useState('false')


    const allmysongs = useSelector(state => Object.values(state.song))
    // console.log('mysongs ---1.1---', allmysongs)

    useEffect(() => {
        dispatch(getMySongs())
    }, [dispatch])

    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)

    const handleEdit = async e => {
        e.preventDefault();
        const payload = null;

        let editSong = await dispatch(editOneSong(payload));
        if (editSong) {
            history.push(`/songs/mysongs`);
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
    }

    return (
        <div className="song-container"> ...... my songs on SonicCloud ......
            <button onClick={() => setHideEditForm(!hideEditform)}>upload new song</button>
            <ul>
                {allmysongs && allmysongs.map((song) => {
                    return <div className="eachsong" key={song.id}>
                        <i>🎼</i>
                            <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                    </div>
                })}
                {/* <Route path="/albums">
                <CreateNewSong />
                </Route> */}
            </ul>
            <CreateSongForm hidden={hideEditform} />
        </div>
    )
}

export default MySongs;

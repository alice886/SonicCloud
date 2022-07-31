import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { editOneSong, getMySongs } from '../../store/song'
import CreateSongModal from '../SongFormModal/index';

function MySongs() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [hideEditform, setHideEditForm] = useState(false)


    const allmysongs = useSelector(state => Object.values(state.song))

    useEffect(() => {
        dispatch(getMySongs())
    }, [dispatch])

    // const handleEdit = async e => {
    //     e.preventDefault();
    //     const payload = null;

    //     let editSong = await dispatch(editOneSong(payload));
    //     if (editSong) {
    //         history.push(`/songs/mysongs`);
    //     }
    // }

    return (
        <div className="my-song-container">
            <CreateSongModal />
            <ul>
                {allmysongs && allmysongs.map((song) => {
                    return <div className="eachsong" key={song.id}>
                        {/* <i>🎼</i> */}
                        <img src={song.previewImage} width='150' ></img>
                        <br></br>
                        <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                    </div>
                })}
            </ul>

        </div>
    )
}

export default MySongs;

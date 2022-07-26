import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getMySongs } from '../../store/song'

function MySongs() {
    const dispatch = useDispatch();

    // const path = window.location.href;
    // const urlending = path.split("/").reverse()[0];

    useEffect(() => {
        dispatch(getMySongs())
    }, [dispatch])

    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)

    const allmysongs = useSelector(state => Object.values(state.song))
    console.log('mysongs ---1.1---', allmysongs)

    return (
        <div className="song-container"> ...... my songs on SonicCloud ......
            <ul>
                {allmysongs && allmysongs.map((song) => {
                    return <li className="eachsong" key={song.id}>
                        <li key={song.id}>
                            <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink></li>
                    </li>
                })}
                 {/* <Route path="/albums">
                <CreateNewSong />
                </Route> */}
            </ul>
        </div>
    )
}

export default MySongs;

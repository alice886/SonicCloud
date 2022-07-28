import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getAllSongs } from '../../store/song'

function AllSongs() {
    const dispatch = useDispatch();

    // const path = window.location.href;
    // const urlending = path.split("/").reverse()[0];

    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)

    const allsongs = useSelector(state => Object.values(state.song))
    // console.log('allsongs ---1.1---', typeof mysongs)

    return (
        <div className="song-container"> ...... all songs on SonicCloud ......
            <ul>
                {allsongs && allsongs.map((song) => {
                    return <div className="eachsong" key={song.id}>
                        <img src={song.previewImage} width='150' ></img>
                        <br></br>
                        song name:
                        <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                        <br></br>
                        <p>album: {song.albumId}</p>
                    </div>
                })}

            </ul>
        </div>
    )
}

export default AllSongs;

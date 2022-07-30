import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getAllSongs } from '../../store/song'
import '../../css-package/forms.css'

function AllSongs() {
    const dispatch = useDispatch();
    const allsongs = useSelector(state => Object.values(state.song))
    const sessionUser = useSelector(state => state.session.user);
    // console.log('allsongs ---1.1---', typeof mysongs)
    // const path = window.location.href;
    // const urlending = path.split("/").reverse()[0];
    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)
    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    // if (!sessionUser) {
    //     return (
    //         <div className='notLoggedIn'>
    //             <h3>Please log in to browse all songs</h3>
    //         </div>
    //     )
    // }

    return (
        <div className="song-container">
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

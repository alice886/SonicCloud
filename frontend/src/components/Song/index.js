import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getAllSongs } from '../../store/song'

function AllSongs() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    const allsongs = useSelector(state => state.song)
    // console.log('allsongs!!!', allsongs.id[1])

    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)

    return (
        <>
            <div className="song-container">
                {/* {allsongs.forEach((song) => {
                    <NavLink key={song.id} to={`/songs/${song.id}`}>${song.title}</NavLink>
                })} */}
                {/* {for(const song in allsongs){ */}

                }}
            </div>
            <button key={'song-button'}>Im a button</button>
        </>
    )
}

export default AllSongs;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getAllSongs } from '../../store/song'

function AllSongs() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)

    const allsongs = useSelector(state => Object.values(state.song))
    // const allsongs2 = useSelector(state => state.song)
    // allsongs.forEach(song => songArray.push(song))
    console.log('allsongs ---1.1---', typeof allsongs)


    return (
        <div className="song-container"> ...... all songs on SonicCloud ...... 
            <ul>
                {allsongs && allsongs.map((song) => {
                    return <li className="eachsong" key={song.id}>
                        <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                    </li>
                })}
                
            </ul>
        </div>
    )
}

export default AllSongs;

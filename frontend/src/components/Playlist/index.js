import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getAllPlaylists } from '../../store/playlist'

function AllPlaylists() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPlaylists())
    }, [dispatch])

    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)

    const allplaylists = useSelector(state => Object.values(state.playlist))
    // const allsongs2 = useSelector(state => state.song)
    // allsongs.forEach(song => songArray.push(song))
    // console.log('allsongs ---1.1---', typeof allsongs)

    return (
        <div className="playlist-container"> ...... all playlists on SonicCloud ......
            <ul>
                {allplaylists && allplaylists.map((playlist) => {
                    return <li className="eachplaylist" key={playlist.id}>
                        <NavLink to={`/playlists/${playlist.id}`}>{playlist.name}</NavLink>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default AllPlaylists;

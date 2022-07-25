import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getAllAlbums } from '../../store/album'

function AllAlbums() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch])

    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)

    const allAlbums = useSelector(state => Object.values(state.album))
    console.log('current user --', allAlbums)

    return (
        <div className="album-container"> ...... all albums on SonicCloud ......
            <ul>
                {allAlbums && allAlbums.map((album) => {
                    return <li className="eachalbum" key={album.id}>
                        <NavLink to={`/albums/${album.id}`}>{album.name}</NavLink>
                    </li>
                })}

            </ul>
        </div>
    )
}

export default AllAlbums;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { getMyAlbums } from '../../store/album'
import CreateAlbumModal from '../AlbumFormModal/index'

function MyAlbums() {
    const dispatch = useDispatch();

    const myAlbums = useSelector(state => Object.values(state.album));

    useEffect(() => {
        dispatch(getMyAlbums())
    }, [dispatch])

    return (
        <div className="all-album-container">
            <CreateAlbumModal />
            <div>
                {myAlbums && myAlbums.map((album) => {
                    return <div className="eachalbum" id={album.id}>
                        <img src={album.previewImage} width='150' ></img>
                        <br></br>
                        <NavLink to={`/albums/${album.id}`}>{album.name}</NavLink>
                    </div>
                })}
            </div>

        </div>
    )
}

export default MyAlbums;

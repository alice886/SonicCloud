import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { getMyAlbums } from '../../store/album'
import CreateAlbumForm from "./CreateAlbumForm";
import { deleteOneAlbum, editOneAlbum } from '../../store/album';

function MyAlbums() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [hideEditform, setHideEditForm] = useState('true')

    const myAlbums = useSelector(state => Object.values(state.album));
    
    useEffect(() => {
        dispatch(getMyAlbums())
    }, [dispatch])

    const [showForm, setShowForm] = useState(false);

    return (
        <div className="album-container">
            <button onClick={() => setHideEditForm(true)}>create new album</button>
            <div>
                {myAlbums && myAlbums.map((album) => {
                    return <div className="eachalbum" id={album.id}>
                        <img src={album.previewImage} width='150' ></img>
                        <br></br>
                        <NavLink to={`/albums/${album.id}`}>{album.name}</NavLink>
                    </div>
                })}
            </div>
            <CreateAlbumForm />
        </div>
    )
}

export default MyAlbums;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getMyAlbums } from '../../store/album'
import CreateAlbumForm from "./CreateAlbumForm";

function AlbumDetails() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyAlbums())
    }, [dispatch])

    const [showForm, setShowForm] = useState(false);

    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)

    const myAlbums = useSelector(state => Object.values(state.album))

    return (
        <div className="album-container"> ...... my albums on SonicCloud ......
            <ul>
                {myAlbums && myAlbums.map((album) => {
                    return <li className="eachalbum" key={album.id}>
                        <NavLink to={`/albums/${album.id}`}>{album.name}</NavLink>
                    </li>
                })}
            </ul>
            <CreateAlbumForm hideForm={() => setShowForm(false)} />
        </div>
    )
}

export default AlbumDetails;

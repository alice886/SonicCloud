import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { getMyAlbums } from '../../store/album'
import CreateAlbumModal from '../AlbumFormModal/index'

function MyAlbums() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [myalbumLoaded, setMyalbumLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const myAlbums = useSelector(state => Object.values(state.album));

    useEffect(() => {
        dispatch(getMyAlbums()).then(() => setMyalbumLoaded(true))
    }, [dispatch, myAlbums?.length])

    if (!sessionUser) {
        history.push('/');
    }


    return myalbumLoaded && (
        <div className="myalbums-container">
            <div className="myalbums-left">
                {sessionUser && <CreateAlbumModal />}
                <div>You have {myAlbums?.length} albums</div>
            </div>
            <div className="myalbums-right">
                {myAlbums && myAlbums.map((album) => {
                    if (album?.userId === sessionUser?.id) {
                        return <div className="myalbums-each" id={album.id}>
                            <img src={album.previewImage} width='150' ></img>
                            <br></br>
                            <h4>album name:</h4>
                            <NavLink to={`/albums/${album.id}`}>{album.name}</NavLink>
                        </div>
                    }
                })}

            </div>
        </div>
    )
}

export default MyAlbums;

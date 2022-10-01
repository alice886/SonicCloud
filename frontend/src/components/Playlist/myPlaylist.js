import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getMyPlaylists } from '../../store/playlist'
import '../../css-package/playlist.css'

function MyPlaylists() {
    const dispatch = useDispatch();
    const [myplaylistLoaded, setMyPlaylistLoaded] = useState(false)
    const [previewImage, setPreviewImage] = useState();
    const sessionUser = useSelector(state => state.session.user);
    const myPlaylists = useSelector(state => Object.values(state.playlist))


    useEffect(() => {
        dispatch(getMyPlaylists()).then(() => setMyPlaylistLoaded(true))
    }, [dispatch, myPlaylists?.length])

    const handleCreatePlaylist = async e =>{
        e.preventDefault();
        const payload = {
            userId: sessionUser.id,
            previewImage,
        }
        
    }

    return myplaylistLoaded && (
        <div className="playlist-container">
            <div>
                <button>Create New Playlist</button>
                <div>You have {myPlaylists.length} playlists</div>
            </div>
            <div>
                <ul>
                    {myPlaylists && myPlaylists.map((playlist) => {
                        return <li className="eachplaylist" key={playlist.id}>
                            <img src={playlist?.previewImage} height={'170px'}></img>
                            <NavLink to={`/playlists/${playlist.id}`}>{playlist.name}</NavLink>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default MyPlaylists;

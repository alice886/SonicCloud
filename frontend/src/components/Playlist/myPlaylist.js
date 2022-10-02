import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getMyPlaylists, createOnePlaylist, deleteOnePlaylist } from '../../store/playlist'
import '../../css-package/playlist.css'

function MyPlaylists() {
    const dispatch = useDispatch();
    const [myplaylistLoaded, setMyPlaylistLoaded] = useState(false);
    const [playlistName, setPlaylistName] = useState();
    const [previewImage, setPreviewImage] = useState();
    const sessionUser = useSelector(state => state.session.user);
    const myPlaylists = useSelector(state => Object.values(state.playlist))


    useEffect(() => {
        dispatch(getMyPlaylists()).then(() => setMyPlaylistLoaded(true))
    }, [dispatch, myPlaylists?.length])


    const handleCreatePlaylist = async e => {
        e.preventDefault();
        const playload = {
            name: playlistName,
            previewImage,
        }
        dispatch(createOnePlaylist(playload))
            .then(() => {
                window.alert('New Playlist created!')
                setPlaylistName('')
                setPreviewImage('')
                dispatch(getMyPlaylists())
            })
            .catch(
                async (res) => {
                    const data = await res.json();
                    window.alert('Not able to create a new playlist, either image url is invalid or playlist name is already in use.')
                }
            )

    }

    const handleDeletePlaylist = async e => {
        e.preventDefault();
        const playListId = e.target.value;
        const payload = {
            id: playListId
        }
        dispatch(deleteOnePlaylist(payload, playListId))
            .then(() => {
                dispatch(getMyPlaylists())
            })

    }

    return myplaylistLoaded && sessionUser && (
        <div className="playlist-home-container">
            <div className="playlist-home-container-left">
                <form>
                    Create a New Playlist
                    <input
                        required
                        placeholder="Playlist Name here"
                        value={playlistName}
                        onChange={e => setPlaylistName(e.target.value)}
                    ></input>
                    <input
                        required
                        placeholder="Preview Image URL here"
                        value={previewImage}
                        onChange={e => setPreviewImage(e.target.value)}
                    ></input>
                    <button onClick={handleCreatePlaylist}>Create</button>
                </form>
            </div>
            <div className="playlist-home-container-right">
                <div>You have {myPlaylists.length} playlists</div>
                <ul>
                    {myPlaylists && myPlaylists.map((playlist) => {
                        return <li className="eachplaylist" key={playlist.id}>
                            <img src={playlist?.previewImage} height={'170px'}></img>
                            <NavLink to={`/playlists/${playlist.id}`}>{playlist.name}</NavLink>
                            <button value={playlist.id} onClick={handleDeletePlaylist}>Delete this Playlist</button>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default MyPlaylists;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getOnePlaylist, deleteSonginPlaylist, editOnePlaylist } from '../../store/playlist'
import '../../css-package/playlist.css'

function PlaylistsDetails() {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const theList = useSelector(state => state.playlist);
    const sessionUser = useSelector(state => state.session.user);
    const [listLoaded, setListLoaded] = useState(false);

    useEffect(() => {
        dispatch(getOnePlaylist(playlistId)).then(() => {
            setListLoaded(true);
            setnewPlaylistName(theList?.name);
            setnewPreviewImage(theList?.previewImage);
        })
    }, [dispatch, playlistId, theList?.Songs?.length])

    const [newPlaylistName, setnewPlaylistName] = useState(theList?.name);
    const [newPreviewImage, setnewPreviewImage] = useState(theList?.previewImage);

    const [readyEdit, setReadyEdit] = useState(false);
    // const theList = useSelector(state => Object.values(state.playlist));


    const handleRemoveSong = async e => {
        e.preventDefault();
        const id = e.target.value;
        const playload = {
            playlistId,
            songId: id
        }
        await dispatch(deleteSonginPlaylist(playload))
            .then(() => {
                // window.alert('Sone is now deleted from Playlist')
                dispatch(getOnePlaylist(playlistId))
            })
    }

    const handleEditPlaylist = async e => {
        e.preventDefault();
        const playload = {
            id: playlistId,
            name: newPlaylistName,
            previewImage: newPreviewImage
        }
        await dispatch(editOnePlaylist(playload))
            .then(() => {
                setReadyEdit(false);
                dispatch(getOnePlaylist(playlistId))
            })
    }

    return listLoaded && (
        <div className="playlist-container">
            {readyEdit ?
                (<div>
                    <form>
                        <img src={newPreviewImage} height={'300px'}></img>
                        <input
                            required
                            placeholder="Playlist Name here"
                            value={newPlaylistName}
                            onChange={e => setnewPlaylistName(e.target.value)}
                        ></input>
                        <input
                            required
                            placeholder="Preview Image URL here"
                            value={newPreviewImage}
                            onChange={e => setnewPreviewImage(e.target.value)}
                        ></input>
                        <button onClick={handleEditPlaylist}>Update Now</button>
                        <button onClick={() => setReadyEdit(false)}>Cancel Update</button>
                    </form>
                </div>) :
                <div>
                    <img src={theList.previewImage} height={'600px'}></img>
                    <div>{theList?.name}</div>
                </div>
            }
            <div>
                {(sessionUser?.id === theList?.userId) && <button onClick={() => setReadyEdit(true)}>Edit This Playlist</button>}
            </div>
            {(theList?.Songs?.length === 0) ? (
                <div>You have not added songs to this playlist</div>
            ) : <div>
                {theList.Songs.map(each => {
                    return <div key={each.id}>
                        <button>playbutt</button>
                        <NavLink to={`/songs/${each?.id}`}>{each.title}</NavLink>
                        {(sessionUser?.id === theList?.userId) && <button value={each?.id} onClick={handleRemoveSong}>X</button>}
                    </div>
                })}
            </div>
            }
        </div>
    )
}

export default PlaylistsDetails;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getOnePlaylist, deleteSonginPlaylist } from '../../store/playlist'
import '../../css-package/playlist.css'

function PlaylistsDetails() {
    const dispatch = useDispatch();
    const [listLoaded, setListLoaded] = useState(false)
    const { playlistId } = useParams();
    // const theList = useSelector(state => Object.values(state.playlist));
    const theList = useSelector(state => state.playlist);

    useEffect(() => {
        dispatch(getOnePlaylist(playlistId)).then(() => setListLoaded(true))
    }, [dispatch, playlistId, theList?.Songs?.length])

    const handleRemoveSong = async e => {
        e.preventDefault();
        const id = e.target.value;
        const payload = {
            playlistId,
            songId: id
        }
        await dispatch(deleteSonginPlaylist(payload));
    }

    return listLoaded && (
        <div className="playlist-container">
            <div>
                <img src={theList.previewImage} height={'600px'}></img>
                <div>{theList?.name}</div>
            </div>
            {(theList?.Songs?.length === 0) ? (
                <div>You have not added songs to this playlist</div>
            ) : <div>
                {theList.Songs.map(each => {
                    return <div key={each.id}>
                        <button>playbutt</button>
                        <NavLink to={`/songs/${each?.id}`}>{each.title}</NavLink>
                        <button value={each?.id} onClick={handleRemoveSong}>X</button></div>
                })}
            </div>
            }
        </div>
    )
}

export default PlaylistsDetails;

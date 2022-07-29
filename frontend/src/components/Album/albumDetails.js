import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { getOneAlbum } from '../../store/album';
import EditAlbumModal from '../AlbumFormModal/edit-index'

function AlbumDetails() {
    const dispatch = useDispatch();
    const { albumId } = useParams();

    useEffect(() => {
        dispatch(getOneAlbum(albumId))
    }, [dispatch, albumId]);

    // const targetAlbum = useSelector(state => Object.values(state.album));
    // no need of Object.values since it's already an object
    const targetAlbum = useSelector(state => (state.album));

    return (
        <>
            {targetAlbum && (
                <div>
                    <img src={targetAlbum.previewImage} alt={targetAlbum.name} width="200" height="200" />
                    <h2>{targetAlbum.name}</h2>
                    <EditAlbumModal />
                    <br></br>
                    <h3>Artist: </h3>
                    <div>{targetAlbum?.Artist?.username}</div>
                    <h3>Songs: </h3>
                    <div className="album-song-container">
                        {(targetAlbum?.Songs?.length > 0) ?
                            targetAlbum?.Songs?.map((song) => {
                                return <div className="albumSongs" key={song.id}>
                                    <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                                </div>
                            }) : ' -- no song in this album yet --'
                        }
                    </div>
            
                </div>
            )
            }
        </>
    )
}

export default AlbumDetails;

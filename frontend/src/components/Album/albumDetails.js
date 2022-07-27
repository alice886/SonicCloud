import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { getOneAlbum, getAllAlbums } from '../../store/album'


function AlbumDetails() {
    const dispatch = useDispatch();
    const { albumId } = useParams();

    useEffect(() => {
        dispatch(getOneAlbum(albumId))
    }, [dispatch, albumId]);

    // const targetAlbum = useSelector(state => Object.values(state.album));
    // no need for Object.values since it's already an object
    const targetAlbum = useSelector(state => (state.album));
    const albumSongs = targetAlbum.Songs;
    const albumArtist = targetAlbum.Artist;

    // console.log('targetAlbum is retrieved -- ', targetAlbum)
    console.log('album song is retrieved -- ', targetAlbum.Songs)
    // console.log('album artist is retrieved -- ', albumArtist.username)

    return (
        <>
            {targetAlbum && (
                <div>
                    <h2>{targetAlbum.name}</h2>
                    {/* <h3>artist: {albumArtist.username}</h3> */}
                    <img src={targetAlbum.previewImage} alt={targetAlbum.name} />
                    {/* <div className="albumSongContainer">
                        {albumSongs.map((song) => {
                            return <div className="albumSongs" key={song.id}>
                                <Link to={`/songs/${song.id}`}>{song.name}</Link>
                            </div>
                        })
                        }
                    </div> */}
                </div>
            )
            }
        </>
    )
}

export default AlbumDetails;

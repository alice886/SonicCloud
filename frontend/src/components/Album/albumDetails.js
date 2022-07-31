import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { getOneAlbum } from '../../store/album';
import EditAlbumModal from '../AlbumFormModal/edit-index'
import LoginForm from '../LoginFormModal/LoginForm'

function AlbumDetails() {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const targetAlbum = useSelector(state => (state.album));

    useEffect(() => {
        dispatch(getOneAlbum(albumId))
    }, [dispatch]);

    console.log(sessionUser.username);
    console.log(targetAlbum?.Artist?.username);

    // const targetAlbum = useSelector(state => Object.values(state.album));
    // no need of Object.values since it's already an object
    // console.log('sessionUser is ---', sessionUser)
    // console.log('target album is --- in detail page --', targetAlbum)

    if (!sessionUser) {
        return (
            <div>
                <h2>Join SonicCloud to discover more </h2>
                <h3> free sign up <NavLink to='/signup'> here </NavLink> </h3>
                <h3> or log in below </h3>
                <LoginForm />
            </div>
        )
    }

    return (
        <>
            {targetAlbum && (
                <div>
                    <img src={targetAlbum?.previewImage} alt={targetAlbum?.name} width="200" height="200" />
                    <h2>{targetAlbum.name}</h2>
                    {(sessionUser.username === targetAlbum?.Artist?.username) && <EditAlbumModal
                        targetAlbum={targetAlbum}
                    // hideForm={() => setShowModalForm(true)}
                    />}
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

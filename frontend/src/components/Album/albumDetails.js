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

    // console.log(sessionUser.username);
    // console.log(targetAlbum?.Artist?.username);

    // const targetAlbum = useSelector(state => Object.values(state.album));
    // no need of Object.values since it's already an object
    // console.log('sessionUser is ---', sessionUser)
    // console.log('target album is --- in detail page --', targetAlbum)

    if (!sessionUser) {
        return (
            <div className='public-present'>
                <h2>Join SonicCloud to discover more </h2>
                <h3> free sign up <NavLink to='/signup'> here </NavLink> </h3>
                <h3> or log in below </h3>
                <LoginForm />
            </div>
        )
    }

    const getReleaseDate = timeStamp => {
        const converted = new Date(timeStamp);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return (converted.getDate() + 1) + ' ' + months[(converted.getUTCMonth())] + ' ' + converted.getFullYear();
    }

    return (
        <>
            {targetAlbum && (
                <div className='album-page'>
                    <div className="album-details">
                        <div className="album-d-left">
                            <h2>{targetAlbum.name}</h2>
                            <h3>{targetAlbum?.Artist?.username}</h3>
                            <div className='album-songs'>{targetAlbum?.Songs?.length} Track(s)</div>
                        </div>
                        <img className='album-cover' src={targetAlbum?.previewImage} alt={targetAlbum?.name} width="200" height="200" />
                    </div>
                    <div className="album-edit-button">
                        {(sessionUser.username === targetAlbum?.Artist?.username) && <EditAlbumModal
                            targetAlbum={targetAlbum}
                        // hideForm={() => setShowModalForm(true)}
                        />}
                    </div>
                    <div className="album-details-bottom">
                        <div>Album release date: {getReleaseDate(targetAlbum?.createdAt)}</div>
                        {/* <div>{targetAlbum?.Artist?.username}</div> */}
                        <div>
                            {(targetAlbum?.Songs?.length > 0) ?
                                targetAlbum?.Songs?.map((song, index) => {
                                    // for (let i = 1; i <= targetAlbum?.Songs?.length; i++) {
                                    return <div className="albumSongs" key={song.id}>
                                        {index + 1} &nbsp; <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                                    </div>
                                    // }
                                }
                                ) : ' -- no song in this album yet --'
                            }
                        </div>
                    </div>

                </div>
            )
            }
        </>
    )
}

export default AlbumDetails;

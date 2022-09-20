import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { getOneSong, deleteOneSong, editOneSong } from '../../store/song';
import EditSongModal from '../SongFormModal/edit-index'
import LoginForm from '../LoginFormModal/LoginForm'

function SongDetails() {

    const dispatch = useDispatch();
    const { songId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const targetSong = useSelector(state => (state.song));

    useEffect(() => {
        dispatch(getOneSong(songId))
    }, [dispatch]);


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

    return (
        <>
            {targetSong && (
                <div className="song-page">
                    <div className='song-present'>
                        <div className="song-cover">
                            <img src={targetSong?.previewImage} alt={targetSong?.title} />
                            {/* <br></br> */}
                        </div>
                        <div className='song-details'>
                            <h3 className='song-details'>{targetSong?.title}</h3>
                            <h4 className='song-details'>Artist: {targetSong?.Artist?.username}</h4>
                            <h4 className='song-details'>Album: <NavLink to={`/albums/${targetSong?.Album?.id}`}>{targetSong?.Album?.name}</NavLink></h4>
                            <h4 className='song-details'>Description: {targetSong?.description}</h4>
                        </div>
                    </div>
                    <div className="song-audio-detail">
                        <div className='song-player-detail'>
                            {/* <audio className='song-player-detail' src="http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg" controls > */}
                            <audio className='song-player-detail' src={targetSong.url} controls > 
                            {/* no cant do --> forbidden */}
                            </audio>
                        </div>
                        {(sessionUser.username === targetSong?.Artist?.username) && (
                            <div className='edit-button'>
                                <EditSongModal
                                    targetSong={targetSong}
                                />
                            </div>
                        )}

                    </div>
                </div>
            )}
        </>
    );
}

export default SongDetails;

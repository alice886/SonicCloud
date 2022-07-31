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
                        {/* <img src={targetSong?.previewImage} alt={targetSong?.title} width="200" height="200" className='song-cover'/> */}
                        <img src={targetSong?.previewImage} alt={targetSong?.title} className='song-cover' />
                        {/* <br></br> */}
                        <div className='song-details'>
                            <h3>{targetSong?.title}</h3>
                            <h4>Artist: {targetSong?.Artist?.username}</h4>
                            <h4>Album: <NavLink to={`/albums/${targetSong?.Album?.id}`}>{targetSong?.Album?.name}</NavLink></h4>
                            <h4>Description: {targetSong?.description}</h4>
                        </div>
                        {(sessionUser.username === targetSong?.Artist?.username) && (
                            <div className='edit-button'>
                                <EditSongModal
                                    targetSong={targetSong}
                                />
                            </div>
                        )}
                    </div>
                    <div className="song-audio">
                        <div className='song-player'>
                            <audio src="http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg" controls >
                                {/* <audio src="https://www.computerhope.com/jargon/m/example.mp3" controls> */}
                            </audio>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default SongDetails;

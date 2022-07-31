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
            {targetSong && (
                <div>
                    <img src={targetSong?.previewImage} alt={targetSong?.title} width="200" height="200" />
                    <h3>{targetSong?.title}</h3>
                    {(sessionUser.username === targetSong?.Artist?.username) && <EditSongModal
                        targetSong={targetSong}
                    />}
                    <br></br>
                    <audio src="http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg" controls>
                        {/* <audio src="https://www.computerhope.com/jargon/m/example.mp3" controls> */}
                        {/* <p>Fallback content goes here.</p> */}
                    </audio>
                    <br></br>
                    {/* <iframe width="187" height="105" src="https://www.youtube.com/embed/BnasLOCpTEs" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    <h4>Artist: {targetSong?.Artist?.username}</h4>
                    <h4>Album: <NavLink to={`/albums/${targetSong?.Album?.id}`}>{targetSong?.Album?.name}</NavLink></h4>
                    {/* <h3>audio url id: {targetSong.url}</h3> */}
                    <h4>Description: {targetSong?.description}</h4>
                </div>
            )}
        </>
    );
}

export default SongDetails;

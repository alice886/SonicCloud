import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { getOneSong, deleteOneSong, editOneSong } from '../../store/song';
import EditSongModal from '../SongFormModal/edit-index'
import LoginForm from '../LoginFormModal/LoginForm'
import SongComments from '../Comments/index'

function SongDetails({ playing, setPlaying ,setSongName, setArtistName}) {

    const dispatch = useDispatch();
    const { songId } = useParams();
    const [played, setPlayed] = useState(false)
    const [ppbutton, setPPbutton] = useState('▶')
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

    const handleHomePlay = async e => {
        e.preventDefault();
        await setPlaying(e.target.value);
        let homePlayer = document.getElementById('botton-player-bar');
        if (played) {
            homePlayer.pause();
            setPlayed(false);
            setPPbutton('▶');
        }
        else {
            homePlayer.load();
            homePlayer.play();
            setSongName(targetSong?.title);
            setArtistName(targetSong?.Artist?.username)
            setPlayed(true);
            setPPbutton('||');
        }
    }

    const getReleaseDate = timeStamp => {
        const converted = new Date(timeStamp);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return (converted.getDate() + 1) + ' ' + months[(converted.getUTCMonth())] + ' ' + converted.getFullYear();
    }

    return (
        <>
            {targetSong && (
                <div className="song-page">
                    <div className='song-present'>
                        <button className="songplay-button" value={targetSong.url} onClick={handleHomePlay} >{ppbutton}</button>
                        <div className='song-details'>
                            <h3 className='song-details'>{targetSong?.title}</h3>
                            <h4 className='song-details'>by {targetSong?.Artist?.username}</h4>
                        </div>
                        <div className="song-cover">
                            <img src={targetSong?.previewImage} alt={targetSong?.title} />
                            {/* <br></br> */}
                        </div>
                    </div>
                    {(sessionUser.username === targetSong?.Artist?.username) && (
                        <div className='edit-button'>
                            <EditSongModal
                                targetSong={targetSong}
                            />
                        </div>
                    )}
                    <div className="song-details-comments">
                        <div className="song-present-bottom">
                            <h4 className='song-details'>Released by: {targetSong?.Artist?.username}</h4>
                            <h4 className='song-details'>Released date: {getReleaseDate(targetSong?.createdAt)}</h4>
                            <h4 className='song-details'>Album: <NavLink to={`/albums/${targetSong?.Album?.id}`}>{targetSong?.Album?.name}</NavLink></h4>
                            <h4 className='song-details'>About this song: {targetSong?.description}</h4>
                        </div>
                        <SongComments songId={songId} />
                    </div>

                    {/* <div className="song-audio-detail">
                         <div className='song-player-detail'>
                            <audio className='song-player-detail' src="http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg" controls >
                            <audio className='song-player-detail' src={targetSong.url} controls > 
                            </audio>
                        </div>
                           
                    </div> */}

                </div>
            )}
        </>
    );
}

export default SongDetails;

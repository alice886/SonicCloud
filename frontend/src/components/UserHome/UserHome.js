import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from 'react-router-dom';
import { getAllSongs } from '../../store/song'
import bg from '../../images/sunrise.jpeg'
import { getUserDetail } from '../../store/user'
import LoginForm from '../LoginFormModal/LoginForm'

const TestUserHome = ({ playing, setPlaying }) => {
    const dispatch = useDispatch();
    // const [played, setPlayed] = ('false')
    const sessionUser = useSelector(state => state.session.user);
    const allsongs = useSelector(state => Object.values(state.song))

    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])


    const handleHomePlay = async e => {
        e.preventDefault();
        await setPlaying(e.target.value);
        // played ? setPlayed('false') : setPlayed('true');
        let homePlayer = document.getElementById('botton-player-bar');
        homePlayer.load();
        homePlayer.play();
    }

    // const ppbutton = played ?'❚ ❚':'▶'

    if (!sessionUser) {
        return (
            <div className='public-home'>
                <h2 className='public-greeting'>Welcome to SonicCloud </h2>
                <img className="landing-pic" src={bg}></img>
                <br></br>
                <h3>Hear what’s trending for free in the SoundCloud community</h3>
                <br></br>
                {/* <div className="landing-box">
                    <img className="landing-box-pic" src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg' ></img>
                    <div className='landing-box-content'>
                        <h2>Thanks for visiting. Now join in to unlock more.</h2>
                        <h3>Save tracks, follow artists and build playlists. All for free.</h3>
                        <h3> free sign up <NavLink to='/signup'> here </NavLink> </h3>
                        <h3> or log in below </h3>
                    </div>
                </div> */}
                <div className="all-home-song-container">
                    {allsongs && allsongs.map((song) => {
                        return <div className="eachhomesong" key={song.id}>
                            <img src={song.previewImage} width='150' ></img>
                            <br></br>
                            <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                            <button className="songplay-button" value={song.url} onClick={handleHomePlay} >▶</button>
                            <br></br>
                            {/* <p>album: {song.albumId}</p> */}
                            {/* <audio className='song-player-general' src={song.url} controls >
                    </audio> */}
                            {/* <audio className='song-player-general' src="http://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg" controls > */}
                        </div>
                    })}

                </div>
            </div>
        )
    }

    return sessionUser && (
        <div id='home-middle'>
            <h2>Hello {sessionUser?.username}! Welcome back!</h2>
            {/* <img className='landing-pic'  src='https://va.sndcdn.com/bg/soundcloud:sounds:162983976/soudn-image.jpg'></img> */}
            {/* <img id='rounded' src='https://media0.giphy.com/avatars/Packly/C4AvqGR2zXrN.gif' height='200px'></img> */}
            {/* <NavLink to={`/songs`}>Songs on 🎶🌩️</NavLink>
            <NavLink to={`/albums`}>Albums on 🎶🌩️</NavLink> */}
            {/* <NavLink to={`/playlists`}>Playlists on 🎶🌩️</NavLink> */}

        </div>
    )
}

export default TestUserHome;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getUserDetail } from '../../store/user'
import LoginForm from '../LoginFormModal/LoginForm'

const TestUserHome = () => {
    const sessionUser = useSelector(state => state.session.user);

    if (!sessionUser) {
        return (
            <div className='public-home'>
                <h2 className='public-greeting'>Welcome to SonicCloud! </h2>
                <img className="landing-pic" src='https://va.sndcdn.com/bg/soundcloud:sounds:416933784/VisualTrack_Oshun_01_1.jpg' ></img>
                <h3>Hear what’s trending for free in the SoundCloud community</h3>
                <div className="landing-box">
                    <img className="landing-box-pic" src='https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg' ></img>
                    <div className='landing-box-content'>
                        <h2>Thanks for visiting. Now join in to unlock more.</h2>
                        <h3>Save tracks, follow artists and build playlists. All for free.</h3>
                        <h3> free sign up <NavLink to='/signup'> here </NavLink> </h3>
                        <h3> or log in below </h3>
                    </div>
                    <LoginForm />
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

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />

        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }

    return (
        <div className='topnav'>
            <NavLink to="/songs" className={'nav-songs'}>Songs</NavLink>
            <NavLink to="/albums" className={'nav-albums'}>Albums</NavLink>
            <NavLink to="/playlists" className={'nav-playlists'}>Playlists</NavLink>
            <NavLink to="/songs/mysongs" className={'nav-songs'}>My Songs</NavLink>
            <NavLink to="/albums/myalbums" className={'nav-albums'}>My Albums</NavLink>
            <NavLink to="/playlists/myplaylists" className={'nav-playlists'}>My Playlists</NavLink>
            <NavLink exact to="/" className={'nav-home'}>Home</NavLink>
            {isLoaded && sessionLinks}

        </div>
    );
}

export default Navigation;

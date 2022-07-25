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
        <ul className='topNav'>
            <li>
                <NavLink to="/songs/all" className={'nav-songs'}>Songs</NavLink>
            </li>
            <li>
                <NavLink to="/playlists/myplaylists" className={'nav-playlists'}>My Playlists</NavLink>
            </li>
            <li>
                <NavLink exact to="/" className={'nav-home'}>Home</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    );
}

export default Navigation;

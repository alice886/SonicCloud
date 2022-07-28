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
            <div id='topnav-container' >
                <a name="top"></a>
                <NavLink to="/songs" className={'nav-discover'}>Songs</NavLink>|
                <NavLink to="/albums" className={'nav-discover'}>Albums</NavLink>|
                {/* <NavLink to="/playlists" className={'nav-discover'}>Playlists</NavLink>| */}
                <NavLink to="/songs/mysongs" className={'nav-library'}>My Songs</NavLink>|
                <NavLink to="/albums/myalbums" className={'nav-library'}>My Albums</NavLink>|
                {/* <NavLink to="/playlists/myplaylists" className={'nav-library'}>My Playlists</NavLink>| */}
                <NavLink exact to="/" className={'nav-home'}>Home</NavLink>
                {isLoaded && sessionLinks}
                {/* <input type="text" placeholder="search    "></input> */}
            </div>
        </div>
    );
}

export default Navigation;

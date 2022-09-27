import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import '../../css-package/Navigation.css';
import scicon from '../../images/sc-icon.png';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink to="/songs/mysongs" className={'nav-library'}>My Songs</NavLink>
                <NavLink to="/albums/myalbums" className={'nav-library'}>My Albums</NavLink>
                {/* <NavLink to="/playlists/myplaylists" className={'nav-library'}>My Playlists</NavLink>| */}
                < ProfileButton user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/signup">Sign Up</NavLink>
                <LoginFormModal />
            </>
        );
    }


    return (
        <div className='topnav'>
            <div id='topnav-container' >
                {/* <a name="top"></a> */}
                <a className='scicon' href='/' to='/'><img src={scicon} alt='logo' /></a>
                <NavLink exact to="/" className={'nav-home'}> Home </NavLink>
                <NavLink to="/songs" className={'nav-discover'}>Songs</NavLink>
                <NavLink to="/albums" className={'nav-discover'}>Albums</NavLink>
                {/* <NavLink to="/playlists" className={'nav-discover'}>Playlists</NavLink>| */}
                {isLoaded && sessionLinks}
                {/* <input type="text" placeholder="search    "></input> */}
            </div>
        </div>
    );
}

export default Navigation;

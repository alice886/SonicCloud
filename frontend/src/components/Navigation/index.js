import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import '../../css-package/Navigation.css';
import scicon from '../../images/sc-icon.png';
import portfolioimg from '../../images/icon.png'
import emailimg from '../../images/email.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                {/* <NavLink to="/songs/mysongs" className={'nav-library'}>My Songs</NavLink>
                <NavLink to="/albums/myalbums" className={'nav-library'}>My Albums</NavLink> */}
                {/* <NavLink to="/playlists/myplaylists" className={'nav-library'}>My Playlists</NavLink>| */}
                <NavLink to="/playlists" className={'nav-discover'}>Playlists</NavLink>
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

    const showAbout = async e => {
        e.preventDefault();
        document.getElementById("mySidenav").style.width = "280px";
    }

    const hideAbout = async e => {
        e.preventDefault();
        document.getElementById("mySidenav").style.width = "0";
    }


    return (
        <div className='topnav'>
            <button onClick={showAbout} className='about-butt'>About</button>
            {/* {showSider &&  */}
            <div id="mySidenav" class="sidenav">
                <a className='scicon' href='/' to='/'><img src={scicon} alt='logo' /></a>
                <a href="javascript:void(0)" class="closebtn" onClick={hideAbout}>&times;</a>
                <br></br>
                <a href="#">About SonicCloud</a>
                <a href="https://github.com/alice886/SonicCloud" className='sidebar-links'>GitHub Repo</a>
                <a href="https://github.com/alice886/SonicCloud/wiki" className='sidebar-links'>Wiki Page</a>
                <a href="#">About the Developer</a>
                <a href="https://alice886.github.io/" className='sidebar-links'>
                    <img src={portfolioimg} height={'50px'}></img>
                    <br></br> Portfolio
                </a>
                <a href="https://www.linkedin.com/in/alice886/" className='sidebar-links'>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" height={'50px'} />
                    <br></br> LinkedIn
                </a>
                <a href="mailto:qinglialice@gmail.com" className='sidebar-links'>
                    <img src={emailimg} height={'50px'}></img>
                    <br></br>Contact Me
                </a>
            </div>
            {/*  } */}
            <div id='topnav-container' >
                {/* <a name="top"></a> */}
                <a className='scicon' href='/' to='/'><img src={scicon} alt='logo' /></a>
                <NavLink exact to="/" className={'nav-home'}> Home </NavLink>
                <NavLink to="/albums" className={'nav-discover'}>Albums</NavLink>
                <NavLink to="/songs" className={'nav-discover'}>Songs</NavLink>
                {isLoaded && sessionLinks}

                {/* <input type="text" placeholder="search    "></input> */}
            </div>
        </div>
    );
}

export default Navigation;

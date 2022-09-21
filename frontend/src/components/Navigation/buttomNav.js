import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import '../../css-package/Navigation.css';

function ButtomNavigation({ playing }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='buttomnav'>

            {/* <a className='back-to-top' href="#top">back to top⬆</a> */}
            <div className="container-audio">
                {/* <audio controls  loop autoPlay src='https://soniccloud886.s3.amazonaws.com/1663729705412.mp3'> */}
                <audio controls loop className='botton-player' id='botton-player-bar'>
                    <source src={playing} type="audio/mp3"></source>
                    {/* <iframe src={playing} allow="autoplay" id="audio" style="display: none"></iframe> */}
                </audio>
            </div>
        </div>
    );
}

export default ButtomNavigation;

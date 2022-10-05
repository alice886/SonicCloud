import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import '../../css-package/Navigation.css';

function ButtomNavigation({ playing, songName, artistName, constPlaylist }) {
    const sessionUser = useSelector(state => state.session.user);

    let vid = document?.getElementById("botton-player-bar");
    if (vid) {
        vid.volume = 0.1;
    }

    if (constPlaylist?.Songs?.length === 0) {
        return;
    }

    return (
        <div className='buttomnav'>

            <div className='buttom-info-bar'>🎧 &nbsp;&nbsp;&nbsp;Now playing  &nbsp; &nbsp; &nbsp; ---->   &nbsp; &nbsp; &nbsp; {songName} &nbsp;&nbsp; &nbsp; ---->      &nbsp; &nbsp;&nbsp; by &nbsp;{artistName}</div>
            {/* <a className='back-to-top' href="#top">back to top⬆</a> */}
            <div className="container-audio">
                <audio controls loop className='botton-player' id='botton-player-bar'>
                    <source src={playing} type="audio/mp3"></source>
                </audio>
            </div>
        </div>
    );
}

export default ButtomNavigation;

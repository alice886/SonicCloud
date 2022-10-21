import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import '../../css-package/Navigation.css';

function ButtomNavigation({ playing, songName, artistName }) {
    const sessionUser = useSelector(state => state.session.user);

    let vid = document?.getElementById("botton-player-bar");
    if(vid){
        vid.volume = 0.1;
    }

    return (
        <div className='buttomnav'>

            {/* <a className='back-to-top' href="#top">back to top⬆</a> */}
            <div className="container-audio">
                <audio controls loop className='botton-player' id='botton-player-bar'>
                    <source src={playing} type="audio/mp3"></source>
                </audio>
            </div>
            <div className='buttom-info-bar'>Listening &nbsp; 🎧 &nbsp; {songName}
            <br></br>
            by &nbsp;{artistName}</div>
        </div>
    );
}

export default ButtomNavigation;

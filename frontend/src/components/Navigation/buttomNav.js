import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import '../../css-package/Navigation.css';

function ButtomNavigation({ playing, songName, artistName }) {
    const sessionUser = useSelector(state => state.session.user);

    let vid = document?.getElementById("botton-player-bar");
    if(vid){
        vid.volume = 0.15;
    }

    return (
        <div className='buttomnav'>

            <div className='buttom-info-bar'>Now Playing &nbsp; 🎶 &nbsp; {songName} &nbsp; by &nbsp; {artistName}</div>
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

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getAllSongs } from '../../store/song';
import WaveSurfer from "wavesurfer.js";
import '../../css-package/forms.css';
import '../../css-package/song.css';

function AllSongs({ playing, setPlaying, setSongName, setArtistName }) {
    const dispatch = useDispatch();
    const [played, setPlayed] = useState(false);
    const [allSongLoaded, setAllSongLoaded] = useState(false);
    const [songSelect, setSongSelect]=useState();
    const allsongs = useSelector(state => Object.values(state.song))
    const sessionUser = useSelector(state => state.session.user);
    // console.log('allsongs ---1.1---', typeof mysongs)
    // const path = window.location.href;
    // const urlending = path.split("/").reverse()[0];
    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)
    useEffect(() => {
        dispatch(getAllSongs()).then(() => setAllSongLoaded(true))
    }, [dispatch])

    // if (!sessionUser) {
    //     return (
    //         <div className='notLoggedIn'>
    //             <h3>Please log in to browse all songs</h3>
    //         </div>
    //     )
    // }
    // var WaveSurfer = require("wavesurfer.js");
    // const wavePlayer = document.getElementById('waveform');
    const wavePlayer2 = document.getElementsByClassName('waveform2');

    // var wavesurfer = WaveSurfer.create({
    //     container: wavePlayer2,
    //     waveColor: 'violet',
    //     progressColor: 'purple'
    // });

    const handleSongPlay = async (e, song) => {
        e.preventDefault();
        await setPlaying(e.target.value);
        await setSongName(song.title);
        await setArtistName(song.Artist.username);
        let homePlayer = document.getElementById('botton-player-bar');
        if (played && songSelect == song.id) {
            homePlayer.pause();
            setPlayed(false);
            setSongSelect();
        }
        else {
            homePlayer.load();
            homePlayer.play();
            setSongSelect(song.id)
            setPlayed(true);
        }
    }

    return allSongLoaded && (
        <div className="all-song-container">
            {allsongs && allsongs.map((song) => {
                return <div className="eachsong" key={song?.id}>
                    <div className="allsongs-cover-butt">
                        <img className="all-songplay-cover" src={song?.previewImage} height={'60px'} width={'60px'}></img>
                        <button className="all-songplay-button" value={song?.url} onClick={e=>handleSongPlay(e,song)} >{(songSelect === song?.id)?'||':'▶'}</button>
                    </div>
                    <div>
                        <div className="song-r">
                            <div><NavLink to={`/songs/${song?.id}`}>{song?.title}</NavLink>
                            </div>
                            <div>in album <NavLink to={`/albums/${song?.Album?.id}`}>{song?.Album?.name}</NavLink> | by {song?.Artist?.username}</div>
                            {/* <div id="waveform" className="waveform2">waveformwaveformwaveform</div> */}
                            {/* <audio className='song-player-general' src={song?.url} controls ></audio> */}
                        </div>

                    </div>
                </div>
            })}

        </div>
    )
}

export default AllSongs;

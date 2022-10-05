import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getOnePlaylist, deleteSonginPlaylist, editOnePlaylist } from '../../store/playlist'
import fakewaves from '../../images/soundwaves02.gif'
import '../../css-package/playlist.css'

function PlaylistsPlay({ playing, setPlaying, setSongName, setArtistName }) {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const theList = useSelector(state => state.playlist);
    const sessionUser = useSelector(state => state.session.user);
    const [listLoaded, setListLoaded] = useState(false);
    const [songSelect, setSongSelect] = useState();
    const [played, setPlayed] = useState(false);

    useEffect(() => {
        dispatch(getOnePlaylist(playlistId)).then(() => {
            setListLoaded(true);
            setnewPlaylistName(theList?.name);
            setnewPreviewImage(theList?.previewImage);
        })
    }, [dispatch, playlistId, theList?.Songs?.length])

    const [newPlaylistName, setnewPlaylistName] = useState(theList?.name);
    const [newPreviewImage, setnewPreviewImage] = useState(theList?.previewImage);

    const [readyEdit, setReadyEdit] = useState(false);
    // const theList = useSelector(state => Object.values(state.playlist));

    // const handlePlaylistPlay = async (e, song) => {
    //     e.preventDefault();
    //     await setPlaying(e.target.value);
    //     await setSongName(song.title);
    //     await setArtistName(song.Artist.username);
    //     let homePlayer = document.getElementById('botton-player-bar');
    //     if (played && songSelect == song.id) {
    //         homePlayer.pause();
    //         setPlayed(false);
    //         setSongSelect();
    //     }
    //     else {
    //         homePlayer.load();
    //         homePlayer.play();
    //         setSongSelect(song.id)
    //         setPlayed(true);
    //     }
    // }

    let playlistvid = document?.getElementById("playlist-player-bar");

    if (theList?.Songs.length === 0 && document.getElementById("playlistSidenav")) {
        document.getElementById("playlistSidenav").style.width = "0px";
        return (<div className="playplaylist-container" id="playlistSidenav" class="playlistSidenav">
            -
        </div>)
    }

    let playlistSongs = [];
    theList.Songs.map(each => {
        playlistSongs.push(each.url)
    });
    let songload = theList?.Songs[0]?.url;

    const handlePlayList = async e => {
        e.preventDefault();
        document.getElementById("playlistSidenav").style.width = "290px";
        let fvid = document?.getElementById("playlist-player-bar");
        let playindex = 0;
        songload = theList?.Songs[playindex].url;
        fvid.play();
        console.log('it can capture the ended ====>>111', playlistvid)
        fvid?.addEventListener('ended', async e => {
            e.preventDefault();
            playindex++;
            if (playindex == theList?.Songs?.length) {
                playindex = 0;
            }
            fvid.src = theList?.Songs[playindex]?.url;
            fvid?.play();
        },)
    }


    const hidePlaylist = async e => {
        e.preventDefault();
        document.getElementById("playlistSidenav").style.width = "0";
    }
    const toShowPlaylist = async e => {
        e.preventDefault();
        document.getElementById("playlistSidenav").style.width = "290px";
    }

    if (playlistvid) {
        playlistvid.volume = 0.1;
    }

    return listLoaded && (
        <div className='playPlaylist-component'>
            <button onClick={handlePlayList} className='playPlaylistButt'>▶</button>
            <div className="playplaylist-container" id="playlistSidenav" class="playlistSidenav">
                {/* <div className="playplaylist-audio">
                <audio controls loop className='botton-player' id='botton-player-bar'>
                    <source src={playing} type="audio/mp3"></source>
                </audio>
            </div> */}
                <a onClick={toShowPlaylist} class="playlist-closebtn">{'<'}</a>
                <a href="javascript:void(0)" class="playlist-openbtn" onClick={hidePlaylist}>&times;</a>
                <div>Now Playing playlist :
                    <NavLink to={`/songs/${theList?.id}`}> {theList?.name}</NavLink></div>
                <img src={fakewaves} height={'90px'}></img>
                <audio controls id='playlist-player-bar'>
                    <source src={songload} type="audio/mp3" ></source>
                </audio>
                {theList?.Songs?.length && <div className="mylist-right-yes-side">
                    {theList.Songs.map(each => {
                        return <div key={each.id} className='playplaylist-each'>
                            <div className="mylist-yes-details">
                                <NavLink to={`/songs/${each?.id}`}>🎵 &nbsp; {each.title}</NavLink>
                            </div>
                        </div>
                    })}
                </div>
                }
            </div>
        </div>
    )
}

export default PlaylistsPlay;

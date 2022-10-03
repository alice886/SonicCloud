import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getMyPlaylists, addSongToPlaylist } from '../../store/playlist'
import '../../css-package/playlist.css'

function AddingSongtoPlaylist({ setShowPlaylistSelect }) {
    const dispatch = useDispatch();
    const [myplaylistLoaded, setMyPlaylistLoaded] = useState(false)
    const [previewImage, setPreviewImage] = useState();
    const [chosenPlaylist, setChosenPlaylist] = useState();
    const sessionUser = useSelector(state => state.session.user);
    const myPlaylists = useSelector(state => Object.values(state.playlist))
    const songId = useParams().songId;

    useEffect(() => {
        dispatch(getMyPlaylists()).then(() => setMyPlaylistLoaded(true))
    }, [dispatch, myPlaylists?.length])

    const handleAddtoPlaylist = async e => {
        e.preventDefault();
        const playload = {
            songId: songId,
            playlistId: chosenPlaylist,
        }

        return dispatch(addSongToPlaylist(playload))
            .then(() => {
                window.alert("Hooray! The song is now added to the playlist.")
                setShowPlaylistSelect(false);

            })
            .catch(
                async (res) => {
                    const data = await res.json();
                    window.alert(data.message)
                }
            )

    }

    console.log('chosen playlist number is ---', chosenPlaylist);
    console.log('chosen songid number is ---', songId);

    return myplaylistLoaded && sessionUser && (
        <div className="addtoplaylist-container">
                {/* <legend>Please select your preferred playlist:</legend> */}
                {myPlaylists && myPlaylists.map((playlist) => {
                    return <div className="playlist-radio">
                            <input type='radio' key={playlist?.id} value={playlist?.id} name='playlistchoice' onClick={e => setChosenPlaylist(e.target.value)}></input>
                            <div className="playlist-radio-name">{playlist?.name}</div>
                    </div>
                })}
                <button onClick={handleAddtoPlaylist} className="playlist-radio-add">Add to Playlist</button>
        </div>
    )
}

export default AddingSongtoPlaylist;

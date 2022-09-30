import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getAllAlbums } from '../../store/album'


function AllAlbums({ playing, setPlaying, setSongName, setArtistName }) {
    const dispatch = useDispatch();
    const [played, setPlayed] = useState(false)
    const [homesongloaded, setHomesongloaded] = useState(false)
    const [songSelect, setSongSelect]=useState();

    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch])

    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)

    const allAlbums = useSelector(state => Object.values(state.album))
    const sessionUser = useSelector(state => state.session.user);

    const handleHomePlay = async (e, song, album) => {
        e.preventDefault();
        await setPlaying(e.target.value);
        await setSongName(song.title);
        await setArtistName(album.Artist.username);
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


    return (
        <div className="all-album-container">
            {allAlbums && allAlbums.map((album) => {
                return <div className="eachalbum" key={album.id}>
                    <div>
                        <NavLink to={`/albums/${album.id}`}><img src={album.previewImage} width='150' ></img>{album.name}</NavLink>
                    </div>
                    {/* <div>Artist:
                        <br></br>
                        {album?.Artist?.username}</div> */}
                    <div>
                        {album?.Songs?.map(each => {
                            return <div className="song-in-album">
                                <button value={each.url} onClick={e=>handleHomePlay(e,each, album)} >{(songSelect === each?.id)?'||':'▶'}</button>&nbsp;  &nbsp; <NavLink to={`/songs/${each.id}`}>{each.title}</NavLink>
                            </div>
                        })}
                    </div>
                    {/* <p>album id: {album.id}  | artist id: {album.userId}</p> */}
                    {/* <img className="albumImage" src={`album.previewImage`} alt={"album Image"} width={50} height={60} > */}
                </div>
            })}

        </div>
    )
}

export default AllAlbums;

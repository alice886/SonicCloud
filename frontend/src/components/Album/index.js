import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getAllAlbums } from '../../store/album'


function AllAlbums({playing, setPlaying}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch])

    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)

    const allAlbums = useSelector(state => Object.values(state.album))
    const sessionUser = useSelector(state => state.session.user);

    const handleHomePlay = async e => {
        e.preventDefault();
        await setPlaying(e.target.value);
        // played ? setPlayed('false') : setPlayed('true');
        let homePlayer = document.getElementById('botton-player-bar');
        homePlayer.load();
        homePlayer.play();
    }


    return (
        <div className="all-album-container">
            {allAlbums && allAlbums.map((album) => {
                return <div className="eachalbum" key={album.id}>
                    <img src={album.previewImage} width='150' ></img>
                    <div> Album:
                        <br></br>
                        <NavLink to={`/albums/${album.id}`}>{album.name}</NavLink>
                    </div>
                    <div>Artist:
                        <br></br>
                        {album?.Artist?.username}</div>
                    <div>Sound Tracks:
                        {album?.Songs?.map(each => {
                            return <div >
                                <button value={each.url} onClick={handleHomePlay} >▶</button><NavLink to={`/songs/${each.id}`}>{each.title}</NavLink> 
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

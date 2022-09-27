import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams } from "react-router-dom";
import { getAllAlbums } from '../../store/album'


function AllAlbums() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAlbums())
    }, [dispatch])

    // const currentUser = useSelector(state => state.session.user);
    // console.log('current user --',currentUser)

    const allAlbums = useSelector(state => Object.values(state.album))
    const sessionUser = useSelector(state => state.session.user);



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
                            return <div>
                                <NavLink to={`/songs/${each.id}`}>{each.title}</NavLink>
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

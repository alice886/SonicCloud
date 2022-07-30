import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getUserDetail } from '../../store/user'

const TestUserHome = () => {
    return (
        <div id='home-middle'>
            <div class='profile-pic'>
                {/* <img id='rounded' src='https://cdn.digitaldjtips.com/app/uploads/2013/12/08033626/Is-It-Safe-Legal-To-Store-All-My-Music-In-The-Cloud-copy.jpg' height='200px'></img> */}
                {/* <img id='rounded' src='https://media0.giphy.com/avatars/Packly/C4AvqGR2zXrN.gif' height='200px'></img> */}
            </div>
            {/* <NavLink to={`/songs`}>Songs on 🎶🌩️</NavLink>
            <NavLink to={`/albums`}>Albums on 🎶🌩️</NavLink> */}
            {/* <NavLink to={`/playlists`}>Playlists on 🎶🌩️</NavLink> */}
            <div >

            </div>
        </div>
    )
}

export default TestUserHome;

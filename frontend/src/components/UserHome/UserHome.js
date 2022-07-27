import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getUserDetail } from '../../store/user'

const TestUserHome = () => {
    return (
        <ul>
            <NavLink to={`/songs`}>Songs on 🎶🌩️</NavLink>
            <NavLink to={`/albums`}>Albums on 🎶🌩️</NavLink>
            <NavLink to={`/playlists`}>Playlists on 🎶🌩️</NavLink>
        </ul>
    )
}

export default TestUserHome;

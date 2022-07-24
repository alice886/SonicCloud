import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getUserDetail } from '../../store/user'

const TestUserHome = () => {
    return (
        <button>hello user home page</button>
    )
}

export default TestUserHome;

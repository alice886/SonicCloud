import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import '../../css-package/Navigation.css';

function ButtomNavigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='buttomnav'>

            <a className='back-to-top' href="#top">⬆️ Back to Top</a>

        </div>
    );
}

export default ButtomNavigation;

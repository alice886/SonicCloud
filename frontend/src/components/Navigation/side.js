import React from 'react';
import '../../css-package/Navigation.css'

const Sider = () => {

    return (
        <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <a href="#">About SonicCloud</a>
            <a href="#">About the Developer</a>
            <a href="#">Contact</a>
        </div>

    );
}
export default Sider;

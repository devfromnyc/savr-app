import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import SideNav from "./SideNav";

import { AuthContext } from '../../context/auth-context';

import './navigation.css';

const MainNav = () => {

    const auth = useContext(AuthContext);

    return (
          <nav className="main-header nav-wrapper">
            <NavLink to="/" className="brand-logo" exact="true">
                SAVR
            </NavLink>
            <ul className="right hide-on-med-and-down">
                {auth.isLoggedIn && (
                    <li>
                        <a className="modal-trigger" href="#modal1">Add Item</a>
                    </li>
                )}
                {auth.isLoggedIn && (
                    <li>
                        <a href="/">Logout</a>
                    </li>
                )}
            </ul>
            <SideNav />
        </nav>
    );
}

export default MainNav;

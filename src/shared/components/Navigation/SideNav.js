import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const SideNav = () => {
  return (
    <React.Fragment>
        <ul id="slide-out" className="sidenav">
            <li>
                <Link to="/" exact="true">
                    Home 
                </Link>
            </li>
            <li>
                <a className="modal-trigger" href="#modal1">Add Item</a>
            </li>
            <li>
                <a href="/">Logout</a>
            </li>
        </ul>
        <div data-target="slide-out" className="sidenav-trigger hide-on-large-only" role="button"><i className="material-icons hamburger-icon">☰</i></div>
    </React.Fragment>
  );
};

export default SideNav;
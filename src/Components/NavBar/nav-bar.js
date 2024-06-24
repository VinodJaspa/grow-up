import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdMenu, IoMdClose, IoMdGrid, IoMdStats, IoMdHappy, IoMdArrowUp, IoMdSettings ,IoMdHome} from 'react-icons/io';
import Divider from '@mui/material/Divider';
import './navbar.css';

import { getDarkTheme, getLightTheme } from '../../Theme/theme';
import { FaHeart } from 'react-icons/fa';
import AccountMenu from '../AccountMenu/userAccountMenu';



function Navbar({ themeMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const setFont = () => {
    document.body.classList.toggle('font-size');
  };

  return (
    <>
      <div className='menu-btn'>
        <button className="toggle-btn" onClick={toggleNavbar}>
          {!isOpen ? <IoMdMenu /> : <IoMdClose />}
        </button>
        <AccountMenu/>
      </div>
      <nav className={`navbar ${isOpen ? '' : 'closed'} ${themeMode === 'dark' ? 'dark-theme' : 'light-theme'}`}>
        <button className="close-btn" onClick={toggleNavbar}>
          {isOpen && <IoMdClose />}
        </button>
        <ul>
        <Divider component="li" />
        <li><NavLink  to="/" activeclassname="active"><IoMdHome className="icon" /><span className="link-text">Home</span></NavLink></li>

          <li><NavLink  to="/table" activeclassname="active"><IoMdGrid className="icon" /><span className="link-text">Table View</span></NavLink></li>
          <li><NavLink  to="/graph" activeclassname="active"><IoMdStats className="icon" /><span className="link-text">Graph View</span></NavLink></li>
          <li><NavLink  to="/mood" activeclassname="active"><IoMdHappy className="icon" /><span className="link-text">Mood Tracker</span></NavLink></li>
          <li><NavLink  to="/growth" activeclassname="active"><IoMdArrowUp className="icon" /><span className="link-text">Growth</span></NavLink></li>
    
        </ul>
        <div className="made-with-love">
          Made with <FaHeart className="love-icon" fill='red' /> by Vinod Jaspa
        </div>
      </nav>
    </>
  );
}

export default Navbar;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdMenu, IoMdClose, IoMdGrid, IoMdStats, IoMdHappy, IoMdArrowUp, IoMdSettings } from 'react-icons/io';

import './navbar.css';
import Settings from '../Settings/settings';
import { darkTheme, lightTheme } from '../../Theme/theme';
import { FaHeart } from 'react-icons/fa';

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
      </div>
      <nav className={`navbar ${isOpen ? '' : 'closed'} ${themeMode === 'dark' ? 'dark-theme' : 'light-theme'}`} style={{ backgroundColor: themeMode === 'dark' ? darkTheme.palette.background.navbar : lightTheme.palette.background.navbar }}>
        <button className="close-btn" onClick={toggleNavbar}>
          {isOpen && <IoMdClose />}
        </button>
        <ul>
          <li><NavLink exact to="/table" activeClassName="active"><IoMdGrid className="icon" /><span className="link-text">Table View</span></NavLink></li>
          <li><NavLink exact to="/graph" activeClassName="active"><IoMdStats className="icon" /><span className="link-text">Graph View</span></NavLink></li>
          <li><NavLink exact to="/mood" activeClassName="active"><IoMdHappy className="icon" /><span className="link-text">Mood Tracker</span></NavLink></li>
          <li><NavLink exact to="/growth" activeClassName="active"><IoMdArrowUp className="icon" /><span className="link-text">Growth</span></NavLink></li>
          <li>
            
              <IoMdSettings className="icon" />
              <span className="link-text" onClick={toggleSubMenu}>Settings</span>
              {isSubMenuOpen && <Settings setFont={setFont} />}
    
          </li>
        </ul>
        <div className="made-with-love">
          Made with <FaHeart className="love-icon" fill='red' /> by Adventure-to-Wild
        </div>
      </nav>
    </>
  );
}

export default Navbar;

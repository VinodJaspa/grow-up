import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMenu, IoMdClose, IoMdGrid, IoMdStats, IoMdHappy, IoMdArrowUp, IoMdSettings } from 'react-icons/io';

import './navbar.css';
import Settings from '../Settings/settings';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // State for submenu

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const setFont =()=>{
    document.body.classList.toggle('font-size');
  }

  return (
    <>
      <div className='menu-btn'>
        <button className="toggle-btn" onClick={toggleNavbar}>
          {!isOpen ? <IoMdMenu /> : <IoMdClose />}
        </button>
      </div>
      <nav className={`navbar ${isOpen ? '' : 'closed'}`}>
        <button className="close-btn" onClick={toggleNavbar}>
          {isOpen && <IoMdClose />}
        </button>
        <ul>
          <li><Link to="/table"><IoMdGrid className="icon" /><span className="link-text">Table View</span></Link></li>
          <li><Link to="/graph"><IoMdStats className="icon" /><span className="link-text">Graph View</span></Link></li>
          <li><Link to="/mood"><IoMdHappy className="icon" /><span className="link-text">Mood Tracker</span></Link></li>
          <li><Link to="/growth"><IoMdArrowUp className="icon" /><span className="link-text">Growth</span></Link></li>
          <li>

              <IoMdSettings className="icon" />
              <span className="link-text" onClick={toggleSubMenu}>Settings</span>

              {isSubMenuOpen && <Settings  setFont={setFont} />} 
        


          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

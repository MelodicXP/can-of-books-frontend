import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './App.css';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className='nav-bar-brand'>My Favorite Books</Navbar.Brand>
        <NavItem className='nav-links'><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem className='nav-links'><Link to="/about" className="nav-link">About</Link></NavItem>
      </Navbar>
    )
  }
}

export default Header;

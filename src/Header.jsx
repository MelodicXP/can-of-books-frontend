import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './App.css';

class Header extends React.Component {
  render() {

    const { onAddBookClick } = this.props; // Destructure onAddBookClick from props (pass into NavItem 'Add Book Here')

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className='nav-bar-brand'>My Favorite Books</Navbar.Brand>
        <NavItem className='nav-links'><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem className='nav-links'><Link to="/about" className="nav-link">About</Link></NavItem>
        <NavItem onClick={onAddBookClick} className='nav-links'>Add Book Here!</NavItem>
      </Navbar>
    )
  }
}

export default Header;

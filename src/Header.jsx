import React from 'react';
import { Navbar, NavItem, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './App.css';
import LoginButton from './Login';
import LogoutButton from './Logout';
import { withAuth0 } from '@auth0/auth0-react';

class Header extends React.Component {
  render() {

    const { onAddBookClick } = this.props; // Destructure onAddBookClick from props (pass into NavItem 'Add Book Here')

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className='nav-bar-brand'>My Favorite Books</Navbar.Brand>

        <Container>
          <Row>

            <Col><NavItem className='nav-links'><Link to="/" className="nav-link">Home</Link></NavItem></Col>
            <Col><NavItem className='nav-links'><Link to="/about" className="nav-link">About</Link></NavItem></Col>
            <Col><NavItem className='nav-links'><Link to="/profile" className="nav-link">Profile</Link></NavItem></Col>
            {/* <Col><NavItem onClick={onAddBookClick} className='nav-links' id="add-book-button"><Button>Add Book Here!</Button></NavItem></Col> */}

          </Row>
        </Container>

        {this.props.auth0.isAuthenticated ? <Button id="add-book-button" onClick={onAddBookClick}>Add Book Here!</Button> : null}
        {this.props.auth0.isAuthenticated ? <LogoutButton/> : <LoginButton /> }
        
      </Navbar>
    )
  }
}

export default withAuth0(Header);

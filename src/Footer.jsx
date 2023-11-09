import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import './App.css';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className='nav-bar-brand'>Code Fellows</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;

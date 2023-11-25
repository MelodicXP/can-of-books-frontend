import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import Welcome from './Welcome';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './Profile';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false, // Set state of modal visiblity
      showUpdateModal: false, // Set state of update modal visiblity
    };
  }

  // Toggle modal visibility (pass into Header and BestBooks)
  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  // Toggle update modal visibility (pass into BestBooks, each books has update book button tied to a modal)
  toggleUpdateModal = () => {
    this.setState(prevState => ({ showUpdateModal: !prevState.showUpdateModal }));
  }


  render() {

    const { isAuthenticated } = this.props.auth0;

    return (
      <>
        <Router>
          <Header onAddBookClick={this.toggleModal} />
          <Routes>

            <Route 
              exact path="/"
              element={
                isAuthenticated ?
                <BestBooks 
                  showModal={this.state.showModal} 
                  toggleModal={this.toggleModal}
                  showUpdateModal={this.state.showUpdateModal}
                  toggleUpdateModal={this.toggleUpdateModal}
                />
                : <Welcome />
              }
            />

            <Route
              exact path="/about"
              element={<About />}
            />

            <Route 
              path={'/profile'}
              element={<Profile/>}
            />    

          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);

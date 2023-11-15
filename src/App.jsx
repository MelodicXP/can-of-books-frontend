import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false, // Set state of modal visiblity
    };
  }

  // Toggle modal visibility (pass into Header and BestBooks)
  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }


  render() {
    return (
      <>
        <Router>
          <Header onAddBookClick={this.toggleModal} />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks showModal={this.state.showModal} toggleModal={this.toggleModal} />}
            />
            <Route
              exact path="/about"
              element={<About />}
            />
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;

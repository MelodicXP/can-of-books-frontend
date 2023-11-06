import axios from 'axios';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './App.css';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    axios.get('http://localhost:3001/books')
      .then(res => this.setState( {books: res.data} ) )
  }

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length > 0 ? (
          <Carousel data-bs-theme="dark">
            {this.state.books.map((book) => (
              <Carousel.Item key={book._id} className='carousel-item'>
                <img src={book.imageUrl}  alt={book.title} />
                <Carousel.Caption className='carousel-caption'>
                  <h3>{book.title}</h3>
                  <p>{book.description} <br /></p>
                  <p>{`Status: ${book.status}`}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;

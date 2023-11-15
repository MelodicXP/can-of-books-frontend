import axios from 'axios';
import React from 'react';
import { Carousel, Button, Modal, Spinner } from 'react-bootstrap';
import './App.css';
import './AddBookFormModal';
import AddBookForm from './AddBookFormModal';
const SERVER = import.meta.env.VITE_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: null, // Error state for fetching books (if unsuccessful)
      postError: null, // Error state for posting books (if unsuccessful)
      deleteError: null, // Error state for deleting books (if unsuccessful)
      deletingBookId: null, // Keep track of which book is being deleted, used to show spinner and disable delete button
      postSuccess: null, // Success state for posting books (if successful)
      deleteSuccess: null, // Success state for deleting books (if successful)
    }
  }

  // Make a GET request to your API to fetch all the books from the database 
  componentDidMount() {
    axios.get(`${SERVER}/books`)
      .then(res => this.setState( {books: res.data} ) )
      .catch(error => {
        // Handle error
        this.setState({ error: error.message });
        console.error("Error fetching the books:", error);
      });
  }

  // Post new book to database
  postBook = (newBook) => {
    const url = `${SERVER}/books`
    axios.post(url, newBook)
      .then(response => this.setState({
        books: [...this.state.books, response.data], // Add new data to books state (books: []), in order to be able to render
        postError: null, // Clear any previous errors
        postSuccess: 'Book has been added successfully!', // Success message state
      }))
      .catch(error => {
        // Handle POST error here and update state
        this.setState({ 
          postError: 'Failed to add the book. Please try again.',
          postSuccess: null,
         });
        console.error("Error posting the book:", error);
      });
  }

  // Delete book from databse
  deleteBook = (id) => {
    this.setState({ deletingBookId: id }); // Indicate which book being deleted

    const url = `${SERVER}/books/${id}`;
    axios.delete(url)
      .then(() => {
        const updatedBooks = this.state.books.filter(book => book._id !== id); // Return books array minus deleted book
        this.setState({ // Update books, and reset states to null, set success message
          books: updatedBooks, 
          deleteError: null, 
          deletingBookId: null,
          deleteSuccess: 'Book has been removed successfully!',
         });
      })
      .catch(error => {
        console.error("Error deleting the book:", error);
        this.setState({  // Set error message, reset states to null
          deleteError: 'Failed to delete the book. Please try again.', 
          deletingBookId: null, 
          deleteSuccess: null,
         }); 
      });
  }

  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Modal show={this.props.showModal} onHide={this.props.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddBookForm postBook={this.postBook} onClose={this.props.toggleModal}/>
          </Modal.Body>
        </Modal>

        {this.state.error && <p className="error-message">Error: {this.state.error}</p>}
        {this.state.deleteError && <p className="error-message">{this.state.deleteError}</p>}
        {this.state.postError && <p className="error-message">{this.state.postError}</p>}
        {this.state.deleteSuccess && <p className="success-message">{this.state.deleteSuccess}</p>}
        {this.state.postSuccess && <p className="success-message">{this.state.postSuccess}</p>}

        {this.state.books.length > 0 ? (

          // Force to render only length of array (this.state.books.length), useful for when deleting book,won't leave empty carousel item behind.
          <Carousel data-bs-theme="dark" key={this.state.books.length}> 
            {this.state.books.map((book) => (

              <Carousel.Item key={book._id} className='carousel-item'>

                <img src={book.imageUrl}  alt={book.title} />

                <Carousel.Caption className='carousel-caption'>

                  <h3>{book.title}</h3>
                  <p>{book.description} <br /></p>
                  <p>{`Status: ${book.status}`}</p>
                  
                  <Button 
                    className='delete-button' 
                    variant="danger" 
                    onClick={() => this.deleteBook(book._id)}
                  >
                     {this.state.deletingBookId === book._id ? <Spinner as="span" animation="border" size="sm" /> : 'Delete Book'}
                  </Button>

                </Carousel.Caption>

              </Carousel.Item>
            ))}
          </Carousel>

        ) : (
          this.state.error ? <h3>Error loading books.</h3> : <h3>No Books Found :(</h3>
        )}
      </>
  
    )
  }
}

export default BestBooks;

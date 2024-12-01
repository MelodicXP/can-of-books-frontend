import axios from 'axios';
import React from 'react';
import { Carousel, Button, Modal, Spinner } from 'react-bootstrap';
import './App.css';
import './AddBookFormModal';
import AddBookForm from './AddBookFormModal';
import UpdateBookForm from './UpdateBookFormModal';
import { withAuth0 } from '@auth0/auth0-react';

const SERVER = import.meta.env.VITE_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: null, // Error state for fetching books (if unsuccessful)

      postError: null, // Error state for posting books (if unsuccessful)
      postSuccess: null, // Success state for posting books (if successful)

      deleteError: null, // Error state for deleting books (if unsuccessful)
      deletingBookId: null, // Keep track of which book is being deleted, used to show spinner and disable delete button
      deleteSuccess: null, // Success state for deleting books (if successful)

      bookToUpdate: {}, // Empty object to hold data of book to be updated

      updateError: null, // Error state for updating books (if unsuccessful)
      updateSuccess: null, // Success state for updating books (if successful)
    }
  }

  // Mount books
  async componentDidMount () {
    this.getBooks();
  }

  // Get token from user info, to send along to back-end for verification of Auth0
  getToken = () => {
    return this.props.auth0.getIdTokenClaims() // getIdTokenClaims is a method of Auth0 to get user token
      // .then(response => console.log(response)) --> do console.log to confirm data needed coming through (need ._raw which contains token)
      .then(response => response.__raw) // <--- Remember to use two underscores!
      .catch(err => console.error(err))
  }

  // Make a GET request to your API to fetch all the books from the database 
  getBooks = () => {

    // this.getToken(); ---> invoke function to test if able to retrieve user data along with token
    
    // Assign token to jwt via getToken function
    this.getToken()
    .then(jwt => {
      // Assign jwt (contains token) to headers
      const config = {
        headers: { 'Authorization': `Bearer ${jwt}` }
      };

      console.log(config);
      // Pass book request along with config, allows backend to validate user auth prior to sending books data back
      return axios.get(`${SERVER}/books`, config);
    })
    .then(res => this.setState({ books: res.data }))
    .catch(error => {
      // Handle errors from either getToken or axios.get
      console.error("Error in getBooks:", error);
      this.setState({ error: error.message });
    });
  }

  // Post new book to database
  postBook = async (newBook) => {
    const url = `${SERVER}/books`;

    this.getToken()
      .then(jwt => {
        // Assign jwt (contains token) to headers
        const config = {
          headers: { 'Authorization': `Bearer ${jwt}` }
        };

        // Perform the POST request with axios
        return axios.post(url, newBook, config);
      })
      .then(response => {
        // Handle successful response
        this.setState({
          books: [...this.state.books, response.data], // Add new data to books state
          postError: null, // Clear any previous errors
          postSuccess: 'Book has been added successfully!' // Success message state
        });
      })
      .catch(error => {
        // Handle any errors from either getToken or axios.post
        console.error("Error posting the book:", error);
        this.setState({ 
          postError: 'Failed to add the book. Please try again.',
          postSuccess: null,
        });
      });
  }

  // Update book in database
  updateBook = (bookToUpdate) => {

    const url = `${SERVER}/books/${bookToUpdate._id}`;

    this.getToken()
    .then(jwt => {
      // Assign jwt (contains token) to headers
      const config = {
        headers: { 'Authorization': `Bearer ${jwt}` }
      };

      // Perform PUT request with axios
      return axios.put(url, bookToUpdate, config);
    })
    .then(() => {
      // Update state with updated book
      const updatedBooks = this.state.books.map(oldBook => 
        oldBook._id === bookToUpdate._id ? bookToUpdate : oldBook
      );
      this.setState({
        books: updatedBooks,
        updateError: null,
        updatingBookId: null,
        updateSuccess: 'Books has been successfully updated!',
      });
    })
    .catch(error => {
      // Handle any errors from either getToken or axios.put
      console.error("Error updating the book:", error);
      this.setState({ 
        updateError: 'Failed to update the book. Please try again.', 
        updatingBookId: null, 
        updateSuccess: null,
      }); 
    });
  }

  // Delete book from databse
  deleteBook = (id) => {
    this.setState({ deletingBookId: id }); // Indicate which book being deleted

    const url = `${SERVER}/books/${id}`;

    this.getToken()
    .then(jwt => {
      // Assign jwt (contains token) to headers
      const config = {
        headers: { 'Authorization': `Bearer ${jwt}` }
      };

      // Perform DELETE request with axios
      return axios.delete(url, config);
    })
    .then(() => {
      // Update state to remove the deleted book
      const updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({ 
        books: updatedBooks, 
        deleteError: null, 
        deletingBookId: null,
        deleteSuccess: 'Book has been removed successfully!',
      });
    })
    .catch(error => {
      // Handle any errors from either getToken or axios.delete
      console.error("Error deleting the book:", error);
      this.setState({ 
        deleteError: 'Failed to delete the book. Please try again.', 
        deletingBookId: null, 
        deleteSuccess: null,
      }); 
    });
  }

    // Handle update button clicks
    handleUpdateClick = (book) => {
      this.props.toggleUpdateModal(); // First action, update state of modal to show
      this.setState({bookToUpdate: book}); // Second action, set state of book to update with data from existing book
    };


  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Modal show={this.props.showModal} onHide={this.props.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddBookForm 
            postBook={this.postBook} 
            onClose={this.props.toggleModal}/>
          </Modal.Body>
        </Modal>

        <Modal show={this.props.showUpdateModal} onHide={this.props.toggleUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UpdateBookForm 
            updateBook={this.updateBook} 
            onClose={this.props.toggleUpdateModal}
            bookToUpdate={this.state.bookToUpdate}
            />
          </Modal.Body>
        </Modal>


        {this.state.error && <p className="error-message">Error: {this.state.error}</p>}
        
        {this.state.deleteError && <p className="error-message">{this.state.deleteError}</p>}
        {this.state.deleteSuccess && <p className="success-message">{this.state.deleteSuccess}</p>}

        {this.state.postSuccess && <p className="success-message">{this.state.postSuccess}</p>}
        {this.state.postError && <p className="error-message">{this.state.postError}</p>}

        {this.state.updateSuccess && <p className="success-message">{this.state.updateSuccess}</p>}
        {this.state.updateError && <p className="error-message">{this.state.updateError}</p>}

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
                    className='update-button' 
                    variant="secondary" 
                    onClick={() => this.handleUpdateClick(book)}
                  >
                     Update Book
                  </Button>
                  
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

export default withAuth0(BestBooks);

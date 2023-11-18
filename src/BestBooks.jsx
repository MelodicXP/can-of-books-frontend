import axios from 'axios';
import React from 'react';
import { Carousel, Button, Modal, Spinner } from 'react-bootstrap';
import './App.css';
import './AddBookFormModal';
import AddBookForm from './AddBookFormModal';
import UpdateBookForm from './UpdateBookFormModal';
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

  // Update book in database
  updateBook = (bookToUpdate) => {
    const url = `${SERVER}/books/${bookToUpdate._id}`;
    axios.put(url, bookToUpdate)
      .then(() => {
        const updatedBooks = this.state.books.map(oldBook => oldBook._id === bookToUpdate._id ? bookToUpdate : oldBook);
        this.setState({
          books: updatedBooks,
          updateError: null,
          updatingBookId: null,
          updateSuccess: 'Books has been successfully updated!',
        });
      })
      .catch(error => {
        console.error("Error updating the book:", error);
        this.setState({  // Set error message, reset states to null
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

export default BestBooks;

import { Component } from "react";
import { Form, Container, Button, Spinner } from 'react-bootstrap';


class UpdateBookForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      updatingBookId: null, // Keep track of which book being updated, used to show spinner and disable update button
      status: props.bookToUpdate?.status || 'Complete', //If no status, default selection will be 'Complete'
    }
  }

  // Handles status change of book when user updating
  handleStatusChange = (e) => {
    this.setState({ status: e.target.value });
  };

  // Handle what occurs when submit button pressed on update book button
  submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const bookToUpdate = this.props.bookToUpdate;

    const updatedBook = {
      title: form.title.value || bookToUpdate.title,
      description: form.description.value || bookToUpdate.description,
      imageUrl: form.imageUrl.value || bookToUpdate.imageUrl,
      status: this.state.status, // Use status from the state
      _id: bookToUpdate._id
    }

    this.props.updateBook(updatedBook);
    this.props.onClose(); // Call onClose prop to close modal
  }

  render() {
    const bookToUpdate = this.props.bookToUpdate;

    return (

      <Container>
        <Form onSubmit={this.submitHandler}>

          <Form.Group controlId="title">
            <Form.Label>Book Title</Form.Label>
            <Form.Control type ="text" placeholder={bookToUpdate.title}/>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Book Description</Form.Label>
            <Form.Control type ="text" placeholder={bookToUpdate.description}/>
          </Form.Group>

          <Form.Group controlId="imageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type ="text" placeholder={bookToUpdate.imageUrl}/>
          </Form.Group>

           {/* Radio buttons for status */}
           <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Check 
              type="radio" 
              label="Completed" 
              name="status" 
              value="Completed"
              id="statusCompleted" // unique ID for the label's htmlFor
              checked={this.state.status === 'Completed'}
              onChange={this.handleStatusChange}
            />
            <Form.Check 
              type="radio" 
              label="In Progress" 
              name="status" 
              value="In Progress"
              id="statusInProgress"
              checked={this.state.status === 'In Progress'}
              onChange={this.handleStatusChange}
            />
            <Form.Check 
              type="radio" 
              label="Want to Read" 
              name="status" 
              value="Want to Read"
              id="statusWantToRead"
              checked={this.state.status === 'Want to Read'} 
              onChange={this.handleStatusChange}
            />
          </Form.Group>

          <Button type="submit">
            {this.state.updatingBookId === bookToUpdate._id ? <Spinner as="span" animation="border" size="sm" /> : 'Update Book'}
          </Button>

        </Form>

      </Container>

    )
  }
}

export default UpdateBookForm;
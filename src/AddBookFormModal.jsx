import { Component } from "react";
import { Form, Container, Button } from 'react-bootstrap';


class AddBookForm extends Component {

  submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    
    const newBook = {
      title: form.title.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      status: form.status.value
    }

    this.props.postBook(newBook);
    this.props.onClose(); // Call onClose prop to close modal
  }

  render() {
    return (

      <Container>
        <Form onSubmit={this.submitHandler}>

          <Form.Group controlId="title">
            <Form.Label>Book Title</Form.Label>
            <Form.Control type ="text"/>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Book Description</Form.Label>
            <Form.Control type ="text"/>
          </Form.Group>

          <Form.Group controlId="imageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type ="text"/>
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
            />
            <Form.Check 
              type="radio" 
              label="In Progress" 
              name="status" 
              value="In Progress"
              id="statusInProgress"
            />
            <Form.Check 
              type="radio" 
              label="Want to Read" 
              name="status" 
              value="Want to Read"
              id="statusWantToRead"
            />
          </Form.Group>

          <Button type="submit">Add Book</Button>

        </Form>

      </Container>

    )
  }
}

export default AddBookForm;

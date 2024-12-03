import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

const Book = (props) => {
  const { book } = props;

  return (
    <>
      <img src={book.imageUrl} alt={book.title} />
      <Carousel.Caption>
        <h3>{book.title}</h3>
        <p>{book.description}</p>
      </Carousel.Caption>
    </>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired
};
export default Book;
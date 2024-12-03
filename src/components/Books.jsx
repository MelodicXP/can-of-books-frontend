import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import Book from './Book';

const Books = (props) => {
  const { books } = props;
  console.log('Props from books component: ', books);

  // If movieData is empty or undefined, return a fallback placeholder.
  if (!books || books.length === 0) {
    return <p>No books to display</p>;
  }

  // Todo - Work on carousel
  return (
    <>
      <Carousel data-bs-theme="dark">
        {books.map((book) => (
          <Carousel.Item key={book._id}>
            <Book book={book} />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

Books.propTypes = {
  books: PropTypes.array.isRequired
};

export default Books;

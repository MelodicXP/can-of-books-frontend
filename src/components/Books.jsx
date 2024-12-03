import PropTypes from 'prop-types';
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
      {books.map((book) => (
        <Book book={book} key={book._id}/>
      ))}
    </>
  );
};

Books.propTypes = {
  books: PropTypes.array.isRequired
};

export default Books;

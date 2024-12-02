import PropTypes from 'prop-types';

const Books = (props) => {
  const { books } = props;
  console.log('Props from books component: ', books);

  // If movieData is empty or undefined, return a fallback placeholder.
  if (!books || books.length === 0) {
    return <p>No books to display</p>;
  }

  return (
    <>
      {books.length && books.map((book, index) => (
        <div key={index}>
          {book.title}
        </div>
      ))}
    </>
  );
};

Books.propTypes = {
  books: PropTypes.array.isRequired
};

export default Books;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { books } from "./books";
import Book from "./Book";
import EventExamplesUsingForm from "./EventExamplesUsingForm";

// //children props :
// const firstBook = {
//   author: "Jordan Moore",
//   title: "Interesting Facts For Curious Minds",
//   img: "./images/book-img.jpg",
// };
// const secondBook = {
//   author: "James Clear",
//   title: "Atomic Habits",
//   img: "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL._AC_UL900_SR900,600_.jpg",
// };

// function BookList() {
//   return (
//     <section className="booklist">
//       <Book
//         author={firstBook.author}
//         title={firstBook.title}
//         img={firstBook.img}
//       >
//         <p>click button bellow</p>
//         <button>1st book only button </button>
//       </Book>

//       <Book
//         author={secondBook.author}
//         title={secondBook.title}
//         img={secondBook.img}
//       />
//     </section>
//   );
// }

// const Book = (props) => {
//   console.log("props:");
//   console.log(props);
//   const { img, title, author, children } = props;
//   return (
//     <article className="book">
//       <img src={img} alt={title} />
//       <h2>{title}</h2>
//       <h4>{author} </h4>
//       {children}
//     </article>
//   );
// };

//###########################

function BookList() {
  const getBook = (id) => {
    const book = books.find((book) => book.id === id);
    console.log(book);
  };
  return (
    <section className="booklist">
      <EventExamplesUsingForm />
      {books.map((book, index) => {
        console.log(book);
        //const { img, title, author, id } = book;
        //return <Book img={img} title={title} author={author} key={id} />;
        return (
          <Book {...book} key={book.id} getBook={getBook} number={index} />
        );
      })}
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<BookList />);

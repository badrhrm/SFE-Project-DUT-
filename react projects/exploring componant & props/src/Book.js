const Book = (props) => {
  const { img, title, author, getBook, id, number } = props;
  const displayTitle = () => alert(title);
  //option 1 : (in all options we needed to make a function that returns getBook(id) func because alone it gets executed immediately so we put it inside other function so we can execute it when we click)
  // const getSingleBook = () => {
  //   getBook(id);
  // };
  //option 2:
  getBook(id);
  return (
    <article className="book">
      <img src={img} alt={title} />
      <h1 className="number">{`# ${number + 1}`}</h1>
      <h2>{title}</h2>
      <h4>{author} </h4>
      <button onClick={displayTitle}>display title</button>
      {/*option 1 :*/}
      {/*<button onClick={getSingleBook}>get book by id</button>*/}
      {/*option 2 :*/}
      <button onClick={() => getBook(id)}>get book by id</button>
    </article>
  );
};

export default Book;

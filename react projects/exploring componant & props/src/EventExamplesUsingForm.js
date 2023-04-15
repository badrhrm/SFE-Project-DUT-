const EventExamplesUsingForm = () => {
  const handleFormInput = (e) => {
    //console.log("handle form input");
    console.log(e.target);
    console.log(e.target.name);
    console.log(e.target.value);
  };
  const handleButtonClick = () => {
    alert("handle button click");
  };
  const handleFormSubmission = (e) => {
    e.preventDefault(); // to prevent some default behavior that sends info into url so now we can handle form by ourselves
    console.log("form submitted");
  };
  return (
    <section>
      <form onSubmit={handleFormSubmission}>
        <h2>Typical Form</h2>
        <input
          type="text"
          name="example"
          style={{ margin: "1rem 0" }}
          onChange={handleFormInput}
        />
        <div>
          <button onClick={handleButtonClick}>click me</button>
        </div>
        {/*these two button do the same thing*/}
        <button type="submit">submit form 1</button>
        <button type="button" onClick={handleFormSubmission}>
          submit form 2
        </button>
      </form>
    </section>
  );
};

export default EventExamplesUsingForm;

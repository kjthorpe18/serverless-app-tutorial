import React, { useState } from "react";
import axios from "axios";

const initialValues = {
  name: "",
  year: "",
  rating: ""
};

const App = () => {
  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        "https://example.execute-api.us-east-2.amazonaws.com/create-movie-rating",
        {
          name: values.name,
          year: values.year,
          rating: values.rating,
        }
      )
      .then((response) => {
        console.log(response);
        setResult("Successfully rated movie!")

      })
      .catch((error) => {
        console.log(error);
        setResult("Something went wrong!")
      });
  }

  return (
    <div className="App">
      <form onSubmit={e => handleSubmit(e)}>
        <label>Name:</label><br />

        <input type="text" name="name" value={values.name} onChange={e => handleInputChange(e)} id="name"></input><br />
        <br />

        <label>Year:</label><br />
        <input type="text" name="year" value={values.year} onChange={e => handleInputChange(e)} id="year"></input><br />
        <br />

        <label>Rating:</label><br />
        <input type="text" name="rating" value={values.rating} onChange={e => handleInputChange(e)} id="rating"></input><br />
        <br />

        <input type="submit" id="submit-button"></input>
      </form>

      <p>{result}</p>
    </div>
  );
}

export default App;

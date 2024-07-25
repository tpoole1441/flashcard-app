import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const results = await createDeck(formData);
      navigate(`/decks/${results.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="bi bi-house-door-fill"> </i>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Name
          </label>
          <br />
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Deck Name"
            onChange={handleChange}
          />
          <br />
          <label for="description" className="form-label">
            Description
          </label>
          <br />
          <textarea
            name="description"
            className="form-control"
            rows="4"
            placeholder="Brief description of the deck"
            onChange={handleChange}
          />
        </div>
        <Link to="/" className="btn btn-secondary mr-3">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateDeck;

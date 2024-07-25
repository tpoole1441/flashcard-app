import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";

function EditDeck() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    id: `${deckId}`,
  });

  useEffect(() => {
    (async function () {
      const decks = await readDeck(deckId);
      setDeck(decks);
      setFormData({
        name: decks.name || "",
        description: decks.description || "",
        id: deckId,
      });
    })();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const results = await updateDeck(formData);
      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error editing deck:", error);
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
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Name
          </label>
          <br />
          <input
            name="name"
            value={formData.name}
            type="text"
            className="form-control"
            placeholder={deck.name}
            onChange={handleChange}
          />
          <br />
          <label for="description" className="form-label">
            Description
          </label>
          <br />
          <textarea
            name="description"
            value={formData.description}
            className="form-control"
            rows="4"
            placeholder={deck.description}
            onChange={handleChange}
          />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-3">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default EditDeck;

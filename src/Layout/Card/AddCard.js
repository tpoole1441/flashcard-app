import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";

function AddCard() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  useEffect(() => {
    (async function () {
      const decks = await readDeck(deckId);
      setDeck(decks);
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
      const results = await createCard(deckId, formData);
      navigate(`/decks/${deckId}`);
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
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{deck.name}: Add Card</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="front" className="form-label">
            Front
          </label>
          <br />
          <textarea
            name="front"
            className="form-control"
            rows="2"
            placeholder="Front side of card"
            onChange={handleChange}
          />
          <br />
          <label for="back" className="form-label">
            Back
          </label>
          <br />
          <textarea
            name="back"
            className="form-control"
            rows="2"
            placeholder="Back side of card"
            onChange={handleChange}
          />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-3">
          Done
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </>
  );
}

export default AddCard;

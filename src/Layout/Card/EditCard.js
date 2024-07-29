import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../../utils/api";

function EditCard() {
  const navigate = useNavigate();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [formData, setFormData] = useState({
    front: card.front,
    back: card.back,
    id: `${cardId}`,
    deckId: Number(deckId),
  });

  useEffect(() => {
    (async function () {
      const decks = await readDeck(deckId);
      const cards = await readCard(cardId);
      setDeck(decks);
      setCard(cards);
      setFormData({
        front: cards.front || "",
        back: cards.back || "",
        id: `${cardId}`,
        deckId: Number(deckId),
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
      const results = await updateCard(formData);
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
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="front" className="form-label">
            Front
          </label>
          <br />
          <textarea
            name="front"
            value={formData.front}
            className="form-control"
            rows="2"
            onChange={handleChange}
          />
          <br />
          <label for="back" className="form-label">
            Back
          </label>
          <br />
          <textarea
            name="back"
            value={formData.back}
            className="form-control"
            rows="2"
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

export default EditCard;

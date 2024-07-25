import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";

function Deck() {
  const navigate = useNavigate();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    (async function () {
      const decks = await readDeck(deckId);
      setDeck(decks);
      setCards(decks.cards);
    })();
  }, []);

  async function handleDeleteDeck(deckId) {
    try {
      if (window.confirm("Delete this deck?")) {
        const signal = AbortController.signal;
        await deleteDeck(deckId, signal);
        navigate("/");
      }
    } catch (error) {
      console.error(`Error deleting deck ${deckId}`, error);
    }
  }

  async function handleDeleteCard(cardId) {
    try {
      if (window.confirm("Delete this card?")) {
        const signal = AbortController.signal;
        await deleteCard(cardId, signal);
        const decks = await readDeck(deckId);
        setCards(decks.cards);
      }
    } catch (error) {
      console.error(`Error deleting deck ${deckId}`, error);
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="bi bi-house-door-fill"> </i>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
        <i class="bi bi-pencil-fill"> </i>
        Edit
      </Link>
      <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
        <i className="bi bi-journal-bookmark-fill"> </i>
        Study
      </Link>
      <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mr-2">
        <i className="bi bi-plus-lg"> </i>
        Add Cards
      </Link>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => handleDeleteDeck(deckId)}
      >
        <i className="bi bi-trash-fill"></i>
      </button>
      <h1 className="mt-4">Cards</h1>
      {cards.map(({ front, back, id }) => (
        <div className="card" style={{ width: "36rem" }}>
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col card-text">{front}</div>
                <div className="col card-text">{back}</div>
              </div>
            </div>
            <div className="mt-3 d-grid gap-2 d-md-flex justify-content-md-end">
              <Link
                to={`/decks/${deckId}/cards/${id}/edit`}
                className="btn btn-secondary mr-2"
              >
                <i class="bi bi-pencil-fill"> </i>
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDeleteCard(id)}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;

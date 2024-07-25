import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    (async function () {
      const decks = await listDecks();
      setDecks(decks);
    })();
  }, []);

  async function handleDeleteDeck(deckId) {
    try {
      if (window.confirm("Delete this deck?")) {
        const signal = AbortController.signal;
        await deleteDeck(deckId, signal);
        const decks = await listDecks();
        setDecks(decks);
      }
    } catch (error) {
      console.error(`Error deleting deck ${deckId}`, error);
    }
  }

  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary">
        <i className="bi bi-plus-lg"> </i>
        Create Deck
      </Link>
      {decks.map(({ name, description, id, cards }) => (
        <div className="card my-3" style={{ width: "36rem" }}>
          <div className="card-body">
            <h5
              className="card-title"
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>{name}</span>
              <span className="small">{cards.length} cards</span>
            </h5>
            <p className="card-text">{description}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>
                <Link to={`/decks/${id}`} className="btn btn-secondary mr-2">
                  <i className="bi bi-eye-fill"> </i>
                  View
                </Link>
                <Link
                  to={`/decks/${id}/study`}
                  className="btn btn-primary mr-2"
                >
                  <i className="bi bi-journal-bookmark-fill"> </i>
                  Study
                </Link>
              </span>
              <span>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteDeck(id)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;

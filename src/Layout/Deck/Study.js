import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../../utils/api";

function Study() {
  const navigate = useNavigate();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const { deckId } = useParams();

  useEffect(() => {
    (async function () {
      const decks = await readDeck(deckId);
      setDeck(decks);
      setCards(decks.cards);
    })();
  }, []);

  const handleFlip = () => {
    setShowBack(!showBack);
  };

  const handleNext = () => {
    setShowBack(false);
    if (currentCardIndex == cards.length - 1) {
      if (window.confirm("Restart cards")) {
        setCurrentCardIndex(0);
        setShowBack(false);
      } else {
        navigate("/");
      }
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const card = cards[currentCardIndex];

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
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Study</h2>
      {cards.length < 3 ? (
        <>
          <h3>Not enough cards.</h3>
          <p>
            You need at least 3 cards to study. There are {cards.length} cards
            in this deck.
          </p>
          <Link
            to={`/decks/${deckId}/cards/new`}
            className="btn btn-primary mr-2"
          >
            <i className="bi bi-plus-lg"> </i>
            Add Cards
          </Link>
        </>
      ) : (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {currentCardIndex + 1} of {cards.length}
            </h5>
            <p className="card-text">
              {showBack ? <p>{card.back}</p> : <p>{card.front}</p>}
            </p>
            <button className="btn btn-secondary mr-2" onClick={handleFlip}>
              Flip
            </button>
            {showBack && (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Study;

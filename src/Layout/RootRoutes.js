import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import Study from "./Deck/Study";
import CreateDeck from "./Deck/CreateDeck";
import Deck from "./Deck/Deck";
import EditDeck from "./Deck/EditDeck";
import AddCard from "./Card/AddCard";
import EditCard from "./Card/EditCard";

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/decks/:deckId/study" element={<Study />} />
      <Route path="/decks/new" element={<CreateDeck />} />
      <Route path="/decks/:deckId" element={<Deck />} />
      <Route path="/decks/:deckId/edit" element={<EditDeck />} />
      <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
      <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RootRoutes;

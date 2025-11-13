import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addNewToyToState(newToy) {
    setToys([...toys, newToy]);
  }

  function removeToyFromState(toyId) {
    setToys(toys.filter((toy) => toy.id !== toyId));
  }

  function updateToyLikes(updatedToy) {
    setToys(toys.map((toy) => 
      toy.id === updatedToy.id ? updatedToy : toy
    ));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={addNewToyToState} onClose={() => setShowForm(false)} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={removeToyFromState} onUpdateToy={updateToyLikes} />
    </>
  );
}

export default App;

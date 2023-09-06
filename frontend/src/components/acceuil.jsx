import React, { useState } from 'react';
import './login.css'

function NumberInput() {
  const [number, setNumber] = useState('');
  const [displayedNumber, setDisplayedNumber] = useState(null);

  const handleNumberChange = (e) => {
    const inputNumber = e.target.value;
    setNumber(inputNumber);
  };

  const handleDisplay = () => {
    setDisplayedNumber(Number(number));
  };

  return (
    <div className="login_containera">
      <h1 id="titre">Bienvenue</h1>
      <div className="login_form_container">
      <div className="right">
      <input
        type="number"
        value={number}
        onChange={handleNumberChange}
        placeholder="Veuillez entrer votre solde" className="input"
      />
      <button onClick={handleDisplay} id="a">Afficher</button>
      {displayedNumber !== null && (
        <p id="result">Votre solde est : {displayedNumber}</p>
      )}
      </div>
      </div>
    </div>
  );
}

export default NumberInput;

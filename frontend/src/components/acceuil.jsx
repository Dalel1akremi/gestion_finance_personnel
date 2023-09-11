import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './acceuil.css';

function NumberInput() {
  const [number, setNumber] = useState('');
  const [displayedNumber, setDisplayedNumber] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedNumber = localStorage.getItem('savedNumber');
    if (storedNumber) {
      setDisplayedNumber(storedNumber);
    }
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/recentDepenses')
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des dépenses : ', error);
      });
  }, []);

  const handleNumberChange = (e) => {
    const inputNumber = e.target.value;
    setNumber(inputNumber);
  };

  const handleDisplay = () => {
    setDisplayedNumber(Number(number));
    localStorage.setItem('savedNumber', number);
  };

  return (
    <div>
    <header>
			<nav>
			  <ul>
        <li><a href="/Login">Se deconnecter</a></li>
        <li><a href="Statistique">Statistique</a></li>
        <li><a href="/Historique">Historique</a></li>
        <li><a href="/AjoutDepense">Ajout Depense</a></li>
        <li><a href="/acceuil">Acceuil</a></li>
        <li id="logo" ><a href="/acceuil">Gestion de Finance Personnelle</a></li>
			  </ul>
			</nav>
		  </header>
    <div className="home-container">
      <h1 id="welcome-title">Bienvenue</h1>
      <div className="form-container">
        <div className="left-section">
          <input
            type="number"
            value={number}
            onChange={handleNumberChange}
            placeholder="Veuillez entrer votre solde"
            className="input-field"
          />
          <button onClick={handleDisplay} id="display-button">
            Afficher
          </button>
          {displayedNumber !== null && (
            <p id="result">Votre solde est : {displayedNumber}</p>
          )}
        </div>
        <div className="right-section">
        <h2>Votre dépense récente :</h2>
        <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id}>
          Montant : {expense.Montant} 
        <br></br> Catégorie : {expense.Categorie} 
        <br></br> Date : {expense.Date} 
        <br></br> Description : {expense.Description}
           </li>
        ))}

          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

export default NumberInput;
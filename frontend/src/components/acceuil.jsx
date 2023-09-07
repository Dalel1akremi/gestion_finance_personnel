import React, { useState , useEffect } from 'react';
import axios from 'axios';
import './login.css'

function NumberInput() {
  const [number, setNumber] = useState('');
  const [displayedNumber, setDisplayedNumber] = useState(null);
  useEffect(() => {
    const storedNumber = localStorage.getItem('savedNumber');
    if (storedNumber) {
      setDisplayedNumber(storedNumber);
    }
  }, []);
  const handleNumberChange = (e) => {
    const inputNumber = e.target.value;
    setNumber(inputNumber);
  };

  const handleDisplay = () => {
    setDisplayedNumber(Number(number));
    localStorage.setItem('savedNumber', number);
  };
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Effectuer une requête GET pour récupérer les dépenses récentes depuis l'API
    axios.get('/api/expenses/recent')
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des dépenses : ', error);
      });
  }, []);

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
      <div id="titre">
      <h2>Dépenses récentes</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.description} - {expense.amount} € - {expense.date}
          </li>
        ))}
      </ul>
    </div>
    </div>
    
  );
}

export default NumberInput;

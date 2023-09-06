import React, { useState } from 'react';
import axios from 'axios';

function ExpenseForm() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      name: name,
      amount: parseFloat(amount),
    };

    // Remplacez l'URL par l'URL de votre serveur Node.js
    axios.post('http://localhost:5000/expenses', newExpense)
      .then((response) => {
        console.log(response.data);
        setName('');
        setAmount('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Ajouter une Dépense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de la dépense"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Montant"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Remplacez l'URL par l'URL de votre serveur Node.js
    axios.get('http://localhost:5000/expenses')
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Liste des Dépenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.name}: ${expense.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
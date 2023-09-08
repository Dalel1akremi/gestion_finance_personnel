import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Historique.css';
import { colours } from 'nodemon/lib/config/defaults';


function Historique() {
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
      .get('http://localhost:5000/Historique')
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
				<li><a href="/contact">Contact</a></li>
				<li><a href="/Historique">Historique</a></li>
				<li><a href="/acceuil">Acceuil</a></li>
				<li><a href="/Login">Login</a></li>
				<li id="logo" ><a href="/Login">Gestion de Finance Personnelle</a></li>
			  </ul>
			</nav>
		  </header>
          
    
        <div className="essential-section">
			<div className="middle-section">
        <h2 id="h">Historiques :</h2>
		<table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Montant</th>
                <th scope="col">Catégorie</th>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.Montant}</td>
                  <td>{expense.Categorie}</td>
                  <td>{expense.Date}</td>
                  <td>{expense.Description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
		</div>
		</div>
  );
}

export default Historique;
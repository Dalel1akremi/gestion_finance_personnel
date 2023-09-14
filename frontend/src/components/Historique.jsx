import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Historique.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Historique() {
  const [number, setNumber] = useState('');
  const [displayedNumber, setDisplayedNumber] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [startDate, setStartDate] = useState(null); // Start date for filtering
  const [endDate, setEndDate] = useState(null); // End date for filtering

  // Fetch expenses data based on startDate and endDate
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Historique', {
          params: { startDate, endDate },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des dépenses : ', error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const handleNumberChange = (e) => {
    const inputNumber = e.target.value;
    setNumber(inputNumber);
  };

  const handleDisplay = () => {
    setDisplayedNumber(Number(number));
    localStorage.setItem('savedNumber', number);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/Login">Se déconnecter</a></li>
            <li><a href="Statistique">Statistique</a></li>
            <li><a href="/Historique">Historique</a></li>
            <li><a href="/AjoutDepense">Ajout Dépense</a></li>
            <li><a href="/acceuil">Accueil</a></li>
            <li id="logo"><a href="/Login">Gestion de Finance Personnelle</a></li>
          </ul>
        </nav>
      </header>

      <div className="essential-section">
        <div className="middle-section">
          <h2 id="h">Historiques :</h2>
          <div className="date-filters">
          <h6>Plage de date:</h6> 
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              placeholderText="End Date"
            />
          </div>
          <table className="table table-bordered">
            <thead className="thead-dark">
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

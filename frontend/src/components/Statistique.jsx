import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Statistique.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Enregistrez les échelles nécessaires
Chart.register(LinearScale, CategoryScale, Title, Tooltip, Legend);

const ExpenseStatistics = () => {
  const [data, setData] = useState(); // Initialize with null instead of an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(); // Error state
  const [startDate, setStartDate] = useState(null); // Start date for filtering
  const [endDate, setEndDate] = useState(null); // End date for filtering

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get('http://localhost:5000/statistics', {
        params: {
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        },
      });

      const categories = response.data.map((entry) => entry.Categorie);
      const totalAmounts = response.data.map((entry) => entry.Total);
      const colors = ["blueviolet","greenyellow","rgb(255, 0, 212)","rgb(0, 255, 255)","yellow",]

      const chartData = {
        labels: categories,
        datasets: [
          {
            label: 'Depense par Categorie',
            data: totalAmounts,
            backgroundColor: colors,
          },
        ],
      };

      setData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

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
        <li id="logo" ><a href="/Login">Gestion de Finance Personnelle</a></li>
			  </ul>
			</nav>
		  </header>
      <div className="statistic_container">
        <div className="graphic">
          <h1 id='hcouleur'>Statistique des depenses </h1>
          {/* Date picker for start date */}
          <div className='date-filters'>
         <h6>Plage de date:</h6> 
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select start date"
          />
          {/* Date picker for end date */}
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Select end date"
          />
          </div>
          <div style={{ width: '80%', margin: 'auto' }}>
            {data !== undefined ? <Bar data={data} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseStatistics;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationComponent from './Notification';
import './Notification.css';
import './acceuil.css';
import CanvasJSReact from '@canvasjs/react-charts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Line, Circle } from 'rc-progress';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';
  
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

Chart.register(LinearScale, CategoryScale, Title, Tooltip, Legend);
const ExpenseStatistics = () => {
  const [data, setData] = useState({
    revenueData: [],
    expenseData: [],
    labels: [],
    datasets: [
      {
        label: 'Dépense par Catégorie',
        data: [],
        backgroundColor: ["blueviolet", "greenyellow", "rgb(255, 0, 212)", "rgb(0, 255, 255)", "yellow"],
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [totalMontant, setTotalMontant] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingMontant, setRemainingMontant] = useState(0);
  const [percentageOfExpenses, setPercentageOfExpenses] = useState(0);
  const CircularChart = ({ value, label, color }) => {
    return (
      <div className="circle">
        <h2>{label}</h2>
        <div style={{ width: '150px' }}>
          <Circle
            percent={value}
            strokeWidth="8"
            trailWidth="8"
            strokeColor={color}
          />
          <div className="chart-value">{value}</div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get('http://localhost:5000/statistics', {
          params: {
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString(),
          },
          headers: { "Authorization": `Bearer ${token}` }
        });

        const categories = response.data.Statistique.map((entry) => entry.Categorie);
        const totalAmounts = response.data.Statistique.map((entry) => entry.Total);

        setData({
          labels: categories,
          datasets: [
            {
              label: 'Dépense par Catégorie',
              data: totalAmounts,
              backgroundColor: ["blueviolet", "greenyellow", "rgb(255, 0, 212)", "rgb(0, 255, 255)", "yellow"],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },  [startDate, endDate]);

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dépense par Catégorie',
      },
    },
  };
  
  
  
  
  
  

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get('http://localhost:5000/checkUnaddedExpenses',
      {
        headers: { "Authorization": `Bearer ${token}` }
      }
    )
      .then((response) => {
        const hasUnaddedExpenses = response.data.hasUnaddedExpenses;
        console.log('hasUnaddedExpenses:', hasUnaddedExpenses);
        setShowNotification(!hasUnaddedExpenses); // Invert the condition to show the notification only if there are no unadded expenses
      })
      .catch((error) => {
        console.error('Error checking for unadded expenses:', error);
      });
  }, []);

  const handleYesClick = () => {
    window.location.href = '/AjoutDepense';
  };

  const handleNoClick = () => {
    setShowNotification(false);
  };
  useEffect(() => {
    const fetchMontantAcceuilData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:5000/MontantAcceuil', {
          headers: { "Authorization": `Bearer ${token}` }
        });
  
        // Update state with data from the API response
        console.log('API Response Data:', response.data);
        setTotalMontant(response.data.TotalMontant);
        setTotalExpenses(response.data.TotalExpenses);
        setRemainingMontant(response.data.RemainingMontant);
        setPercentageOfExpenses(response.data.PercentageOfExpenses);
        console.log('State After Update:', totalMontant, totalExpenses, remainingMontant, percentageOfExpenses);
        
      } catch (error) {
        console.error('Error fetching MontantAcceuil data:', error.message);
      }
    };
  
    fetchMontantAcceuilData();
  }, []);

  const CircularPercentageChart = ({ percentage }) => {
    return (
      <div>
        <h1>Your Circular Percentage Chart</h1>
        <div style={{ width: '100px' }}>
          <Line
            percent={percentage}
            strokeWidth="8"
            trailWidth="8"
            strokeColor="#3498db" // Color for the progress arc
          />
        </div>
        <div style={{ width: '100px' }}>
          <Circle
            percent={percentage}
            strokeWidth="8"
            trailWidth="8"
            strokeColor="#3498db" // Color for the progress arc
          />
        </div>
      </div>
    );
  };
  
  
  return (
    <div>
      <header>
			<nav>
      <ul className="navbar"><li className="logo" >Gestion de Finance Personnelle</li>			  <li><a href="/acceuil">Acceuil</a></li>
			  <li><a href="/AjoutDepense">Ajout</a></li>
			  <li><a href="/Historique">Historique</a></li>
			  <li><a href="Statistique">Statistique</a></li>
			  <li><a href="/Contact">
			  <link href="path/to/bootstrap-icons.css" rel="stylesheet"/>
			  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" fill="currentColor" className="bi bi-patch-question" viewBox="0 0 16 16">
  <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"/>
  <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
  <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
</svg></a></li>
			  <li> 
             <link href="path/to/bootstrap-icons.css" rel="stylesheet"/>
              <a href="/Settings">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg>
           </a>
            </li>
			<li>
			<link href="path/to/bootstrap-icons.css" rel="stylesheet"/>
             <a href="/Home"  >
             <svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" fill="currentColor" className="bi bi-escape" viewBox="0 0 16 16">
             <path d="M8.538 1.02a.5.5 0 1 0-.076.998 6 6 0 1 1-6.445 6.444.5.5 0 0 0-.997.076A7 7 0 1 0 8.538 1.02Z"/>
              <path d="M7.096 7.828a.5.5 0 0 0 .707-.707L2.707 2.025h2.768a.5.5 0 1 0 0-1H1.5a.5.5 0 0 0-.5.5V5.5a.5.5 0 0 0 1 0V2.732l5.096 5.096Z"/>
            </svg>
			</a>
			</li>
			 </ul>
			</nav>
		  </header>
      <div className="statistic_container">
      <div className='notifaction'>
        {showNotification && (
          <NotificationComponent
            message="Vous avez des dépenses non ajoutées hier. Voulez-vous les ajouter?"
            onYesClick={handleYesClick}
            onNoClick={handleNoClick}
          />
        )}
        </div>
        <div className="statistic_container">
         
      
  <div className="circle total-montant">
    <div className="message-container">
      <div className="message-title">Votre montant total</div>
      <CircularChart value={totalMontant} label="" color="#3498db" />
    </div>
  </div>
  <div className="circle total-expenses">
    <div className="message-container">
      <div className="message-title">Dépenses totales</div>
      <CircularChart value={totalExpenses} label="" color="#e74c3c" />
    </div>
  </div>
  <div className="circle remaining-montant">
    <div className="message-container">
      <div className="message-title">Votre montant restant</div>
      <CircularChart value={remainingMontant} label="" color="#27ae60" />
    </div>
  </div>
  <div className="circle percentage">
  <div className="message-container">
    <div className="message-title">Pourcentage(%)</div>
    <CircularChart value={percentageOfExpenses} label="" color="#f1c40f" />
  </div>
</div>

</div>
</div>
<div className="statistic_container">
        <div className="graphic">
          <h1>Statistique des depenses par rapport a categories</h1>
          <div className='date-filters'>
            <h6>Plage de date:</h6>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Select start date"
            />
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

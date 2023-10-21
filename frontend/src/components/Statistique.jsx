import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './acceuil.css';
import CanvasJSReact from '@canvasjs/react-charts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';

// Enregistrez les échelles nécessaires
Chart.register(LinearScale, CategoryScale, Title, Tooltip, Legend);
  
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ExpenseStatistics = () => {
  const [data, setData] = useState({
    revenueData: [],
    expenseData: [],
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'Depense par Categorie',
          data: [],
          backgroundColor: ["blueviolet","greenyellow","rgb(255, 0, 212)","rgb(0, 255, 255)","yellow"]
        },
      ],
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const fetchData = async () => {
    setLoading(true);
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/Acceuil', {
        params: {
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        },
        headers: { "Authorization": `Bearer ${token}` }
      });
  
      if (response.data && response.data.Revenue && response.data.Depense) {
        const revenueData = response.data.Revenue.map((item) => ({
          x: new Date(item.Date),
          y: item.Total,
        }));
  
        const expenseData = response.data.Depense.map((item) => ({
          x: new Date(item.Date),
          y: item.Total,
        }));
  
        setData({ revenueData, expenseData });
      } else {
        // Gérer le cas où les données sont indéfinies ou incorrectes
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  
  const fetch = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/Acceuil', {
        params: {
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        },
        headers: { "Authorization": `Bearer ${token}` }
      });

      const revenueData = response.data.Revenue.map((item) => ({
        x: new Date(item.Date),
        y: item.Total,
      }));

      const expenseData = response.data.Depense.map((item) => ({
        x: new Date(item.Date),
        y: item.Total,
      }));

      setData({ revenueData, expenseData });
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetch();
  }, [startDate, endDate]);

  const optionsRevenue = {
    title: {
      text: '',
    },
    axisX: {
      title: 'Date',
    },
    axisY: {
      title: 'Montant',
    },
    data: [
      {
        type: 'line',
        name: 'Revenue',
        showInLegend: true,
        dataPoints: data.revenueData,
      },
    ],}
    const optionsDepense = {
      title: {
        text: '',
      },
      axisX: {
        title: 'Date',
      },
      axisY: {
        title: 'Montant',
      },
      data:[
        {
        type: 'line',
        name: 'Dépenses',
        showInLegend: true,
        dataPoints: data.expenseData,
      },
    ],
  };

  return (
    <div>
      <div className="statistic_container">
        <div className="graphic">
          <h1>Revenues par rapport au temps</h1>
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
  {data.revenueData && data.revenueData.length > 0  ? (
    <CanvasJSChart options={optionsRevenue} />
  ) : null}
</div>
        </div>
      </div>
      <div className="statistic_container">
        <div className="graphic">
          <h1>Depenses par rapport au temps</h1>
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
  {data.expenseData && data.expenseData.length > 0  ? (
    <CanvasJSChart options={optionsDepense} />
  ) : null}
</div>
        </div>
        <div className="statistic_container">
        <div className="graphic">
          <h1>Statistique des depenses par rapport a categories</h1>
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
          {data.chartData && data.chartData.length > 0  ?  (
              <Bar data={data.chartData} />
            ) : null}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ExpenseStatistics;

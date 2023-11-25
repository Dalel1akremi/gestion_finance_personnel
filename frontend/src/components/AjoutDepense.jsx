import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Singup.css';
import './AjoutDepense.css';
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsPane } from 'mdb-react-ui-kit';

const AjoutDepense = () => {
  const [Montant, setMontant] = useState('');
  const [Categorie, setCategorie] = useState('');
  const [Date, setDate] = useState('');
  const [Description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/getCategories', {
         
          headers: { "Authorization": `Bearer ${token}` },
          
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        Montant,
        Categorie,
        Date,
        Description,
        type: justifyActive === 'tab2' ? 'Depense' : 'Revenue',
      };
      const response = await axios.post(
        'http://localhost:5000/Ajout',
        payload,
        {
          headers: { "Authorization": `Bearer ${token}` },
        }
      );
  
      // Check if the response indicates success
      if (response.status === 200) {
        setSuccessMessage('Transaction added successfully');
        setMontant('');
        setCategorie('');
        setDate('');
        setDescription('');
      } else {
        setError('Transaction adding failed');
      }
    } catch (error) {
      // Handle unexpected errors here
      console.error(error);
      setError(error.message);
      
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div>
      <div className="essential-section">
        <div className="middle-section">
          <MDBTabs>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
              Revenue
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
               Depense
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          {justifyActive === 'tab1' && (
            <MDBTabsPane show={justifyActive === 'tab1'}>
              <form className="form_container">
                <h2>Ajout Revenue </h2>
                <input
                   type="number"
                  placeholder="Montant"
                 name="Montant"
                 value={Montant}
                  onChange={(e) => setMontant(e.target.value)}
                   required
                  className="input"
                   />
              
              <select
                  placeholder="Categorie"
                  name="Categorie"
                  value={Categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  required
                  className="input"
                >
                  <option value="" disabled>
                    Catégorie
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="Date"
                  placeholder="Date"
                  name="Date"
                  value={Date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Description"
                  name="Description"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="input"
                />
               
                <button type="button" onClick={fetchData} className="btn btn-secondary">
                  Ajouter
                </button>
              </form>
            </MDBTabsPane>
          )}

          {justifyActive === 'tab2' && (
            <MDBTabsPane show={justifyActive === 'tab2'}>
              <form className="form_container">
                <h2>Ajout Depense</h2>
                <input
  type="number"
  placeholder="Montant"
  name="Montant"
  value={Montant}
  onChange={(e) => setMontant(e.target.value)}
  required
  className="input"
/>

               
<select
                  placeholder="Categorie"
                  name="Categorie"
                  value={Categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  required
                  className="input"
                >
                  <option value="" disabled>
                    Catégorie
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="Date"
                  placeholder="Date"
                  name="Date"
                  value={Date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Description"
                  name="Description"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="input"
                />
                <button type="button" onClick={fetchData} className="btn btn-secondary">
                  Ajouter
                </button>
              </form>
            </MDBTabsPane>
          )}
        </div>
      </div>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default AjoutDepense;
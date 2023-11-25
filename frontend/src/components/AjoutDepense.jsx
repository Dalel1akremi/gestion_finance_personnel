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
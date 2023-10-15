import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';

function Settings() {
  const [categories, setCategories] = useState([]); 
  const [newCategory, setNewCategory] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [categoryNames, setCategoryNames] = useState([]); 
  const [oldPassword, setOldPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  useEffect(() => {
    const token=localStorage.getItem("token");
    axios.get(('http://localhost:5000/getCategories'),{
      headers: { "Authorization": `Bearer ${token}` }

      })
      .then((response) => {
        setCategoryNames(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);
  
  const addCategory = () => {
    if (newCategory.trim() !== '') {
      const token=localStorage.getItem("token");
      axios.post('http://localhost:5000/addCategory', { name: newCategory}  ,{
				headers: { "Authorization": `Bearer ${token}` }
  
			  })
        .then((response) => {
          setCategories([...categories, response.data.newCategory]);
          setNewCategory('');
          window.location = "/Settings";
        })
        
        .catch((error) => {
          console.error('Error adding category:', error);
        });
    }
  };
  const editCategory = (originalName, updatedName) => {
    const token = localStorage.getItem('token');
  
    axios
      .put(
        'http://localhost:5000/editCategory',
        {
          name: originalName,
          newName: updatedName,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(() => {
        // Update the state with the edited data
        setCategoryNames((prevCategoryNames) => {
          const updatedCategoryNames = [...prevCategoryNames];
          const index = updatedCategoryNames.findIndex((category) => category === originalName);
          if (index !== -1) {
            updatedCategoryNames[index] = updatedName;
          }
          return updatedCategoryNames;
        });
      })
      .catch((error) => {
        console.error('Error editing category:', error);
      });
  };
  
  
  const deleteCategory = async (name) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/deleteCategory', {
        data: { name },
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Update the state by removing the deleted category
      setCategoryNames((prevCategoryNames) => {
        return prevCategoryNames.filter((category) => category !== name);
      });
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  
  const changePassword = () => {
    if (oldPassword.trim() === '' || newPassword.trim() === '') {
      setPasswordError('Veuillez remplir tous les champs.');
      return;
    }
  
    const token = localStorage.getItem('token');
    axios
      .post(
        'http://localhost:5000/changePassword',
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // Handle success
        console.log('Password changed successfully:', response.data);
        setOldPassword('');
        setNewPassword('');
        setPasswordError('');
        setPasswordChangeSuccess(true); // Set passwordChangeSuccess to true
      })
      .catch((error) => {
        // Handle error
        if (error.response && error.response.status === 401) {
          setPasswordError('Ancien mot de passe incorrect.');
        } else {
          console.error('Error changing password:', error);
          setPasswordError('Erreur lors du changement de mot de passe.');
        }
      });
  };


  return (
    <div>
       
       <header>
			<nav>
      <ul className="navbar"><li className="logo" >Gestion de Finance Personnelle</li>			  <li><a href="/acceuil">Acceuil</a></li>
			  <li><a href="/AjoutDepense">Ajout </a></li>
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

    
    <div className="settings-container">
      <div className="section-container">
        <h2>Catégories de dépenses</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Categories</th>
                <th scope="col">Modification</th>
                <th scope="col">Suppression</th>
              </tr>
            </thead>
            <tbody>
              
            {categoryNames.map((categoryName, index) => ( 
              <tr key={index}>
                <td>
                {categoryName}
                </td>
                <td>
                <button className='btn btn-success' onClick={() => editCategory(categoryName, prompt('Edit category name:', categoryName))}>
                  Modifier
                </button>
                </td>
                <td>
                <button  className="btn btn-danger"onClick={() => deleteCategory(categoryName)}>
                  Supprimer
                </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        )}
        <input
          type="text"
          id="newCategory"
          placeholder="Nouvelle catégorie"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="input-field"
        />
        <button onClick={addCategory} className="btn btn-secondary">
          Ajouter une catégorie
        </button>
      </div>
      <div className="section-container">
  <h2>Changer Mot de passe</h2>
  <input
    type="password"
    id="oldPassword"
    placeholder="Ancien mot de passe"
    value={oldPassword}
    onChange={(e) => setOldPassword(e.target.value)}
    className="input-field"
  />
  <input
    type="password"
    id="newPassword"
    placeholder="Nouveau mot de passe"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="input-field"
  />
  {passwordError && <p className="error-message">{passwordError}</p>}
  <button onClick={changePassword} className="btn btn-primary">
    Changer Mot de passe
  </button>
  {passwordChangeSuccess && (
        <p className="success-message">Mot de passe modifié avec succès</p>
      )}
</div>


    </div>
   
    </div>
  );
}

export default Settings;

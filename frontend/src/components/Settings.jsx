import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Settings.css';

function Settings() {
  const [categories, setCategories] = useState([]); 
  const [newCategory, setNewCategory] = useState(''); 
  const [monthlyBudget, setMonthlyBudget] = useState(0); 
  const [weeklyBudget, setWeeklyBudget] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [categoryNames, setCategoryNames] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:5000/getCategories')
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
      axios.post('http://localhost:5000/addCategory', { name: newCategory })
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
    axios
      .put('http://localhost:5000/editCategory', {
        name: originalName,
        newName: updatedName,
      })
      .then(() => {
        axios.get('http://localhost:5000/getCategories')
          .then((response) => {
            setCategoryNames(response.data);
          })
          .catch((error) => {
            console.error('Error fetching categories:', error);
          });
      })
      .catch((error) => {
        console.error('Error editing category:', error);
      });
  };
  
  const deleteCategory = async (name) => {
    try {
      await axios.delete('http://localhost:5000/deleteCategory', {
        data: { name },
      });
  
     
      axios.get('http://localhost:5000/getCategories')
        .then((response) => {
          setCategoryNames(response.data); 
        })
        .catch((error) => {
          console.error('Error fetching categories:', error);
        });
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  
  



  return (
    <div className="settings-container">
      <h1>Paramètres</h1>
      <div className="section-container">
        <h2>Catégories de dépenses</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="category-list">
            {categoryNames.map((categoryName, index) => ( 
              <li key={index}>
                {categoryName}
                <button onClick={() => editCategory(categoryName, prompt('Edit category name:', categoryName))}>
                  Modifier
                </button>
                <button onClick={() => deleteCategory(categoryName)}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
        <input
          type="text"
          id="newCategory"
          placeholder="Nouvelle catégorie"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="input-field"
        />
        <button onClick={addCategory} className="add-button">
          Ajouter une catégorie
        </button>
      </div>

      <div className="section-container budget-section">
        <h2>Définir le budget</h2>
        <div>
          <label htmlFor="monthlyBudget" className="budget-label">
            Budget mensuel:
          </label>
          <input
            type="number"
            id="monthlyBudget"
            value={monthlyBudget}
            onChange={(e) => setMonthlyBudget(e.target.value)}
            className="budget-input"
          />
        </div>
        <div>
          <label htmlFor="weeklyBudget" className="budget-label">
            Budget hebdomadaire :
          </label>
          <input
            type="number"
            id="weeklyBudget"
            value={weeklyBudget}
            onChange={(e) => setWeeklyBudget(e.target.value)}
            className="budget-input"
          />
        </div>
        <button className="save-budget-button">Sauvegarder</button>
      </div>
    </div>
  );
}

export default Settings;

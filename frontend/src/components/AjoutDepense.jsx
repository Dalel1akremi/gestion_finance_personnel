import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Singup.css';
import './AjoutDepense.css';

const AjoutDepense = () => {
	const [Montant, setFMontant] = useState('');
	const [Categorie, setCategorie] = useState('');
	const [Date, setDate] = useState('');
	const [Description, setDescription] = useState('');
	const [msg, setMsg] = useState('');
	const [categories, setCategories] = useState([]); 
	const [successMessage, setSuccessMessage] = useState('');
	useEffect(() => {
		const fetchCategories = async () => {
		  try {
			const response = await axios.get('http://localhost:5000/getCategories');
			setCategories(response.data); 
		  } catch (error) {
			console.error("Error fetching categories:", error);
		  }
		};
		fetchCategories();
	  }, []);
	  
	  
	  console.log("test", categories);
	  

	const Ajout = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:5000/AjoutDepense', {
				Montant: Montant,
				Categorie: Categorie,
				Date: Date,
				Description: Description,
			});
			setSuccessMessage('Expense added successfully');
		} catch (error) {
			if (error.response) {
				setMsg(error.response.data.msg);
			}
		}
	}

	return (
		<div>
				
				<header>
				<nav>
					<ul>
						<li><a href="/contact">Contact</a></li>
						<li><a href="/Historique">Historique</a></li>
						<li><a href="/acceuil">Acceuil</a></li>
						<li><a href="/Login">Login</a></li>
						<li id="logo"><a href="/Login">Gestion de Finance Personnelle</a></li>
					</ul>
				</nav>
			</header>

			<div className="signup_container">
				<div className="signup_form_container">
					<div className="right">
						<form className="form_container" onSubmit={Ajout}>
							<h1 >Ajout des dépenses</h1>
							<input
								type="float"
								placeholder="Montant"
								name="Montant"
								value={Montant} onChange={(e) => setFMontant(e.target.value)} 
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
  <option value="" disabled>Catégorie</option>
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
								value={Date} onChange={(e) => setDate(e.target.value)}
								required
								className="input"
							/>
							<input
								type="text"
								placeholder="Description"
								name="Description"
								value={Description} onChange={(e) => setDescription(e.target.value)}
								required
								className="input"
							/>
							<button type="submit" className="green_btn">
								Ajouter
							</button>
						</form>
					</div>
				</div>
			</div>
		
			{successMessage && <p className="success-message">{successMessage}</p>}

		</div>
	);
};

export default AjoutDepense;

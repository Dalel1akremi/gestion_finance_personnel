import {  useState } from "react";
import axios from "axios";
import { SocialIcon } from 'react-social-icons'
import './Singup.css';
import'./Contact.css';


const Contact = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	  });
	
	  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		  const response = await fetch('http://localhost:5000/Contact', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		  });
	
		  const data = await response.json();
	
		  if (data.success) {
			alert('Email sent successfully');
		  } else {
			alert('Email not sent');
		  }
		} catch (error) {
		  console.error(error);
		  alert('An error occurred');
		}
	  };
	
	  const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	  };
	
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
        <li id="logo" ><a href="/login">Gestion de Finance Personnelle</a></li>
			  </ul>
			</nav>
		  </header>
          
		<div className="signup_container">
			<div className="signup_form_container">
				<div className="right">
					<form className="form_container" onSubmit={handleSubmit}  >
						<h1 id="h1">Contacter Nous</h1>

			  <input type="text" 
			  placeholder="votre nom"
			  name="name" 
			  onChange={handleChange} 
			  required
			  className="input" />

			  <input type="email"
			  placeholder="Password" 
			  name="email" onChange={handleChange}
			   required 
			  className="input"/>

			  <textarea name="message"
			  placeholder="description"
			   onChange={handleChange} required
			  className="input" />
			
			<button type="submit" className="red_btn">Envoyer</button>
			<SocialIcon url="https://mail.google.com"></SocialIcon>
		  </form>
		</div>
		</div>
		</div>
		</div>
	  );
	};
	

	
	;

export default Contact;

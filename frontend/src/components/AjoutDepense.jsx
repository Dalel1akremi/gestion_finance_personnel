import { useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import './Singup.css';


const AjoutDepense = () => {
	const [Montant,setFMontant] = useState('');
	const [Categorie,setCategorie] = useState('');
	const [Date, setDate] = useState('');
    const [Description, setDescription] = useState('');
    const [msg, setMsg] = useState('');
	const Ajout= async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/AjoutDepense', {
                Montant:Montant,
				Categorie:Categorie,
                Date: Date,
                Description: Description,
                
            });
            window.location = "/login";
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }


	return (
		<div className="signup_container">
			<div className="signup_form_container">
				<div className="right">
					<form className="form_container" onSubmit={Ajout}  >
						<h1 >Ajout des despenses</h1>
						<input
							type="float"
							placeholder="Montant"
							name="Montant"
							value={Montant} onChange={(e) => setFMontant(e.target.value)} 
							required
							className="input"
						/>
						<input
							type="text"
							placeholder="Categorie"
							name="Categorie"
							value={Categorie} onChange={(e) => setCategorie(e.target.value)} 
							required
							className="input"
						/>
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
						{/* {error && <div className="error_msg">{error}</div>} */}
						<button type="submit" className="green_btn">
							Ajouter
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AjoutDepense;

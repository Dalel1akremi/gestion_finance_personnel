import { useState,useEffect } from "react";
import axios from "axios";
import { Link , useHistory} from "react-router-dom";
import { Container, Form, Button } from 'react-bootstrap';
import "./login.css";


const Login = () => {
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const Auth = async (e) => {
        e.preventDefault();
        try {
		const { data: res } = await axios.post("http://localhost:5000/Login", {
                email: email,
                password: password
            });
                   
				localStorage.setItem("token",res.data);
				 
				window.location = "/acceuil";
        } catch (error) {
            if  (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			)  {
                setMsg(error.response.data.msg);
            }
        }
    }


	return (
		
		<div  >
				<header>
			<nav>
			  <ul>
				<li><a href="">Contact</a></li>
				<li><a href="">Historique</a></li>
				<li><a href="/Login">Acceuille</a></li>
				<li id="logo" ><a href="">Gestion de Finance Personnelle</a></li>
			  </ul>
			</nav>
		  </header>
		  <h5 id="abir">Bienvenue sur notre site web dédié au suivi des dépenses <br></br>personnelles, votre outil essentiel pour mieux gérer votre <br></br>argent.<br></br> Suivez vos dépenses, prenez le contrôle de vos finances et<br></br> atteignez vos objectifs financiers.<br></br> Explorez nos fonctionnalités dès maintenant.</h5>
			
		  <div className="login_container"></div>
		 
			<div className="login_form_container">
				<div className="right">
					<form  onSubmit={Auth}  className="form_container" >

						<h1 id="a">Log In</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							value={email} 
							onChange={(e) => setEmail(e.target.value)}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={password} 
							onChange={(e) => setPassword(e.target.value)}
							required
							className="input"
						/>
						{msg && <div className="error_msg">{msg}</div>}
						<a href="/acceuil">
						<button type="submit" className="red_btn" >
							Sing In
						</button>
						</a>
					</form>
				</div>
				<div className="left ">
					<h1>create Account</h1>
					<a href="/signup">
						<button type="button" className="white_btn" >
							Sing Up
						</button>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;

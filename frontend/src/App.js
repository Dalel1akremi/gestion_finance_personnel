import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Singup";
import NumberInput from "./components/acceuil";
import Contact from "./components/Contact";
import AjoutDepense from "./components/AjoutDepense";
import Historique from "./components/Historique";
<<<<<<< HEAD
import ExpenseStatistics from "./components/Statistique";
=======
import Settings from "./components/Settings";
>>>>>>> origin/abir3
import { Fragment } from "react";
import { BrowserRouter,Route,Redirect} from "react-router-dom";
import './App.css'




function App() {
	const user = localStorage.getItem("token");
	return (
    
    <Fragment>
      <BrowserRouter>
      
      <Route  path="/signup" ><Signup/></Route>
		 	<Route path="/Home" ><Home/></Route>
       <Route  path="/acceuil" ><NumberInput/></Route>
       <Route  path="/Historique" ><Historique/></Route>
       <Route  path="/Statistique" ><ExpenseStatistics/></Route>
       <Route path="/AjoutDepense" ><AjoutDepense/></Route>
<<<<<<< HEAD
       <Route path="/Contact" ><Contact/></Route>
       {user && <Route path="/Login" ><Login/></Route>} 
			{! user && <Route  exact path="/" > <Redirect  to="/Login" /></Route>}
=======
       <Route path="/Settings" ><Settings/></Route>
       {user && <Route path="/" ><Home/></Route>} 
			{! user && <Route  exact path="/" > <Redirect  to="/login" /></Route>}
>>>>>>> origin/abir3
      </BrowserRouter>
    </Fragment>

	);
}

export default App;
import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Singup";
import NumberInput from "./components/acceuil";
import Contact from "./components/Contact";
import AjoutDepense from "./components/AjoutDepense";
import Historique from "./components/Historique";
import ExpenseStatistics from "./components/Statistique";
import Settings from "./components/Settings";
import Reintialisation from"./components/Reintialisation";
import { Fragment } from "react";
import { BrowserRouter,Route,Redirect, Switch } from "react-router-dom";
import './App.css'




function App() {
	const user = localStorage.getItem("token");
 
	return (
  
    <Fragment>
       <BrowserRouter>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/Home" component={Home} />
        <Route path="/Login" component={Login} />
        <Route exact path="/acceuil"  render={() => (user ? <NumberInput /> :<Redirect to="/Login" />  )} />
        <Route path="/Historique" render={() => (user ? <Historique /> : <Redirect to="/Login" />)}/>
        <Route path="/Statistique" component={user ? ExpenseStatistics : () => <Redirect to="/Login" />} />
        <Route path="/AjoutDepense" component={user ? AjoutDepense : () => <Redirect to="/Login" />} />
        <Route  path="/Contact" component={user ? Contact : () => <Redirect to="/Login" />} />
        <Route path='/Reintialisation'component={ Reintialisation }/>
        <Route path="/Settings" component={user ? Settings : () => <Redirect to="/Login" />} />
        <Route exact path="/" component={user ? Login: () => <Redirect to="/Login" />} />
      </Switch>
    </BrowserRouter>
 </Fragment>

	);
}

export default App;
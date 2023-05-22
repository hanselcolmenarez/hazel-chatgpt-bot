import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './Login';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Suscripcion from './components/Suscripcion';
import Creditos from './components/Creditos';
import Contactame from './components/Contactame';
  
  ReactDOM.render(
	<Router>
	  <Routes>
		<Route path="/" element={<Login />} />
		<Route path="/app" element={<App />} />
		<Route path="/suscripcion" element={<Suscripcion />} />
		<Route path="/creditos" element={<Creditos />} />
		<Route path="/contactame" element={<Contactame />} />
	  </Routes>
	</Router>,
	document.getElementById('root')
  );
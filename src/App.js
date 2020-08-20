import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

import {BrowserRouter} from 'react-router-dom'
import Roteamento from './routes.js'

function App() {
	return (
		<>
			<BrowserRouter>
				<Roteamento />
			</BrowserRouter>
		</>
	);
}

export default App;

import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NotFoundPage from './pages/NotFound'
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import User from './Components/Users'

export default function Roteamento(){

	return (
		<Switch>
			<PrivateRoute path="/" component={HomePage} exact />
			<Route path="/user" component={User} />
			<Route path="/login" component={LoginPage} />
			<Route component={NotFoundPage} />
		</Switch>

	)
}

class PrivateRoute extends Component{
	isLoggedIn = ()=> {
		//TODO: Validar se token está valido
		if (localStorage.getItem('TOKEN_MY_BOX')){
			return true;
		} else {
			return false;
		}
	}

	render(){
		const {component: Component, ...props} = this.props

		if(this.isLoggedIn()){
			return <Component {...props}/>
		} else {
			return <Redirect to="/login"/>
		}
	}
}
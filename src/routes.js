import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ReactReduxContext } from "react-redux";
import NotFoundPage from './pages/NotFound'
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import NewUserPage from './pages/User'
import { NotesThunkActions } from './store/ducks/notes/index.js'

export default function Roteamento(){

	return (
		<Switch>
			<Route path="/login" component={LoginPage} />
			<Route path="/newuser" component={NewUserPage} />
			{/* <Route path="/" component={HomePage} exact /> */}
			<PrivateRoute path="/" component={HomePage} exact />
			{/* <Route component={NotFoundPage} /> */}
		</Switch>

	)
}

class PrivateRoute extends Component{
	
	static contextType = ReactReduxContext;

	isLoggedIn = ()=> {
		console.log('IS_LOGGED',);
		
		const tokenLocalStorage = localStorage.getItem('TOKEN_MY_BOX');

		// Tem token no LocalStorage, considera ele
		if (tokenLocalStorage){
			this.context.store.dispatch(NotesThunkActions.setNewToken(tokenLocalStorage))
		}

		if (this.context.store.getState().notes.token){
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
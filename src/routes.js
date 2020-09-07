import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NotFoundPage from './pages/NotFound'
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import NewUserPage from './pages/NewUser'
import NotesList from './Containers/notesList.js'
// import NotesList from './Containers/_OLD_notesList_old'
import Menu from './Components/Menu'

export default function Roteamento(){

	return (
		<Switch>
			<Route path="/login" component={LoginPage} />
			<Route path="/menu" component={Menu} />
			<Route path="/newuser" component={NewUserPage} />
			<Route path="/notelist" component={NotesList} />
			{/* <Route path="/" component={HomePage} exact /> */}
			<PrivateRoute path="/" component={HomePage} exact />
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
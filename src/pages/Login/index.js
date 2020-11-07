import React, { Component, Redirect } from 'react'
import MainBar from '../../Components/NavBar'
import { Paper, Box, Container, Grid, Typography, TextField, Link } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { LoginContext } from '../../Context/loginContext'
import { LoginService } from '../../Service/LoginService';
import style from './login.module.css'
import { NotesThunkActions } from '../../store/ducks/notes/index.js'
import { ReactReduxContext } from "react-redux";

const ThemeContext = React.createContext('light');


export default class LoginPage extends Component {

	constructor() {

		super();

		this.state = {
			values: {
				user: '',
				password: ''
			},
			redirectToHome: false
		}
	}

	static contextType = ReactReduxContext;
	

	fieldChange = ({ target }) => {

		const values = { ...this.state.values, [target.id]: target.value }
		this.setState({ values })

	}

	fieldValidate = () => {

		// Valida se usuario existe
		// Dispara Service de login

	}

	newUser = () => {
		console.log("Novo usuário");
		this.props.history.push('/newuser')
	}

	forgotPassword = () => {
		console.log("Esqueci a senha");
	}

	redirectToHome = () => {

		this.props.history.push('/')
		// const redirectToHome = true;
		// this.setState({ redirectToHome });

	}

	confirmForm = (event) => {
		event.preventDefault();


		// Valida usuario e redireciona
		LoginService.login(
			this.state.values.user,
			this.state.values.password
		)
			.then(response => {
				if (response.ok) {

					// this.context.setMsg(response.message);
					this.context.store.dispatch(NotesThunkActions.setNewToken(response.token))
					this.redirectToHome();

				} else {
					// this.context.setMsg(response.message);
					alert(response.message)
				}
			});

	}


	render() {
		if (this.state.redirectToHome.redirect) {
			console.log('REDIRECIONANDO...');
			return (<Redirect to="/" />)
		}
		return (
			<>
				<MainBar newNoteAction={this.newNote} myNotesAction={this.myNotes}></MainBar>
				<div className={style.main}>
					{/* <Container> */}
					<div className={style.container} >


						<form action="/" onSubmit={this.confirmForm} >
							{/*  */}
							<div className={style.formFields} >

								<div className={style.formTitle}>
									<Typography variant="h4" >Sign In</Typography>
								</div>


								<FormFieldInput
									id="user"
									label="Email:"
									onChange={this.fieldChange}
									onBlur={this.fieldValidate}
									value={this.state.values.user}
									className={style.textField}
								// error={!!this.state.errors.user}
								// helperText={this.state.errors.user}
								></FormFieldInput>

								<FormFieldInput
									id="password"
									label="Senha:"
									onChange={this.fieldChange}
									onBlur={this.fieldValidate}
									value={this.state.values.password}
									type="password"
								// error={!!this.state.errors.password}
								// helperText={this.state.errors.password}
								></FormFieldInput>


								<Button variant="outline-primary" type="submit">Confirmar</Button>


							</div>

						</form>

						<div className={style.links}>
							<div >
								<small>
									<Link href="#" onClick={this.newUser}>Cadastre-se</Link>
								</small>
							</div>
							<div >
								<small>
									<Link href="#" onClick={this.forgotPassword}>Esqueceu a senha?</Link>
								</small>
							</div>
						</div>

					</div>
					{/* </Container> */}
				</div>
			</>
		)
	}
}

const FormFieldInput = ({ id, label, onChange, value, type = "text", onBlur, error = false, helperText }) => {

	return (

		<div className={style.textField} >

			<TextField
				id={id}
				label={label}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				type={type}
				variant="outlined"
				fullwidth
				margin="dense"
				error={error}
				helperText={helperText}
			></TextField>

		</div>
	)
}

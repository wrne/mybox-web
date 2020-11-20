import React, { useState, useEffect, useContext, Redirect } from 'react'
import MainBar from '../../Components/NavBar'
import { Typography, TextField, Link } from '@material-ui/core'
import { Button } from 'react-bootstrap'
import { LoginContext } from '../../Context/loginContext'
import { LoginService } from '../../Service/LoginService';
import style from './login.module.css'
import { useSelector, useDispatch } from "react-redux";

export default function LoginPage(props) {

	// const [redirectToHome, setRedirectToHome] = useState(false);
	const [inputValues, setInputValues] = useState({
		user: '',
		password: ''
	});

	const msgContext = useContext(LoginContext);
	const token = useSelector(state => state.notes.token);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (token){
	// 		setRedirectToHome(true);
	// 	}
	// })

	function fieldChange({ target }) {

		let values = inputValues

		values = { ...values, [target.id]: target.value };

		setInputValues(values)
	}

	function fieldValidate() {

		// Valida se usuario existe
		// Dispara Service de login

	}

	function newUser() {
		console.log("Novo usuário");
		props.history.push('/newuser')
	}

	function forgotPassword() {
		console.log("Esqueci a senha");
	}

	function confirmForm(event) {
		event.preventDefault();

		console.log(`User: ${inputValues.user}| Password: ${inputValues.password}`);
		
		// Valida usuario e redireciona
		LoginService.login(
			inputValues.user,
			inputValues.password,
			msgContext,
			dispatch
		)
	}


	if (token) {
	// if (redirectToHome) {
		console.log('REDIRECIONANDO...');
		return (<Redirect to="/" />)
	}
	return (
		<>
			<MainBar></MainBar>
			<div className={style.main}>
				{/* <Container> */}
				<div className={style.container} >


					<form action="/" onSubmit={confirmForm} >
						{/*  */}
						<div className={style.formFields} >

							<div className={style.formTitle}>
								<Typography variant="h4" >Sign In</Typography>
							</div>


							<FormFieldInput
								id="user"
								label="Email:"
								onChange={fieldChange}
								onBlur={fieldValidate}
								value={inputValues.user}
								className={style.textField}
							// error={!!this.state.errors.user}
							// helperText={this.state.errors.user}
							></FormFieldInput>

							<FormFieldInput
								id="password"
								label="Senha:"
								onChange={fieldChange}
								onBlur={fieldValidate}
								value={inputValues.password}
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
								<Link href="#" onClick={newUser}>Cadastre-se</Link>
							</small>
						</div>
						<div >
							<small>
								<Link href="#" onClick={forgotPassword}>Esqueceu a senha?</Link>
							</small>
						</div>
					</div>

				</div>
				{/* </Container> */}
			</div>
		</>
	)
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
				margin="dense"
				error={error}
				helperText={helperText}
			></TextField>

		</div>
	)
}

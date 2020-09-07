import React, { Component } from 'react'
import { Paper, Box,Container, Grid, Typography, TextField, Button, Link } from '@material-ui/core'
import {LoginContext} from '../../Context/loginContext'

export default class LoginPage extends Component {

	static contextType = LoginContext;

	state = {
		values: {
			user: '',
			password: ''
		}
	}

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

	confirmForm = (e) =>{
		e.preventDefault();
		// Valida usuario e redireciona
		this.context.setMsg('Login realizado com sucesso!')
		localStorage.setItem("TOKEN_MY_BOX", 'token');
		this.props.history.push('/')
	}

	render() {
		return (
			<div style={{width: '100vw', height: '100vh', backgroundColor:'lightgray'}}>
			 {/* <Container> */}
				<Grid container fixed   >
					<Grid Item xs={4} />
					<Grid Item xs={4}>
						<Paper style={{marginTop:'40%'}} >

							<form action="#" onSubmit={this.confirmForm} bgcolor="secundary.main">
								{/*  */}
								<Grid spacing={2} container direction="column" alignContent="center" alignItems="center" >

									<Grid item>
										<Typography variant="h5" >Informe seus dados:</Typography>
									</Grid>

									<FormFieldInput
										id="user"
										label="Usuário:"
										onChange={this.fieldChange}
										onBlur={this.fieldValidate}
										value={this.state.values.user}
									// error={!!this.state.errors.user}
									// helperText={this.state.errors.user}
									></FormFieldInput>

									<FormFieldInput
										id="password"
										label="Senha:"
										onChange={this.fieldChange}
										onBlur={this.fieldValidate}
										value={this.state.values.password}
									// error={!!this.state.errors.password}
									// helperText={this.state.errors.password}
									></FormFieldInput>

									<Grid item>
										<Button type="submit">Confirmar</Button>
									</Grid>

									<Grid container item justify="center" xs={12} spacing={4}>
										<Grid item>
											<Typography>
												<Link href="#" onClick={this.newUser}>Cadastre-se</Link>
											</Typography>
										</Grid>
										<Grid item>
											<Typography>
												<Link href="#" onClick={this.forgotPassword}>Esqueceu a senha?</Link>
											</Typography>
										</Grid>
									</Grid>

								</Grid>

							</form>
						</Paper>
					</Grid>

					<Grid Item xs={4} />
				</Grid>
				{/* </Container> */}
			</div>
		)
	}
}

const FormFieldInput = ({ id, label, onChange, value, type = "text", onBlur, error = false, helperText }) => {

	return (

		<Grid item>

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

		</Grid>
	)
}

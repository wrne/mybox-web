import React, { Component } from 'react'
// import usersStyles from "./users.module.css"
import { FormValidateService } from "../../Service/FormValidateService"
import { UserService } from '../../Service/UserService';
import { TextField, Button, Grid, Box, Typography } from '@material-ui/core';

const STATE_ERROR_INITIAL = {
	id: '',
	name: '',
	email: '',
	phone: '',
	password: '',
	confirmPassword: ''
}

export default class User extends Component {

	constructor() {
		super();
		this.state = {
			user: {
				id: '',
				name: '',
				email: '',
				phone: '',
				password: '',
				confirmPassword: ''
			},
			errors: {},
			touched: {
				id: false,
				name: false,
				email: false,
				phone: false,
				password: false,
				confirmPassword: false
			},
		}

	}

	fieldChange = (event) => {

		console.log(`Change: ${[event.target.id]} valor: ${event.target.value}`);
		const user = { ...this.state.user, [event.target.id]: event.target.value }
		const touched = { ...this.state.touched, [event.target.id]: true }

		this.setState({ user, touched })

	}

	fieldValidate = ({ target }) => {

		console.log(`Passou pelo OnBlur`);
		const { user } = this.state;
		const { touched } = this.state;

		const errors = { ...STATE_ERROR_INITIAL };

		if (!this.state.user.name.includes(' ') && touched.name) {
			errors['name'] = 'Informe o nome completo'
		}

		// Validar o CPF
		if (touched.id && UserService.existId) {
			errors['id'] = 'Usuário já está cadastrado'
		}


		if (!FormValidateService.IsEmail(this.state.user.email) && touched.email) {
			errors['email'] = 'E-mail inválido'
		}

		// Valida Phone

		// Valida pswd
		if (touched.password && !FormValidateService.PasswordValid(user.password)) {
			errors['password'] = 'Senha inválida. Tente novamente'
		}

		// Valida confirm pwd
		if (touched.password && touched.confirmPassword && !FormValidateService.PasswordMatch(user.password, user.confirmPassword)) {
			errors['confirmPassword'] = 'As senhas devem ser idênticas'
		}

		this.setState({
			errors
		})

	}

	confirmForm = (event) => {
		event.preventDefault();
		console.log('Submit', event);
	}


	render() {

		return (

			<>
				<Box >
					<form action="/" onSubmit={this.confirmForm}>
						<Grid container direction="column" alignContent="center" alignItems="center" >
							<Grid item>
								<Typography variant="h5" >Informe seus dados:</Typography>
							</Grid>

							<FormFieldInput
								id="name"
								label="Nome:"
								onChange={this.fieldChange}
								onBlur={this.fieldValidate}
								value={this.state.user.name}
								error={!!this.state.errors.name}
								helperText={this.state.errors.name}
							></FormFieldInput>

							<FormFieldInput
								id="email"
								label="E-Mail:"
								onChange={this.fieldChange}
								onBlur={this.fieldValidate}
								value={this.state.user.email}
								error={!!this.state.errors.email}
								helperText={this.state.errors.email}
							></FormFieldInput>

							<FormFieldInput
								id="phone"
								label="Telefone:"
								onChange={this.fieldChange}
								onBlur={this.fieldValidate}
								value={this.state.user.phone}
								error={!!this.state.errors.phone}
								helperText={this.state.errors.phone}
							></FormFieldInput>

							<FormFieldInput
								id="id"
								label="CPF:"
								onChange={this.fieldChange}
								onBlur={this.fieldValidate}
								value={this.state.user.id}
								error={!!this.state.errors.id}
								helperText={this.state.errors.id}
							></FormFieldInput>

							<FormFieldInput
								id="password"
								label="Senha:"
								type="password"
								onChange={this.fieldChange}
								onBlur={this.fieldValidate}
								value={this.state.user.password}
								error={!!this.state.errors.password}
								helperText={this.state.errors.password}
							></FormFieldInput>

							<FormFieldInput
								id="confirmPassword"
								label="Confirme a Senha:"
								type="password"
								onChange={this.fieldChange}
								onBlur={this.fieldValidate}
								value={this.state.user.confirmPassword}
								error={!!this.state.errors.confirmPassword}
								helperText={this.state.errors.confirmPassword}
							></FormFieldInput>

							<Grid item>
								<Button type="submit">Confirmar</Button>
							</Grid>
						</Grid>

					</form>
				</Box>
			</>
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

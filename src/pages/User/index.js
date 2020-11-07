import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { FormValidateService } from "../../Service/FormValidateService"
import { UserService } from '../../Service/UserService';
import { TextField, Typography } from '@material-ui/core';
import { Button } from 'react-bootstrap'

import MainBar from '../../Components/NavBar'
import { LoginContext } from '../../Context/loginContext'
import style from './user.module.css'


const useStyle = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	button: {
		padding: theme.spacing(2)
	}
}));

const STATE_ERROR_INITIAL = {
	id: '',
	name: '',
	email: '',
	phone: '',
	password: '',
	confirmPassword: ''
}

export default class User extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: ''.repeat(11),
				name: ''.repeat(80),
				email: ''.repeat(50),
				phone: ''.repeat(13),
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
			redirectToLogin: {
				redirect: false
			}
		}

	}

	static contextType = LoginContext;

	fieldChange = (event) => {

		const user = { ...this.state.user, [event.target.id]: event.target.value }
		const touched = { ...this.state.touched, [event.target.id]: true }

		this.setState({ user, touched })

	}

	fieldValidate = ({ target }) => {

		const { user } = this.state;
		const { touched } = this.state;

		const errors = { ...STATE_ERROR_INITIAL };

		if (!this.state.user.name.includes(' ') && touched.name) {
			errors['name'] = 'Informe o nome completo'
		}

		// Validar o CPF
		// if (touched.id && UserService.existId) {
		// 	errors['id'] = 'Usuário já está cadastrado'
		// }


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

	goBackButtonAction = () => {

		// this.goBack();

	}

 	confirmForm = (event) => {
		event.preventDefault();

		/**
		 * Manda criar o usuario
		 * Se der certo, redireciona para home e exibe mensagem de sucesso
		 * Adiciona Token/info do user no contexto
		 * Se der errado informa mensagem de erro
		 */


		// Todos tocados
		if (this.state.touched.name && this.state.touched.id && this.state.touched.phone && this.state.touched.email && this.state.touched.password) {
			//&& !this.state.error && !this.state.error.name && !this.state.error.id && !this.state.error.phone && !this.state.error.email && !this.state.error.password) {

			UserService.createUser({
				name: this.state.user.name,
				identifier: this.state.user.id,
				email: this.state.user.email,
				phone: this.state.user.phone,
				password: this.state.user.password
			})
				.then((result) => {

					if (result.ok) {
						this.context.setMsg(result.message)

						const redirectToLogin = { redirect: true }
						this.setState({ redirectToLogin })

					} else {
						this.context.setMsg(result.message)
					}
				})

		} else {
			this.context.setMsg('Preencha todos os campos.')
		}


	}


	render() {

		if (this.state.redirectToLogin.redirect) return (<Redirect to="/login" />)

		return (
			<>
				<div className={style.navbar}>
					<MainBar ></MainBar>
				</div>
				<div className={style.main}>
					<div className={style.container}>

						<form action="/" onSubmit={this.confirmForm}>

							<div className={style.formFields}>

								<div className={style.formTitle}>

									<Typography variant="h5" >Informe seus dados:</Typography>
								</div>

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

								<div className={style.buttons}>

									<Button variant="outline-primary" type="submit">Confirmar</Button>

									<Button variant="outline-primary" type="button" onClick={this.goBackButtonAction}>Voltar</Button>

								</div>
							</div>

						</form>

					</div>
				</div>
			</>
		)

	}
}

const FormFieldInput = ({ id, label, onChange, value, type = "text", onBlur, error = false, helperText }) => {

	return (

		<div >

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
				className={style.textField}
			></TextField>

		</div>
	)
}

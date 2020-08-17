import React, { Component } from 'react'
import usersStyles from "./users.module.css"
import { FormValidateService } from "../../Service/FormValidateService"
import { UserService } from '../../Service/UserService';

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

		const STATE_ERROR_INITIAL = {
			id: '',
			name: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: ''
		}

	}

	fieldChange = (event) => {

		console.log(`Change: ${[event.target.id]} valor: ${event.target.value}`);
		const user = { ...this.state.user, [event.target.id]: event.target.value }
		const touched = { ...this.state.touched, [event.target.id]: true }

		this.setState({ user, touched })

	}

	fieldValidate = ({ target }) => {

		const { user } = this.state;
		const { touched } = this.state;

		const errors = {...this.STATE_ERROR_INITIAL};

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

		// Valida confirm pwd
		if (touched.password && touched.confirmPassword && user.password !== user.confirmPassword) {
			errors['confirmPassword'] = 'As senhas devem ser id�nticas'
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
		const containerStyle = `${usersStyles.container} ${usersStyles.loginPage__inputWrap}`
		return (

			<>
				<div className={containerStyle}>
					<form action="/" onSubmit={this.confirmForm}>

						<InputFormField
							id="name"
							label='Nome'
							value={this.state.user.name}
							onChange={this.fieldChange}
							onBlur={this.fieldValidate}
							errors={this.state.errors}></InputFormField>

						<InputFormField
							id="email"
							label='E-mail'
							value={this.state.user.email}
							onChange={this.fieldChange}
							onBlur={this.fieldValidate}
							errors={this.state.errors}></InputFormField>

						<InputFormField
							id="phone"
							label='Telefone'
							value={this.state.user.phone}
							onChange={this.fieldChange}
							onBlur={this.fieldValidate}
							errors={this.state.errors}></InputFormField>

						<InputFormField
							id="id"
							label='CPF'
							value={this.state.user.id}
							onChange={this.fieldChange}
							onBlur={this.fieldValidate}
							errors={this.state.errors}></InputFormField>

						<InputFormField
							id="password"
							label='Senha'
							type="password"
							value={this.state.user.password}
							onChange={this.fieldChange}
							onBlur={this.fieldValidate}
							errors={this.state.errors}></InputFormField>

						<InputFormField
							id="confirmPassword"
							label='Confirme a Senha'
							type="password"
							value={this.state.user.confirmPassword}
							onChange={this.fieldChange}
							onBlur={this.fieldValidate}
							errors={this.state.errors}></InputFormField>

						<button className={usersStyles.UserPage__btnLogin} type="submit">Confirmar</button>

					</form>

				</div>
			</>

		)

	}
}

const InputFormField = ({ id, label, type = 'text', value, onChange, onBlur, errors }) => {
	console.log(label);
	return (
		<div>
			<p style={{ color: 'red' }}>{errors && errors[id]}</p>
			<label className={usersStyles.loginPage__label} htmlFor={id}>{label}</label>
			<input className={usersStyles.loginPage__input} id={id} type={type} onBlur={onBlur} value={value} onChange={onChange}></input>
		</div>
	)
}
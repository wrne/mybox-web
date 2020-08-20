import React, { Component } from 'react'
import { Paper, Box, Grid, Typography, TextField, Button } from '@material-ui/core'

export default class LoginPage extends Component {

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

	render() {
		return (
			<>
				<Grid container fixed justify="center" >
					<Grid Item xs={4} />
					<Grid Item xs={4}>
						<Paper bgcolor="primary.main" >

							<form action="/" onSubmit={this.confirmForm} bgcolor="secundary.main">
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
										error={!!this.state.errors.user}
										helperText={this.state.errors.user}
									></FormFieldInput>

									<FormFieldInput
										id="password"
										label="Senha:"
										onChange={this.fieldChange}
										onBlur={this.fieldValidate}
										value={this.state.values.password}
										error={!!this.state.errors.password}
										helperText={this.state.errors.password}
									></FormFieldInput>

									<Grid item>
										<Button type="submit">Confirmar</Button>
									</Grid>

								</Grid>

							</form>
						</Paper>
					</Grid>

					<Grid Item xs={4} />
				</Grid>
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

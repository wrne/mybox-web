import { API_URL } from '../config.js'
import { apiService } from './ApiService'


export const LoginService = {	

	login(email, password) {
		const login = {
			email: email,
			password: password
		}
		return apiService.request(`${API_URL}/sessions`, 'POST', { 'Content-Type': 'application/json', }, login)
			.then(responseApi => {
				
				// Verificando erro
				if (responseApi.error) {
					return {
						ok: false,
						user: {},
						message: 'Falha no login do usuário'
					}
				}

				//SALVAR NO REDUX
				// localStorage.setItem("TOKEN_MY_BOX", responseApi.token)
				
				return (
					{
						ok: true,
						user: responseApi,
						message: 'Usuário logado com sucesso!',
						token: responseApi.token
					}
				)
			})

	}
}
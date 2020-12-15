import { API_URL } from '../config.js'
import { apiService } from './ApiService'
import { NotesThunkActions } from '../store/ducks/notes/index.js'

export const LoginService = {

	login(email, password, msgContext, dispatch, history) {

		const login = {
			email: email,
			password: password
		}

		return apiService.request(`${API_URL}/sessions`, 'POST', { 'Content-Type': 'application/json', }, login)
			.then(responseApi => {

				// Verificando erro
				if (responseApi.error) {

					msgContext.setMsg('Falha no login do usuário');
					return false;

				}

				// return { token: responseApi.token };
				dispatch( NotesThunkActions.setNewToken(responseApi.token) );
				msgContext.setMsg('Usuário logado com sucesso!');

				return true;

			})
			.catch(() => { return false });
	}
}
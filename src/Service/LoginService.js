import { API_URL } from '../config.js'
import { apiService } from './ApiService'
import { NotesThunkActions } from '../store/ducks/notes/index.js'

export const LoginService = {

	login(email, password, msgContext, dispatch) {
		const login = {
			email: email,
			password: password
		}

		return apiService.request(`${API_URL}/sessions`, 'POST', { 'Content-Type': 'application/json', }, login)
			.then( responseApi => {

				// Verificando erro
				if (responseApi.error) {

					msgContext.setMsg('Falha no login do usuário');
					return;

				}

				msgContext.setMsg('Usuário logado com sucesso!');
				console.log('LOGIN SuCCESS');
				dispatch(NotesThunkActions.setNewToken(responseApi.token));
				console.log('PASSOU PELO THUNK LOGIN');

			});

	}
}
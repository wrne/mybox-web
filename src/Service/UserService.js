import {API_URL} from '../config.js'
import {apiService} from './ApiService'

export const UserService = {
	existId(id) {

		const responseApi = apiService.request(`${API_URL}/user/${id}`,'GET')
		
		// Verifica na API se já existe usuário com este cpf cadastrado
		return  (responseApi && responseApi.id)	

	},

	createUser(user) {

		console.log('CREATE-USER',user);
		return apiService.request(`${API_URL}/user/create/`,'POST',
		{
			'Content-Type': 'application/json',
		}
		,user)
		.then((responseApi) => {
			
			// Verificando erro
			if (responseApi.error){
				return {
					ok: false,
					user: {},
					message: 'Falha ao incluir usuário'
				}
			}

			return (
				{
					ok: true,
					user: responseApi,
					message: 'Usuário incluído com sucesso!'
				}
			)
		})

	}
}
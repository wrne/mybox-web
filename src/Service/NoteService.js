import { Save, Update } from '@material-ui/icons';
import { API_URL } from '../config'
import { apiService } from './ApiService'

export const NoteService = {

	listAll(token, option) {

		let endpoint = 'notes'

		if (option && option.shared){
			endpoint = 'sharedwithme'
		}
		
		console.log('LISTALL_ENDPOINT',endpoint);
		console.log('LISTALL_token',token);
		return apiService.request(`${API_URL}/${endpoint}`, 'GET',
			{
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			})
			.then((responseApi) => {

				if (responseApi.error) {
					console.log('ERRO_NOTAS', responseApi);
					return {
						ok: false,
						user: {},
						message: responseApi.error.message
					}
				}

				return responseApi;
			})
	},

	create(note, token) {

		return apiService.request(`${API_URL}/notes/`, 'POST',
			{
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
			, note)
			.then((responseApi) => {

				console.log('CREATE_NOTE',responseApi);
				// Verificando erro
				if (responseApi.error) {
					return {
						ok: false,
						user: {},
						message: 'Falha ao criar nota'
					}
				}

				return (
					{
						ok: true,
						user: responseApi,
						message: 'Nota criada com sucesso!'
					}
				)
			})

	},

	update(note,token) {

		return apiService.request(`${API_URL}/notes/${note.id}`, 'PUT',
			{
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
			, note)
			.then((responseApi) => {

				console.log('UPDATe_NOTE',responseApi);
				// Verificando erro
				if (responseApi.error) {
					return {
						ok: false,
						note: {},
						message: 'Falha ao alterar nota'
					}
				}

				return (
					{
						ok: true,
						message: 'Nota alterada com sucesso!',
						note: responseApi
					}
				)
			})
	},

	delete(id, token) {

		return apiService.request(`${API_URL}/notes/${id}`,'DELETE',
		{
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		})
		.then(responseApi => {
			console.log('DELETE_NOTE',responseApi);
			if (responseApi.error){
				return { 
					ok: false,
					note: {},
					message: 'Falha ao excluir nota'
				}
			}

			return {
				ok: true,
				message: 'Nota excluída com sucesso'
			}
		})
	},

	share(note, shareDestination, token) {

		const shareBody = {
			note_id: note.id,
			shareWith: shareDestination
		}
		console.log('SHARE_SERVICE',shareBody);

		return apiService.request(`${API_URL}/share/`, 'POST',
			{
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
			, shareBody)
			.then((responseApi) => {

				console.log('SHARE_NOTE',responseApi);
				// Verificando erro
				if (responseApi.error) {
					return {
						ok: false,
						user: {},
						message: 'Falha ao compartilhar nota'
					}
				}

				return (
					{
						ok: true,
						user: responseApi,
						message: 'Nota compartilhada com sucesso!'
					}
				)
			})

	},

};
import { Types } from '../../';
import { NoteService } from '../../../Service/NoteService';

export const NotesThunkActions = {

	listAllNotes: (token) => {
		return dispatch => {
			dispatch({ type: Types.INITIAL_CHARGE_NOTE });
			console.log('DUCK_LIST_NOTES', token);

			// try {

			NoteService.listAll(token)
				.then(listNotes => {

					dispatch({
						type: Types.NOTES_CHARGED,
						payload: {
							notes: listNotes
						}
					})
				})
			// } catch {
			// 	console.log('DUCK_LIST_NOTES_ERROR');
			// 	dispatch({ type: Types.ERROR_INITIAL_CHARGE })
			// }
		}
	},

	listAllSharedNotes: (token) => {
		return dispatch => {

			try {

				NoteService.listAll(token, { shared: true })
					.then(listNotes => {

						console.log('LIST_SHARED', listNotes);
						dispatch({
							type: Types.SHOW_MY_SHARED_NOTES,
							payload: {
								sharedNotes: listNotes
							}
						})
					})
			} catch {
				dispatch({ type: Types.ERROR_INITIAL_CHARGE })
			}
		}
	},

	addNote: (note, token) => {
		return dispatch => {

			NoteService.create(note, token)
				.then(response => {

					if (response.ok) {

						const newNote = note;
						dispatch({
							type: Types.ADD_NOTE,
							payload: {
								newNote: newNote
							}
						})
					} else {
						alert('Erro ao incluir nota')
						// throw new Error()
					}

				})


		}
	},

	saveEditNote: (note, token) => {

		const editObj = {
			id: note.id,
			title: note.title,
			content: note.content
		}
		return dispatch => {

			NoteService.update(editObj, token)
				.then(response => {

					dispatch({
						type: Types.SAVE_EDIT_NOTE,
						payload: {
							editedNote: response.note
						}
					})
				})

		}
	},

	deleteNote: (note, token) => {

		return dispatch => {

			NoteService.delete(note.id, token)
				.then(response => {
					dispatch({
						type: Types.DELETE_NOTE,
						payload: {
							idDeleted: note.id
						}
					})
				})
		}

	},

	editNote: (note) => {
		return dispatch => {

			dispatch({
				type: Types.EDIT_NOTE,
				payload: {
					note: note
				}
			})

		}
	},

	newNote: () => {
		return dispatch => {
			dispatch({
				type: Types.NEW_NOTE
			})
		}
	},

	cancelNewNote: () => {
		return dispatch => {
			dispatch({
				type: Types.CANCEL_NEW_NOTE
			})
		}
	},

	shareNote: (note, shareDestination, token) => {

		return dispatch => {
			NoteService.share(note, shareDestination, token)
				.then(responseApi => {
					if (responseApi.ok) {

						dispatch({
							type: Types.SHOW_MY_NOTES
						})
					}
				})

		}
	},

	setNewToken: (newToken) => {
		// Salva no Localstorage
		// console.log('SETNEWTOKEN_DUCK');
		// localStorage.setItem('TOKEN_MY_BOX', newToken)

		return dispatch => {
			dispatch({
				type: Types.SET_TOKEN,
				payload: {
					newToken: newToken
				},
			})
		}
	},
	
	deleteToken: () => {
		// Remove token do Localstorage
		console.log('Removendo token do localStorage');
		localStorage.removeItem('TOKEN_MY_BOX')

		return dispatch =>
			dispatch({
				type: Types.DELETE_TOKEN,
			})
	},

}
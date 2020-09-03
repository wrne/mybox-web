import { Types } from '../../';
import { NoteService } from '../../../Service/NoteService';

export const NotesThunkActions = {

	listAllNotes: () => {
		return dispatch => {
			dispatch({ type: Types.INITIAL_CHARGE_NOTE });
			console.log('DUCK_LIST_NOTES');

			try {

				const listNotes = NoteService.listAll()
				console.log('DUCK_LIST_NOTES_METH', listNotes);
				dispatch({
					type: Types.NOTES_CHARGED,
					payload: {
						notes: listNotes
					}
				})
			} catch{
				dispatch({ type: Types.ERROR_INITIAL_CHARGE })
			}
		}
	},

	addNote: (note) => {
		return dispatch => {

			const newNote = note;
			// Implementação da API para adicionar nova nota
			dispatch({
				type: Types.ADD_NOTE,
				payload: {
					newNote: newNote
				}
			})

		}
	},

	editNote: (note) => {
		return dispatch => {

			console.log('EDIT_NOTE_DUCK',note);
			// Implementação da API para adicionar nova nota
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
	}


}
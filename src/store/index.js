import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

export const Types = {
	ADD_NOTE: "note/ADD",
	REMOVE_NOTE: "note/REMOVE",
	INITIAL_CHARGE_NOTE: "note/CHARGE",
	NOTES_CHARGED: "note/CHARGED",
	ERROR_INITIAL_CHARGE: 'note/CHARGE_ERROR',
	NEW_NOTE: 'note/NEW',
	CANCEL_NEW_NOTE: 'note/CANCEL_NEW',
	EDIT_NOTE: 'note/EDIT',
	SAVE_EDIT_NOTE: 'note/SAVE_EDIT',
	DELETE_NOTE: 'note/DELETE',
	SHOW_MY_NOTES: 'note/SHOW_ALL',
	SHOW_MY_SHARED_NOTES: 'note/SHOW_SHARED',
	SHOW_SHARE_NOTES_AREA: 'note/SHOW_SHARE_AREA',
	SET_TOKEN: 'note/SET_TOKEN',
	DELETE_TOKEN: 'note/DELETE_TOKEN'
}

const INITIAL_STATE = {
	data: [],
	shared: [],
	editNote: {},
	showShared: false,
	newNote: false,
	loading: false,
	error: false,
	token: ''
}

function notesReducer(state = INITIAL_STATE, action) {

	if (action.type === Types.EDIT_NOTE) {
		return ({
			...state,
			newNote: true,
			editNote: action.payload.note
		});
	}

	if (action.type === Types.NEW_NOTE) {
		return ({
			...state,
			loading: false,
			error: false,
			newNote: true,
			editNote: {}
		});
	}

	if (action.type === Types.SHOW_MY_NOTES) {

		return ({
			...state,
			showShared: false,
			showShareNoteArea: false,
			newNote: false,
			editNotes: {}

		});

	}
	

	if (action.type === Types.SHOW_MY_SHARED_NOTES) {

		if (action.payload && action.payload.sharedNotes && action.payload.sharedNotes.length > 0) {

			return ({
				...state,
				showShared: true,
				newNote: false,
				showShareNoteArea: false,
				shared: action.payload.sharedNotes
			});
			
		} else {
			return ({
				...state,
				showShareNoteArea: false,
				showShared: true,
				newNote: false
			});

		}

	}


	if (action.type === Types.CANCEL_NEW_NOTE) {
		return ({
			...state,
			loading: false,
			error: false,
			newNote: false,
			editNote: {}
		});
	}

	if (action.type === Types.INITIAL_CHARGE_NOTE) {
		return ({
			...state,
			loading: true,
			error: false
		});
	}

	if (action.type === Types.ERROR_INITIAL_CHARGE) {
		return ({
			...state,
			loading: false,
			error: true
		});
	}

	if (action.type === Types.NOTES_CHARGED) {
		return ({
			...state,
			data: action.payload.notes,
			loading: false,
			error: false,
			newNote: false,
			editNote: {}
		});
	}

	if (action.type === Types.ADD_NOTE) {
		return ({
			...state,
			data: [action.payload.newNote, ...state.data],
			loading: false,
			error: false,
			editNote: {}
		});
	}

	if (action.type === Types.SET_TOKEN) {
		return ({
			...state,
			token: action.payload.newToken
		});
	}

	
	if (action.type === Types.DELETE_TOKEN) {
		return (INITIAL_STATE); // Zera todas as variaveis do estado
	}

	if (action.type === Types.SAVE_EDIT_NOTE) {
		const newNotes = state.data.map((note) => {
			if (note.id === action.payload.editedNote.id) {
				return action.payload.editedNote;
			} else {
				return note;
			};
		});

		return ({
			...state,
			data: newNotes,
			loading: false,
			error: false,
			editNote: {}
		});
	}

	if (action.type == Types.DELETE_NOTE) {
		const newNotes = state.data.filter(note => {

			if (note.id !== action.payload.idDeleted) {
				return note;
			};
		});

		return ({
			...state,
			data: newNotes,
			editNote: {}
		})
	}

	return state
}

export default createStore(combineReducers({
	notes: notesReducer
}), applyMiddleware(thunkMiddleware));

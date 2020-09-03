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
	EDIT_NOTE: 'note/EDIT'
}

const INITIAL_STATE = {
	data: [],
	editNote: {},
	newNote: false,
	activeNote: {},
	loading: false,
	error: false,
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
			newNote: true
		});
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
			newNote: false
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
	
	return state
}

export default createStore(combineReducers({
	notes: notesReducer
}), applyMiddleware(thunkMiddleware));

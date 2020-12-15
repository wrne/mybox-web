import React from 'react'
import { useDispatch } from 'react-redux'
import { NotesThunkActions } from '../store/ducks/notes/index'
import MainBar from '../Components/NavBar'

export default function HeaderContainer(props) {

	const dispatch = useDispatch();

	function logout() {

		dispatch(NotesThunkActions.deleteToken())

	}

	return (
		<nav>
			<MainBar viewNewNoteAction={props.viewNewNoteAction} viewNoteDetailAction={props.setViewNoteDetail} viewMyNotesAction={props.viewMyNotesAction} viewSharedWithMeAction={props.viewSharedWithMeAction} logOutAction={logout}></MainBar>
		</nav>
	)
};

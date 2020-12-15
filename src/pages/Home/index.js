import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import HeaderContainer from '../../Containers/header.container'
import NoteContainer from '../../Containers/note.container'
import style from './home.module.css'

export default function HomePage(props) {

	const [ viewNoteDetail, setViewNoteDetail ] = useState(false);
	const [ viewNewNoteDetail, setViewNewNoteDetail ] = useState(false);
	const [ viewMyNotesList, setViewMyNotesList ] = useState(true);

	const token = useSelector(state => state.notes.token);

	// CONTROLES DE AÇÃO
	function viewNoteDetailAction(){
		setViewNoteDetail(true);
		setViewNewNoteDetail(false);
	}

	function viewNewNoteAction(){
		setViewNewNoteDetail(true);
		setViewNoteDetail(false);
	}
	
	function viewMyNotesAction() {
		setViewNoteDetail(false);
		setViewNewNoteDetail(false);
		setViewMyNotesList(true);
	}
	
	function viewSharedWithMeAction() {
		setViewNoteDetail(false);
		setViewNewNoteDetail(false);
		setViewMyNotesList(false);
	}


	if (!token)
		return (
			// Router resolve redirecionamento para identificar novo token
			<Redirect to="/"></Redirect>
		)
	else
		return (

			<>
				<div className={style.container}>
					<header className={style.header} >

						<HeaderContainer viewNewNoteAction={viewNewNoteAction} viewMyNotesAction={viewMyNotesAction} viewSharedWithMeAction={viewSharedWithMeAction} ></HeaderContainer>

					</header>

					<main className={style.main}>

						<NoteContainer viewNoteDetailAction={viewNoteDetailAction} viewNewNoteDetail={viewNewNoteDetail} viewNoteDetail={viewNoteDetail} viewMyNotesList={viewMyNotesList}></NoteContainer>

					</main>

				</div>

			</>
		)

}
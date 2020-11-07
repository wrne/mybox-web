import React, { Component } from 'react'
import MainBar from '../../Components/NavBar'
import Note from '../../Components/Note'
import NotesList from '../../Containers/notesList'
import { Container, Row, Col } from 'react-bootstrap'
import { ReactReduxContext } from "react-redux";
import { NotesThunkActions } from '../../store/ducks/notes'
import { Types } from '../../store'
import style from './home.module.css'
import { Redirect } from 'react-router-dom'
import Roteamento from '../../routes'

export default class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			newNote: false,
			shareNoteArea: false,
			shareDestination: '',
			noteShare: {},
			token: ''
		}
	}
	static contextType = ReactReduxContext;

	componentDidMount() {
		this.context.store.subscribe(() => {
			const newNote = this.context.store.getState().notes.newNote;
			const showShareNoteArea = this.context.store.getState().notes.showShareNoteArea;
			const tokenStore = this.context.store.getState().notes.token;

			this.setState({
				newNote: newNote,
				shareNoteArea: showShareNoteArea,
				token: tokenStore
			})
		})

		console.log('WELCOME_HOME', this.context.store.getState());
	}

	newNote = () => {

		this.context.store.dispatch(NotesThunkActions.newNote())
	}

	myNotes = () => {

		this.context.store.dispatch({ type: Types.SHOW_MY_NOTES })
	}

	shared = () => {

		console.log('PAssou pelo método shared');
		if (this.context.store.getState().notes.shared && this.context.store.getState().notes.shared.length > 0) {

			console.log('SHARED NAO VAZIO');
			this.context.store.dispatch({ type: Types.SHOW_MY_SHARED_NOTES })

		} else {

			console.log('SHARED VAZIO');
			this.context.store.dispatch(NotesThunkActions.listAllSharedNotes(this.context.store.getState().notes.token))
		}
	}

	onChangeAction = ({ target }) => {
		const newState = {
			shareDestination: target.value
		};

		this.setState(newState)
	}

	shareNote = () => {

		console.log('PAssou pelo método shareNote');
		if (this.state.shareNoteArea) {

			const store = this.context.store;
			const token = store.getState().notes.token;
			store.dispatch(NotesThunkActions.shareNote(this.state.noteShare, this.state.shareDestination, token))
		}

		this.setState({ shareNoteArea: false })
	}

	logout = () => {

		console.log('PAssou pelo método Logout');
		this.context.store.dispatch(NotesThunkActions.deleteToken())

	}

	renderShareQuestion = () => {
		if (this.state.shareNoteArea) {
			return (<>
				<label>Digite o email de quem receberá o compartilhamento</label>
				<input type="text" value={this.shareDestination} onChange={this.onChangeAction}></input>
				<button onClick={this.shareNote}>Confirmar</button>
			</>)
		}
	}

	render() {
		const newNoteDef = this.state.newNote ? '' : 'none'
		const cssClassesDetailNote = `detailNote ${newNoteDef}`

		if (!this.state.token)
			return (
				// Router resolve redirecionamento para identificar novo token
				<Redirect to="/"></Redirect>
			)
		else
			return (

				<>
					<div className={style.container}>
						<header className={style.header} >
							<nav>
								<MainBar newNoteAction={this.newNote} myNotesAction={this.myNotes} sharedWithMeAction={this.shared} logOutAction={this.logout}></MainBar>
							</nav>
						</header>
						<main className={style.main}>
							<div className={style.noteList}>
								{this.renderShareQuestion()}
								<NotesList></NotesList>
							</div>
							<div style={{ display: `${newNoteDef}` }} className={style.detailNote}>

								<Note actionConfirm={this.saveNote} actionCancel={this.cancelNote}></Note>
							</div>

						</main>

					</div>

				</>
			)
	}
}
import React, { Component } from 'react'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import { ReactReduxContext } from 'react-redux';
import { NotesThunkActions } from '../../store/ducks/notes';
import style from './note.module.css'

export default class index extends Component {

	constructor() {
		super();
		this.state = {
			newNote: {
				id: '',
				title: '',
				content: ''
				// creation: new Date()
			},
			editNote: false
		}
	}

	static contextType = ReactReduxContext;

	componentDidMount() {

		const { store } = this.context;

		store.subscribe(() => {

			if (store.getState().notes.editNote.id) {

				const newNote = store.getState().notes.editNote;
				this.setState({ newNote, editNote: true });

			} else {
				const newNote = {
					id: '',
					title: '',
					content: ''
					// creation: new Date()
				}
				this.setState({ newNote, editNote: false });

			}
		})

	}

	changeForm = ({ target }) => {

		const newNote = { ...this.state.newNote, [target.id]: target.value }
		this.setState({ newNote })
	}

	saveNote = () => {

		const { store } = this.context;
		if (this.state.editNote) {

			this.context.store.dispatch(NotesThunkActions.saveEditNote(this.state.newNote, store.getState().notes.token));

		} else {

			this.context.store.dispatch(NotesThunkActions.addNote(this.state.newNote, store.getState().notes.token));
		}

	}

	cancelNote = () => {
		this.context.store.dispatch(NotesThunkActions.cancelNewNote());
	}

	render() {
		return (
			<>
				<Form>
					<Form.Group controlId="title">
						<Form.Label>Título</Form.Label>
						<Form.Control placeholder="Title here.." value={this.state.newNote.title} onChange={this.changeForm}></Form.Control>
					</Form.Group>

					<Form.Group controlId="content">
						<Form.Label>Conteúdo</Form.Label>
						<div className={style.textArea}>

						<Form.Control as="textarea" placeholder="Your note here.." value={this.state.newNote.content} onChange={this.changeForm}></Form.Control>
						</div>
					</Form.Group>

					<div className={style.buttons}>

						<Button  variant="secondary" onClick={this.saveNote}>{this.state.editNote ? 'Salvar' : 'Adicionar'}</Button>
						<Button  variant="secondary" onClick={this.cancelNote}>Cancelar</Button>

					</div>

				</Form>
			</>
		)
	}
}

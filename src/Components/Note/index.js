import React, { Component } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { ReactReduxContext } from 'react-redux';
import { NotesThunkActions } from '../../store/ducks/notes';

export default class index extends Component {

	constructor() {
		super();
		this.state = {
			newNote: {
				title: '',
				content: ''
			},
			editNote: false
		}
	}

	static contextType = ReactReduxContext;

	componentDidMount() {

		const { store } = this.context;

		store.subscribe(() => {
			console.log('EDIT_NOTE_STORE', store.getState().notes.editNote);
			if (store.getState().notes.editNote) {
				const newNote = store.getState().notes.editNote;
				console.log('EDIT_NOTE', newNote);
				this.setState({ newNote, editNote: true });
			}
		})

	}

	changeForm = ({ target }) => {

		const newNote = { ...this.state.newNote, [target.id]: target.value }
		this.setState({ newNote })
	}

	saveNote = () => {

		this.context.store.dispatch(NotesThunkActions.addNote(this.state.newNote));

		const newNote = {
			title: '',
			content: ''
		};
		this.setState({ newNote, editNote: true })

	}

	cancelNote = () => {
		this.context.store.dispatch(NotesThunkActions.cancelNewNote());

		const newNote = {
			title: '',
			content: ''
		};

		this.setState({ newNote, editNote: true })

	}

	render() {
		return (
			<Card>
				<Form>
					<Form.Group controlId="title">
						<Form.Label>Título</Form.Label>
						<Form.Control placeholder="Title here.." value={this.state.newNote.title} onChange={this.changeForm}></Form.Control>
					</Form.Group>

					<Form.Group controlId="content">
						<Form.Label>Conteúdo</Form.Label>
						<Form.Control placeholder="Your note here.." value={this.state.newNote.content} onChange={this.changeForm}></Form.Control>
					</Form.Group>


					<Button onClick={this.saveNote}>{this.state.editNote ? 'Salvar' : 'Adicionar'}</Button>
					<Button onClick={this.cancelNote}>Cancelar</Button>

				</Form>
			</Card>
		)
	}
}

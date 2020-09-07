import React, { Component } from 'react'
import { Row, Col, Card, Button, Form } from 'react-bootstrap'
import { ReactReduxContext } from 'react-redux';
import { NotesThunkActions } from '../../store/ducks/notes';

export default class index extends Component {

	constructor() {
		super();
		this.state = {
			newNote: {
				id: '',
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

			if (store.getState().notes.editNote.id) {

				const newNote = store.getState().notes.editNote;
				this.setState({ newNote, editNote: true });

			} else {
				const newNote = {
					id: '',
					title: '',
					content: ''
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

		if (this.state.editNote) {

			this.context.store.dispatch(NotesThunkActions.saveEditNote(this.state.newNote));

		} else {

			this.context.store.dispatch(NotesThunkActions.addNote(this.state.newNote));
		}

		// const newNote = {
		// 	id: '',
		// 	title: '',
		// 	content: ''
		// };
		// this.setState({ newNote, editNote: false })

	}

	cancelNote = () => {
		this.context.store.dispatch(NotesThunkActions.cancelNewNote());

		// const newNote = {
		// 	id: '',
		// 	title: '',
		// 	content: ''
		// };

		// this.setState({ newNote, editNote: false })

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
						<Form.Control as="textarea" placeholder="Your note here.." value={this.state.newNote.content} onChange={this.changeForm}></Form.Control>
					</Form.Group>

					<Row>

						<Col lg={{ span: 3, offset: 2 }} >

							<Button block variant="secondary" onClick={this.saveNote}>{this.state.editNote ? 'Salvar' : 'Adicionar'}</Button>
						</Col>
						<Col lg={{ span: 3, offset: 3 }} >

							<Button block variant="secondary" onClick={this.cancelNote}>Cancelar</Button>
						</Col>
					</Row>

				</Form>
			</>
		)
	}
}

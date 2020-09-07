import React, { Component } from 'react'
import MainBar from '../../Components/NavBar'
import Note from '../../Components/Note'
import NotesList from '../../Containers/notesList'
import { Container, Row, Col } from 'react-bootstrap'
import { ReactReduxContext } from "react-redux";
import { NotesThunkActions } from '../../store/ducks/notes'
import {Types} from '../../store'

export default class HomePage extends Component {
	constructor() {
		super();
		this.state = {
			newNote: false
		}
	}
	static contextType = ReactReduxContext;

	componentDidMount() {
		this.context.store.subscribe(() => {
			const newNote = this.context.store.getState().notes.newNote;
			this.setState({
				newNote: newNote
			})
		})
	}

	newNote = () => {

		this.context.store.dispatch(NotesThunkActions.newNote())
	}

	myNotes = () => {

		this.context.store.dispatch({type: Types.SHOW_MY_NOTES})
	}

	render() {
		const newNoteDef = this.state.newNote ? '' : 'none'
		return (
			< >
				{/* <div style={{display: 'flex'}}> */}
				<Container fluid>
					<Row>

						<header style={{ width: '100%' }} >
							<nav>
								<MainBar newNoteAction={this.newNote} myNotesAction={this.myNotes}></MainBar>
							</nav>
						</header>
					</Row>
					{/* <Container> */}
					<Row>
						{/* <Col lg={2}>
							<Menu newNoteAction={this.newNote}></Menu>
						</Col> */}
						<Col lg={5}>
							{/* <main  > */}
							<NotesList></NotesList>
							{/* </main> */}
						</Col>
						<Col>
							<div style={{ display: `${newNoteDef}` }}>

								<Note actionConfirm={this.saveNote} actionCancel={this.cancelNote}></Note>
							</div>
						</Col>

					</Row>

					{/* </Container> */}
				</Container>

			</>
		)
	}
}
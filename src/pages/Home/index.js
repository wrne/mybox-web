import React, { Component } from 'react'
import NavBar from '../../Components/NavBar'
import Menu from '../../Components/Menu'
import Note from '../../Components/Note'
import NotesList from '../../Containers/notesList'
import { Container, Row, Col } from 'react-bootstrap'
import	{	ReactReduxContext	}	from	"react-redux";
import {NotesThunkActions} from '../../store/ducks/notes'


export default class HomePage extends Component {
	constructor(){
		super();
		this.state = {
			newNote: false
		}
	}
	static contextType = ReactReduxContext;

	componentDidMount(){
		this.context.store.subscribe(()=>{
			const newNote = this.context.store.getState().notes.newNote;
			this.setState({
				newNote: newNote
			})
		})
	}

	newNote = () => {
		
		this.context.store.dispatch(NotesThunkActions.newNote())
	}

	render() {
		const newNoteDef = this.state.newNote ? '' : 'none'
		return (
			< >
				{/* <div style={{display: 'flex'}}> */}
				<Container>
					<Row>

						<header style={{ width: '100%' }} >
							<NavBar></NavBar>
						</header>

					</Row>
					<Row>
						<Col xl={2}>
							<Menu newNoteAction={this.newNote}></Menu>
						</Col>
						<Col xl={4}>
								{/* <main  > */}
									<NotesList></NotesList>
								{/* </main> */}
						</Col>
						<Col>
							<div style={{display:`${ newNoteDef}`}}>

							<Note  actionConfirm={this.saveNote} actionCancel={this.cancelNote}></Note>
							</div>
						</Col>

					</Row>

				</Container>



			</>
		)
	}
}
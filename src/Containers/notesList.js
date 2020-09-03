import React, { Component } from 'react'
import { Button,Container, Card, ListGroup } from 'react-bootstrap';
import { ReactReduxContext } from 'react-redux';
import { NotesThunkActions } from '../store/ducks/notes';


export default class notesList extends Component {

	// const [lista, setLista] = useState([])
	constructor() {
		super();
		this.state = {
			noteList: []
		}
	}
	static contextType = ReactReduxContext;

	componentDidMount() {
		const store = this.context.store;
		// const noteList = NoteService.listAll();
		store.subscribe(() => {
			
			this.setState({
				noteList: store.getState().notes.data
			})
		})

		store.dispatch(NotesThunkActions.listAllNotes());
	}

	noteDetail = (noteDetail) => {

		this.context.store.dispatch(NotesThunkActions.editNote(noteDetail));

	}

	renderList = () => {
		
		{
			if (this.state.noteList.length) {
				return (
					<ListGroup>
						{this.state.noteList.map((nota) => {
							return (

								// <ListGroup.Item>
								<Card id={nota.id}>
									<Card.Body>
										<Card.Title>{nota.title}<Button onClick={()=>this.noteDetail(nota)}>Detalhes</Button></Card.Title>
										<Card.Text>{nota.content.substring(0, 50)}</Card.Text>
									</Card.Body>
								</Card>
								// </ListGroup.Item>
							)
						})}
					</ListGroup>
				)
			} else {
				return (<span>Inclua uma nota</span>)
			}
		}
	}

	render() {

		return (
			<Container fluid>
				{this.renderList()}
			</Container >
		)
	}
}
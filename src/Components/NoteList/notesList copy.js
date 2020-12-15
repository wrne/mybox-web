import React, { Component } from 'react'
import { Tooltip, OverlayTrigger, Row, Col, Button, Container, Card, ListGroup } from 'react-bootstrap';
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
	
	renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Detalhes
		</Tooltip>
	  );

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
										<Row>
											<Col lg="10"><Card.Title>{nota.title}</Card.Title></Col>
											<Col lg="2">
												<OverlayTrigger
													placement="right"
													delay={{ show: 500, hide: 400 }}
													overlay={this.renderTooltip}
												>
											
													<Button variant="outline-info" size="sm" onClick={() => this.noteDetail(nota)}>+</Button>
												</OverlayTrigger>
											</Col>

										</Row>
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
			<Container >
				{this.renderList()}
			</Container >
		)
	}
}
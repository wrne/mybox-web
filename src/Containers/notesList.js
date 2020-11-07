import React, { Component } from 'react'
import { Tooltip, OverlayTrigger, Row, Col, Button, Container, Card, ListGroup } from 'react-bootstrap';
import { ReactReduxContext } from 'react-redux';
import { NotesThunkActions } from '../store/ducks/notes';
import { Types } from '../store'
import style from './listNote.module.css'
import iconRemove from '../assets/delete.svg'
import iconDetail from '../assets/search.svg'
import iconShare from '../assets/share.svg'
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
				noteList: store.getState().notes.showShared ? store.getState().notes.shared : store.getState().notes.data
			})
		})

		store.dispatch(NotesThunkActions.listAllNotes(store.getState().notes.token));
	}

	noteDetail = (noteDetail) => {

		this.context.store.dispatch(NotesThunkActions.editNote(noteDetail));

	}

	deleteNote = (note) => {
		const store = this.context.store;
		store.dispatch(NotesThunkActions.deleteNote(note, store.getState().notes.token))
	}


	showShareNote = (note) => {

		this.context.store.dispatch({ type: Types.SHOW_SHARE_NOTES_AREA })
		
	}


	renderTooltipDetails = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Detalhes
		</Tooltip>
	);

	renderTooltipRemove = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Remover
		</Tooltip>
	);

	renderTooltipShare = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Compartilhar
		</Tooltip>
	);

	renderList = () => {

		{
			if (this.state.noteList.length) {
				return (
					<ul>
						{this.state.noteList.map((nota) => {
							return (
								<li className={style.item} key={nota.id}>
									<div className={style.cabItem}>
										<h6 className={style.titleItem} >{nota.title}</h6>
										<small>01/09/20</small>

									</div>
									<div className={style.contentItem}>
										<span className={style.contentItemText}>{nota.content.substring(0, 50)}</span>
										<div className={style.buttons}>
											<OverlayTrigger
												placement="right"
												delay={{ show: 500, hide: 400 }}
												overlay={this.renderTooltipDetails}
											>

												<Button variant="outline-info" size="sm" onClick={() => this.noteDetail(nota)}>
													<img src={iconDetail} width="15" height="15"></img>
												</Button>

											</OverlayTrigger>
											{!this.context.store.getState().notes.showShared

												?
												<>

												<OverlayTrigger
												placement="right"
												delay={{ show: 500, hide: 400 }}
												overlay={this.renderTooltipRemove}
											>
												<Button variant="outline-info" size="sm" onClick={() => this.deleteNote(nota)}>
													<img src={iconRemove} width="15" height="15"></img>
												</Button>
											</OverlayTrigger>
											<OverlayTrigger
												placement="right"
												delay={{ show: 500, hide: 400 }}
												overlay={this.renderTooltipShare}
											>
												<Button variant="outline-info" size="sm" onClick={() => this.showShareNote(nota)}>
													<img src={iconShare} width="15" height="15"></img>
												</Button>
											</OverlayTrigger>
											</>
											:
											null
									}
										</div>
									</div>

								</li>
							)
						})
						}
					</ul >
				)
			} else {
				return (<span>Inclua uma nota</span>)
			}
		}
	}


	render() {

		return (
			<div >
				{this.renderList()}
			</div >
		)
	}
}
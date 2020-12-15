import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NotesThunkActions } from '../store/ducks/notes'
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import Note from '../Components/Note'
import iconRemove from '../assets/delete.svg'
import iconShare from '../assets/share.svg'
import style from './listNote.module.css'

export default function NoteContainer(props) {

	const [noteDetail, setNoteDetail] = useState({});

	const [viewShareNoteArea, setViewShareNoteArea] = useState(false);
	const [noteShare, setNoteShare] = useState({});
	const [shareDestination, setShareDestination] = useState('');

	const token = useSelector(state => state.notes.token);
	// const showShared = useSelector(state => state.notes.showShared);
	// const showShared = viewMyNotesList;
	const reduxListShared = useSelector(state => state.notes.shared);
	const reduxNotesList = useSelector(state => state.notes.data);
	const isLoading = useSelector(state => state.notes.loading);

	const dispatch = useDispatch();


	// Executa carga da lista após montagem da tela
	useEffect(() => {

		if (props.viewNewNoteDetail) {

			const newNote = {
				title: '',
				content: ''
			}
			setNoteDetail(newNote)
		}

	}, [props.viewNewNoteDetail]);

	function saveNote() {

		if (props.viewNoteDetail) {

			dispatch(NotesThunkActions.saveEditNote(noteDetail, token));

		} else {

			console.log('SAVE NOTE', noteDetail);
			dispatch(NotesThunkActions.addNote(noteDetail, token));
		}

	};

	function deleteNote(note) {
		dispatch(NotesThunkActions.deleteNote(note, token))
	};

	function cancelNote() {
		dispatch(NotesThunkActions.cancelNewNote());
	};


	function onChangeNoteFormAction({ target }) {

		const newNote = { ...noteDetail, [target.id]: target.value }
		setNoteDetail(newNote)

	};


	// Compartilhando notas

	function onChangeShareAction({ target }) {
		setShareDestination(target.value);
	};

	function shareNoteAction() {

		if (viewShareNoteArea) {

			dispatch(NotesThunkActions.shareNote(noteShare, shareDestination, token))
		}

		setViewShareNoteArea(false)
	};

	function renderShareQuestion() {
		if (viewShareNoteArea) {
			return (<>
				<label>Digite o email de quem receberá o compartilhamento</label>
				<input type="text" value={shareDestination} onChange={onChangeShareAction}></input>
				<button onClick={shareNoteAction}>Confirmar</button>
			</>)
		}
	};

	function showShareNote(nota) {

		setNoteShare(nota); // Define qual nota será compartilhada
		setViewShareNoteArea(true); // Habilita visão do modal de compartilhamento

	};


	/**
	 * Tooltips da lista
	 */

	function renderTooltipDetails(props) {
		return (
			<Tooltip id="button-tooltip" {...props}>
				Detalhes
			</Tooltip>
		)
	};

	function renderTooltipRemove(props) {
		return (

			<Tooltip id="button-tooltip" {...props}>
				Remover
			</Tooltip>
		)
	};

	function renderTooltipShare(props) {
		return (

			<Tooltip id="button-tooltip" {...props}>
				Compartilhar
			</Tooltip>
		)
	};

	function showNoteDetail(nota) {

		setNoteDetail(nota); // Determina qual nota será visualizada
		props.viewNoteDetailAction() // Dispara controle de visualização da Home

	};

	/**
	 * Renderização da lista de notas
	 */

	function renderList() {


		const noteList = props.viewMyNotesList ? reduxNotesList : reduxListShared;

		if (noteList && noteList.length && noteList.length > 0) {
			return (
				<ul>
					{noteList.map((nota) => {
						return (
							<li className={style.item} key={nota.id} onClick={() => showNoteDetail(nota)}>
								<div className={style.cabItem}>
									<h6 className={style.titleItem} >{nota.title}</h6>
									<small>01/09/20</small>

								</div>
								<div className={style.contentItem}>
									<span className={style.contentItemText}>{nota.content.substring(0, 50)}</span>
									<div className={style.buttons}>
										{/* <OverlayTrigger
											placement="right"
											delay={{ show: 500, hide: 400 }}
											overlay={renderTooltipDetails()}
										>

											<Button variant="outline-info" size="sm" onClick={() => showNoteDetail(nota)}>
												<img src={iconDetail} width="15" height="15" alt="show detail"></img>
											</Button>

										</OverlayTrigger> */}
										{props.viewMyNotesList

											?
											<>

												<OverlayTrigger
													placement="right"
													delay={{ show: 500, hide: 400 }}
													overlay={renderTooltipRemove}
												>
													<Button variant="outline-info" size="sm" onClick={() => deleteNote(nota)}>
														<img src={iconRemove} width="15" height="15" alt="delete note"></img>
													</Button>
												</OverlayTrigger>
												<OverlayTrigger
													placement="right"
													delay={{ show: 500, hide: 400 }}
													overlay={renderTooltipShare}
												>
													<Button variant="outline-info" size="sm" onClick={() => showShareNote(nota)}>
														<img src={iconShare} width="15" height="15" alt="share note"></img>
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
		} 

	}

	function renderNoteDetail() {
		if (noteDetail) {

			return <Note actionConfirm={saveNote} actionCancel={cancelNote} onChangeNoteFormAction={onChangeNoteFormAction} noteDetail={noteDetail} editNoteMode={props.viewNoteDetail} ></Note>

		}
	}

	const viewNoteDetailCSSProp = props.viewNoteDetail || props.viewNewNoteDetail ? '' : 'none'
	// const cssClassesDetailNote = `detailNote ${viewNoteDetailCSSProp}`

	if ((props.viewMyNotesList && reduxNotesList && reduxNotesList.length) || (!props.viewMyNotesList && reduxListShared && reduxListShared.length) || props.viewNewNoteDetail) {

		return (
			<>
				<div className={style.noteList} >
					{renderShareQuestion()}
					{renderList()}
				</div >
				<div style={{ display: `${viewNoteDetailCSSProp}` }} className={style.detailNote}>

					{renderNoteDetail()}

				</div>

			</>
		)

	} else {

		if (props.viewMyNotesList) {
			dispatch(NotesThunkActions.listAllNotes(token));
		} else {
			dispatch(NotesThunkActions.listAllSharedNotes(token));
		}

		if (isLoading){
			return (<span>Carregando</span>)
		} else {
			if (props.viewMyNotesList){
				return (<span>Inclua uma nota</span>)
			} else {
				return (<span>Nenhuma nota compartilhada com você</span>)
			}
		}
	}
	// if ((props.viewMyNotesList && reduxNotesList && reduxNotesList.length) || (!props.viewMyNotesList && reduxListShared && reduxListShared.length)) {

	// } else {
	// }
}



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










	render() {

		return (
			<div >
				{this.renderList()}
			</div >
		)
	}
}
import React from 'react'
import { Container, Card, ListGroup } from 'react-bootstrap'

export default function Menu(props) {
	return (
		<>
			<Card >
				<ListGroup >
					<ListGroup.Item action onClick={props.newNoteAction}>Nova Nota</ListGroup.Item>
					<ListGroup.Item action>Compartilhados Comigo</ListGroup.Item>
					<ListGroup.Item action>Sobre</ListGroup.Item>
				</ListGroup>
			</Card>

		</>
	)
}
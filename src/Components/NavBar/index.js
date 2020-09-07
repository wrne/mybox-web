import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

// import MenuIcon from '@material-ui/icons/Menu';


export default class MainBar extends Component {

	render() {

		return (

			<Navbar bg="dark" variant="dark" expand="lg" >
				<Navbar.Brand href="#home">My Box</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">

					<Nav className="mr-auto">
						<Nav.Link href="#" onClick={this.props.newNoteAction} >Nova Nota</Nav.Link>
						<Nav.Link href="#" onClick={this.props.myNotesAction}>Minhas notas</Nav.Link>
						<Nav.Link href="#">Compartilhados Comigo</Nav.Link>
					</Nav>

					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-info">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>

		)
	}
}

import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import style from './navBar.module.css'
import { ReactReduxContext } from "react-redux";
import { Types } from '../../store'

// import MenuIcon from '@material-ui/icons/Menu';


// export default class MainBar extends Component {
export default function MainBar(props){

	// static contextType = ReactReduxContext;

	// render() {

		return (
			
			<div className={style.main}>
				<div className={style.logo_nav}> 

					<div>
						<h4 className={style.logo}>My Box</h4>
					</div>
					<nav className={style.menuContainer}>

						<div className={style.menu}>
							<li className={style.itemMenu}><a href="#" className={style.itemLink} onClick={props.newNoteAction}>Nova Nota |</a></li>
							<li className={style.itemMenu}><a href="#" className={style.itemLink} onClick={props.myNotesAction}>Minhas Notas |</a></li>
							<li className={style.itemMenu}><a href="#" className={style.itemLink} onClick={props.sharedWithMeAction} >Compartilhados comigo</a></li>
						</div>
					</nav>
				</div>
				<div className={style.logout}>
					<li className={style.itemMenu}><a href="#" className={style.itemLink} onClick={props.logOutAction} >Log Out</a></li>
				</div>
			</div>

		)
	// }
}

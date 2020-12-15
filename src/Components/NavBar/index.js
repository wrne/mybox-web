import React from 'react'
import style from './navBar.module.css'

export default function MainBar(props) {

	return (

		<div className={style.main}>
			<div className={style.logo_nav}>

				<div>
					<h4 className={style.logo}>My Box</h4>
				</div>
				<nav className={style.menuContainer}>

					<div className={style.menu}>
						<li className={style.itemMenu}><a href="#" className={style.itemLink} onClick={props.viewNewNoteAction}>Nova Nota |</a></li>
						<li className={style.itemMenu}><a href="#" className={style.itemLink} onClick={props.viewMyNotesAction}>Minhas Notas |</a></li>
						<li className={style.itemMenu}><a href="#" className={style.itemLink} onClick={props.viewSharedWithMeAction} >Compartilhados comigo</a></li>
					</div>
				</nav>
			</div>
			<div className={style.logout}>
				<li className={style.itemMenu}><a href="#" className={style.itemLink} onClick={props.logOutAction} >Log Out</a></li>
			</div>
		</div>

	)
}

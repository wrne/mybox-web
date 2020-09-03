import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'

// import MenuIcon from '@material-ui/icons/Menu';


export default class NavBar extends Component {

	render() {

		return (
			<nav >
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="menu">
							{/* <MenuIcon /> */}
						</IconButton>
						<Typography variant="h6" >My Box</Typography>
						{/* <Button color="inherit">Login</Button> */}
						{this.props.children}
					</Toolbar>
				</AppBar>
			</nav>
		)
	}
}

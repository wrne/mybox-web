import React, { Component, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';
import { NoteService } from '../Service/NoteService'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: '36ch',
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
}));

export default class NoteList extends Component {
	constructor() {
		super();
		// this.classes = useStyles();
		this.state = {
			noteList: []
		}

	}

	componentDidMount() {
		const noteList = NoteService.listAll();
		console.log('DID_MOUNT', noteList);
		this.setState({ noteList });
		console.log('DID_MOUNT_STATE', this.state);
	}
	renderNoteList = (item, index) => {

		console.log('RENDER_NOTE', item);
		return (
			<List style={{ width: '100%', maxWidth: '36ch', backgroundColor: 'paper' }}>
				{this.state.noteList.map((item, index) => {

					return (

						<Fragment>

							{/* { if (index > 0) <Divider variant="inset" component="li" /> } */}

							<ListItem alignItems="flex-start">
							
								{/* <Image alt="a" src="/static/images/avatar/2.jpg" /> */}
								
								<ListItemText
									primary={`${item.title}`}
									secondary={
										<React.Fragment>
											<Typography
												component="span"
												variant="body2"
												// className={this.classes.inline}
												style={{ display: 'inline' }}
												color="textPrimary"
											>{`${item.dateCreation}`}</Typography>
											{`${item.content}`}
										</React.Fragment>
									}
								/>
							</ListItem>
						</Fragment>
					)
				})}
			</List>

		)
	}

	render() {

		return (
			<>
				<div>
					{this.renderNoteList()}
				</div>
			</>
		);
	}
}

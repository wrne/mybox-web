import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import style from './note.module.css'

export default function Note (props){
	console.log('NOTE',props.noteDetail);
		return (
			<>
				<Form>
					<Form.Group controlId="title">
						<Form.Label>Título</Form.Label>
						<Form.Control placeholder="Title here.." value={props.noteDetail.title} onChange={props.onChangeNoteFormAction}></Form.Control>
					</Form.Group>

					<Form.Group controlId="content">
						<Form.Label>Conteúdo</Form.Label>
						<div className={style.textArea}>

						<Form.Control as="textarea" placeholder="Your note here.." value={props.noteDetail.content} onChange={props.onChangeNoteFormAction}></Form.Control>
						</div>
					</Form.Group>

					<div className={style.buttons}>

						<Button  variant="secondary" onClick={props.actionConfirm}>{props.editNoteMode ? 'Salvar' : 'Adicionar'}</Button>
						<Button  variant="secondary" onClick={props.actionCancel}>Cancelar</Button>

					</div>

				</Form>
			</>
		)
	
}

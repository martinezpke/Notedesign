import React, { useState, useEffect } from 'react'
import Modal from '../Modal/Modal'
import { getAllColor } from '../../api/note.api'
import { updateNote } from '../../api/note.api'

import './Note.css'
import './FlotMe.css'

function Note({ title, description, funDelete, id, updateData, color, styleFunDelete }) {
	const [idNote, setIdNote] = useState(id)
	const [isOpen, setIsOpen] = useState(false);
	const [colorNote, setColorNote] = useState(color);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [colorMenu, setColorMenu] = useState([]);
	/* const [hoverColor, setHoverColor] = useState(null); */

	// This function is the action popa
	const handlePopaNote = async () => {

		if (isOpen == false) {
			setIsOpen(true);

		} else {
			setIsOpen(false);
		}
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const updateColorNote = async (idNota, newColor) => {
		const colorData = {
			color: newColor.id
		}

		try {
      const response = await updateNote(idNota, colorData);
			updateData()
			setColorNote(newColor.hex)
      console.log("Nota actulizada:", response.data);

    } catch (error) {
      console.error("Error al actulizar:", error);
    }
	}


	useEffect(() => {
		async	function loadAllColors() {
			const res = await getAllColor();
			const array = res.data;
			setColorMenu(array);
		}

		loadAllColors();
	},[])

	return (
		<>
			<div className='wrapper'>
				<div className="content column contentClick" onClick={handlePopaNote} id={id}>
					<div className="title" style={{ backgroundColor: `${colorNote}1d` }}>
						<label>{title}</label>
					</div>
					<div className="description">
						<p className='t'>{description}</p>
					</div>
				</div>
				<div className="functions" >
				<div className="menu-container">
					<button style={{ color: `${colorNote}` }} className="menu-button" onClick={toggleMenu}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
						</svg>
					</button>
					{isMenuOpen && (
						<div className="menu">
							<ul>
								{colorMenu.map(colorBnt => (
									<li key={colorBnt.id} onClick={() => {updateColorNote(id, colorBnt)}}><a style={{backgroundColor: `${colorBnt.hex}`}}></a></li>
								))}
							</ul>
						</div>
					)}
				</div>
					<button onClick={() => {funDelete(idNote)}} style={{ color: `${colorNote}` }}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
						</svg>
					</button>

				</div>
				{isOpen && (
					<Modal
						title={title}
						description={description}
						onClick={handlePopaNote}
						data={(title, description) => { }}
						id={idNote}
						updateData={updateData}
						
					/>
				)}
			</div>
		</>
	)
}

export default Note

import React, { useState } from 'react'
import ModalCreate from '../ModalCreate/ModalCreate'
import { CreateNote } from '../../api/note.api'
import './AddNote.css'

const AddNote = ({ updateData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // This function is the action popa
  const handlePopaNote = async (e) => {

    if (isOpen == false) {
      setIsOpen(true);

    } else {
      setIsOpen(false);
    }
  }

  const addDataNote = (title, description) => {
    setTitle(title);
    setDescription(description);
  }

  const handleCreateNote = async () => {
    if (title.length > 0 || description.length > 0) {
      const noteData = {
        title: title,
        description: description,
      };

      try {
        const response = await CreateNote(noteData);
        console.log("Nota creada:", response.data);
        updateData()
        handlePopaNote();
      } catch (error) {
        console.error("Error al crear la nota:", error);
      }

    } else {
      console.log("es");
    }

  };

  return (
    <>
      <div className='wrapper-add' onClick={handlePopaNote}>
        <div className="content-add column" >
          <div className="noteTitle">
            <span>Agrega una nueva nota</span>
          </div>
          <div className="addNote">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
      {isOpen && (
        <ModalCreate
          onClick={handleCreateNote}
          isOpen={handlePopaNote}
          data={addDataNote}
        />
      )}
    </>

  )
}

export default AddNote

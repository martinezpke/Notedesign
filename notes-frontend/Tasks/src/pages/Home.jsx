import React, { useState, useEffect } from 'react'
import { getAllNote } from '../api/note.api';
import Note from '../components/Note/Note';
import AddNote from '../components/AddNote/AddNote';
import SearchNote from '../components/SearchNote/SearchNote';
import { deleteNote } from '../api/note.api';

import './home.css'

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [shouldLoadNotes, setShouldLoadNotes] = useState(true);
  const [filters, setFilters] = useState({
    title: ""
  })

  


  // Esta función ayudara a filtrar la notas por el titulo
  const filterNotes = (notes) => {
    return notes.filter(note => {
      return (
        note.title.toLowerCase().includes(filters.title.toLowerCase()) ||
        filters.title === ""
      )
    })
  }

  // función que extrae el valor del buscador para mandarle el valor al estado de filtro
  const handleChangeTitle = (e) => {
    const value = e.target.value;

    setFilters({
      ...filters, title:value
    })
  }

  // esta función borrar la nota
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setShouldLoadNotes(true);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  // esta función ayudara que los componentes hijos puedan actualizar los datos de la nota
  const handleShouldLoadNotes = () => {
    setShouldLoadNotes(true);
  };

  

  useEffect(() => {
    if (shouldLoadNotes) {
      async function loadAllNote() {
        const res = await getAllNote();
        const array = res.data;
        setNotes(array);
        
      }
      loadAllNote();
      setShouldLoadNotes(false);
    }
  }, [shouldLoadNotes]);

  // variable que contiene el valor filtrado de las notas
  const listNota = filterNotes(notes);

  return (
    <>
      <section>
        <header className='header-home'>
          <nav className="content-home">
            <div className="logo size">
              <img src="../../public/image/foto.jfif" />
            </div>
            <div className="search-note">
              <SearchNote 
                even={ handleChangeTitle }/>
            </div>

          </nav>
        </header>
        <div className="wrapper-Notes">
          <h1>Notas</h1>

          <div className="allNotes">
            <AddNote 
              updateData={handleShouldLoadNotes}
            />
            {listNota.map(note => (
              <div className="note" key={note.id}>
                <Note
                title={note.title}
                description={note.description}
                color={note.color_hex}
                funDelete={handleDeleteNote}
                id={note.id}
                updateData={handleShouldLoadNotes}
              />

              </div>
            ))}
          </div>
          
        </div>


        {/* <button onClick={() => { setShouldLoadNotes(true) }}>Test</button> */}
      </section>
    </>
  )
}

export default Home

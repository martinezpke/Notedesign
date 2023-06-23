import React, {  useEffect, useRef, useState } from 'react';
import './Modal.css'

const Modal = ( {title, description, onClick} ) => {
  const hightText = useRef(null);
  const [isSaveBtn, setIsSaveBtn] = useState(false);
  const [valueTitle, setValueTitle] = useState(title);
  const [valueDescription, setValueDescription] = useState(description);

  const icon = isSaveBtn ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
  </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
  </svg>

  const handleClick = () => {
    setIsSaveBtn(!isSaveBtn);
  }

  const handleAutoHight = () => {
    const textarea = hightText.current;
    textarea.style.height = 'auto'; // Reiniciar la altura a "auto" para que se recalcule correctamente
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar la altura al valor de desplazamiento del contenido
  };
  
  const handleChangeTitle = (e) => {
    setValueTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setValueDescription(e.target.value);
    handleAutoHight(e)
  }

  useEffect(() => {
    handleAutoHight(); // Llamar a la función handleAutoHeight cuando cambie la descripción
  }, [description]);
  

  return (
    <>
      <div className="modal-overlay" onFocus={handleAutoHight}>
        <div className="modal-container" >

          <div className="container-text">
            <div className="modal-header">
              <div className='modal-header-container'>
                <input type="text" value={valueTitle} onChange={handleChangeTitle}/>
              </div>

              <button className='btn-save' onClick={handleClick}>
                {icon}
              </button>

            </div>
            <div className="modal-content">
              <textarea ref={hightText} onChange={handleChangeDescription} value={valueDescription} >

              </textarea>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="option-btn">
            {/* <input type="checkbox" name="status" id="status" /> */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M14.47 2.47a.75.75 0 011.06 0l6 6a.75.75 0 010 1.06l-6 6a.75.75 0 11-1.06-1.06l4.72-4.72H9a5.25 5.25 0 100 10.5h3a.75.75 0 010 1.5H9a6.75 6.75 0 010-13.5h10.19l-4.72-4.72a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>


          </div>
          <button className="modal-close-btn" onClick={onClick}>Cerrar</button>
        </div>
      </div>
    </>
  )
}

export default Modal

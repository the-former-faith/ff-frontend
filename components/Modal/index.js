import React, { useContext, useEffect } from 'react'
import ModalContext from '../../context/ModalContext'
import FocusLock from 'react-focus-lock'

const Modal = () => {
	const[modalStatus, setModalStatus] = useContext(ModalContext)
	const body = document.querySelector("body")

  const handleClick = () => {
    setModalStatus({
      isToggled: false
    })
  }

  const handleEsc = (event) => {
    if (event.keyCode === 27) {
      handleClick()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEsc, false)
    body.style.overflow = 'hidden'
    return function cleanup() {
    	body.style.overflow = 'initial'
      document.removeEventListener("keydown", handleEsc, false)
    }
  })

	return (
		<div className="modal-wrapper">
		  <aside className="modal" role="dialog" aria-labelledby="modal-title">
		    <FocusLock returnFocus={true}>
		    	<header className="modal-header">
		    		<h2 id="modal-title">{modalStatus.title ? modalStatus : 'Information'}</h2>
		      	<button onClick={handleClick} autoFocus>Close</button>
		      </header>
		      <div className="modal-body">
		      	{modalStatus.content}
					</div>
		    </FocusLock>
		  </aside>
		  <div className="modal-overlay" onClick={handleClick} />
		</div>
	)
}

export default Modal
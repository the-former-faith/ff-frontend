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
		      	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec orci bibendum, bibendum risus et, sollicitudin orci. Morbi rutrum enim ac dui vestibulum, sit amet efficitur ex eleifend. Aliquam eu mi sit amet sem luctus suscipit in at libero. Vivamus ullamcorper lacinia mauris nec sodales. Aliquam erat volutpat. Nam convallis ante enim, vel maximus enim aliquet et. Donec mattis orci vitae est sagittis, in viverra erat semper. Sed molestie neque ut velit vulputate iaculis. Proin accumsan iaculis risus. Quisque varius neque ut arcu lobortis fringilla. Sed egestas in odio non volutpat.</p>
						<p>Phasellus accumsan a metus et pellentesque. Nunc convallis tortor sit amet elit aliquet sodales. Integer lorem nisl, molestie a posuere sit amet, pretium ut tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas imperdiet risus commodo, commodo libero sit amet, congue nulla. In venenatis eros sem, ultricies fermentum felis consectetur et. Proin porta eros in aliquam feugiat. Quisque eu urna ornare, finibus lorem nec, eleifend urna.</p>

						<p>Phasellus gravida viverra purus vitae cursus. Sed venenatis mollis pulvinar. Aliquam ac sagittis diam. In feugiat, velit a fermentum efficitur, nulla ligula porta risus, vel ornare ipsum nunc a tellus. Aliquam id sem in erat auctor gravida. Duis eu velit eros. Sed dictum pretium velit sit amet dictum. Vestibulum euismod velit in porta sagittis. Pellentesque a consequat ante, accumsan semper velit.</p>

						<p>Fusce lacinia urna nisi, vel iaculis metus mollis vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque posuere lacinia leo, eu lacinia purus fermentum ultricies. Nulla facilisis nec nibh vehicula molestie. Ut orci purus, maximus id diam nec, semper tempus nulla. Curabitur vel ex consectetur, euismod sapien at, venenatis tortor. Maecenas viverra justo at tristique lobortis. Curabitur tempus semper fringilla. Morbi quis tellus in elit facilisis cursus. Fusce dictum blandit turpis, non facilisis odio scelerisque ut. Vivamus elementum viverra malesuada. Maecenas vulputate mauris sit amet dignissim posuere. Nam sollicitudin aliquet tortor sit amet egestas.</p>
					</div>
		    </FocusLock>
		  </aside>
		  <div className="modal-overlay" onClick={handleClick} />
		</div>
	)
}

export default Modal
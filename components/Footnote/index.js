import BlockContent from '@sanity/block-content-to-react'
import React, { useState, useEffect, useRef, useContext } from 'react'
import ModalContext from '../../context/ModalContext'

const Footnote = ({mark, children}) => {
  //Move this hasJavascript state to parent, and pass it down to here as a prop
  const [hasJavascript, setHasJavascript] = useState(false)
  const addFootnote = (footnotes, current) => {
    const x = footnotes.find(a => a._key === current._key)
    if(typeof x == 'undefined') {
      //pageData.setFootnotes(oldArray => [...oldArray, current])
    }
  }
  //addFootnote(pageData.footnotes, mark)
  useEffect(() => {setHasJavascript(true)}, [hasJavascript])

  const[modalStatus, setModalStatus] = useContext(ModalContext);

  const handleToggle = () => {
    setModalStatus({
      isToggled: modalStatus.isToggled === true ? false: true,
      content: <BlockContent blocks={mark.content} />
    })
  }
  return (
    <>
      {children}
      {hasJavascript
        ? <>
            <button 
                type="button" 
                aria-label="footnote" 
                onClick={handleToggle}
              >
                &#8230;
              </button>
              {modalStatus.isToggled
                ? <span>Open</span>
                : <span>Closed</span>
              }
            </>
        : <span>No JavaScript.</span>
      }
    </>
  )
}

export default Footnote
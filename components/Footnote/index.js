import BlockContent from '@sanity/block-content-to-react'
import React, { useState, useRef, useContext } from 'react'
import ModalContext from '../../context/ModalContext'
import JavascriptContext from '../../context/JavascriptContext'
import FootnotesContext from '../../context/FootnotesContext'

const Footnote = ({mark, children}) => {
  const[footnotes, setFootnotes] = useContext(FootnotesContext)
  const addFootnote = (footnotes, current) => {
    const x = footnotes.find(a => a._key === current._key)
    if(typeof x == 'undefined') {
      setFootnotes(oldArray => [...oldArray, current])
    }
  }
  addFootnote(footnotes, mark)

  const[modalStatus, setModalStatus] = useContext(ModalContext)
  const hasJavascript = useContext(JavascriptContext)

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
            </>
        : <span>No JavaScript.</span>
      }
    </>
  )
}

export default Footnote
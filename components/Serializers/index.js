import BlockContent from '@sanity/block-content-to-react'
import Link from 'next/link'
import React, { useState, useEffect, useRef, useContext } from 'react'
import ModalContext from '../../context/ModalContext'

const Serializers = (pageData) => ({
  marks: {
    abbrTag: props => (
      <abbr title={props.mark.title}>{props.children}</abbr>
    ),
    footnote: ({mark, children}) => {
      //Move this hasJavascript state to parent, and pass it down to here as a prop
      const [hasJavascript, setHasJavascript] = useState(false)
      const addFootnote = (footnotes, current) => {
        const x = footnotes.find(a => a._key === current._key)
        if(typeof x == 'undefined') {
          pageData.setFootnotes(oldArray => [...oldArray, current])
        }
      }
      addFootnote(pageData.footnotes, mark)
      useEffect(() => {setHasJavascript(true)}, [hasJavascript])

      const[modalStatus, setModalStatus] = useContext(ModalContext);

      const handleToggle = () => {
        setModalStatus({
          isToggled: modalStatus.isToggled === true ? false: true
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
    },
    internalLink: ({mark, children}) => {
      const href = `/${mark.lang}/post/${mark.slug}`
      return (
        <Link 
          href={{
            pathname: '/post', 
            query: {
              slug: mark.slug, 
              lang: mark.lang
            }
          }} 
          as={href}>
          <a>{children}</a>
        </Link>
      )
    },
    link: props => (
      <a href={props.mark.url}>{props.children}</a>
    ),
    langTag:  props => (
      <span lang={props.mark.lang}>{props.children}</span>
    ),
    quoteTag: props => (
      <q cite={props.mark.source}>{props.children}</q>
    )
  },
  types: {
    blockQuoteObject: (props) => {
      const source = props.node.source
      return (
        <blockquote>
          <BlockContent blocks={props.node.text} />
          {source &&
            <footer>
              <p>
                {source.author &&
                  <span>{source.author.givenNames[pageData.lang].join(' ') + ' ' + source.author.familyName[pageData.lang]}</span>
                }
                {source.author && source.title &&
                  <span>, </span>
                }
                {source.title &&
                  source.url 
                    ? <cite><a href={source.url}>{source.title}</a></cite> 
                    : <span>{source.title}</span>
                }
              </p>
            </footer>
          }
        </blockquote>
      )
    }
  }
})

export default Serializers
import BlockContent from '@sanity/block-content-to-react'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'

const Serializers = (pageData) => ({
  marks: {
    abbrTag: props => (
      <abbr title={props.mark.title}>{props.children}</abbr>
    ),
    footnote: ({mark, children}) => {
      //Move this hasJavascript state to parent, and pass it down to here as a prop
      const toggleWidth = 300;
      const [hasJavascript, setHasJavascript] = useState(false)
      const [isToggled, setIsToggled] = useState(false)
      const [bubblePosition, setBubblePosition] = useState({'x': 'toggle-center', 'y': 'toggle-bottom'})
      const [margin, setMargin] = useState(1000)
      const footnoteButton = useRef(null);

      const addFootnote = (footnotes, current) => {
        const x = footnotes.find(a => a._key === current._key)
        if(typeof x == 'undefined') {
          pageData.setFootnotes(oldArray => [...oldArray, current])
        }
      }
      addFootnote(pageData.footnotes, mark)
      //console.log(mark)
      useEffect(() => {
          setHasJavascript(true)
      }, [hasJavascript])
      const handleToggle = () => {
        isToggled ? setIsToggled(false) : setIsToggled(true)
      }
      const handleHover = () => {
        const rect = footnoteButton.current.getBoundingClientRect()
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight
        const positionRight = windowWidth - rect.right
        const positionLeft = rect.left
        const positionTop = rect.top
        const positionBottom = windowHeight - rect.bottom
        console.log(positionBottom)
        const allignVertical = (top, bottom, height) => {
          if (bottom > top) {
            setMargin((bottom - 50))
            return 'toggle-bottom'
          } else {
            setMargin((top - 50))
            return 'toggle-top'
          }
        }
        const allignHorizontal = (left, right, width) => {
          if (left >= (width / 2)  && right >= (width / 2)) {
            return 'toggle-center'
          } else if (left >= (width / 2)) {
            return 'toggle-left'
          } else {
            return 'toggle-right'
          }
        }
        setBubblePosition({
          'x': allignHorizontal(positionLeft, positionRight, toggleWidth),
          'y': allignVertical(positionTop, positionBottom, windowHeight)
        })
      }
      return (
        <>
          {children}
          {hasJavascript
            ? <span className="tooltip-container">
                <button 
                  type="button" 
                  aria-label="footnote" 
                  onClick={handleToggle}
                  onMouseOver={handleHover}
                  ref={footnoteButton}
                >
                  &#8230;
                </button>
                <span role="status">
                  {isToggled &&
                    <span 
                      className={`toggletip-bubble ${bubblePosition.x} ${bubblePosition.y}`}
                      style={{
                        width: `${toggleWidth}px`,
                        maxHeight: `${margin}px`
                      }}
                    >
                      <BlockContent blocks={mark.lang} />
                    </span>
                  }
                </span>
              </span>
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
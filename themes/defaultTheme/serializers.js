import BlockContent from '@sanity/block-content-to-react'
import Link from 'next/link'
import React from 'react'
import AbbrTag from '../../components/AbbrTag'
import Footnote from '../../components/Footnote'

const serializers = {
  marks: {
    abbrTag: AbbrTag,
    footnote: Footnote,
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
}

export default serializers
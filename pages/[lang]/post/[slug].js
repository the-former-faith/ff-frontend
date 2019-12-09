import React from 'react'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../../../components/Layout'
import sanity from '../../../config/sanity'
import sanityClient from '../../../config/sanity'
import localize from '../../../utils/localize'

//import Image from '../components/Image'

const serializers = (parent) => ({
  marks: {
    abbrTag: props => (
      <abbr title={props.mark.title}>{props.children}</abbr>
    ),
    footnote: ({mark, children}) => {
      console.log(mark)
      return (
        <span>
          {children}
        </span>
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
                  <span>{source.author.givenNames[parent.lang].join(' ') + ' ' + source.author.familyName[parent.lang]}</span>
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

export default class Post extends React.Component {

  static async getInitialProps(req) {
    return {
      unfilteredPost: await sanity.fetch(
        `*[_type == "post" && slug[$lang].current == $slug] {
          _id,
          title,
          "sections": sections[]->{
            _id,
            heading,
            "content": content {
              ...,
              $lang: ${req.query.lang}[]{
                ...,
                _type == "blockQuoteObject" => {
                  ...,
                  "source": source {
                    ...,
                    "author": author->
                  }
                },
                markDefs[]{
                  ...,
                  _type == "internalLink" => {
                    "slug": @.reference->slug[$lang].current,
                    "lang": $lang
                  }
                }
              }
            }
          }
        }[0]`, 
        {lang: req.query.lang, slug: req.query.slug}
      )
    }
  }

  render() {
    const {unfilteredPost} = this.props
    const post = localize(unfilteredPost, [this.props.lang, 'en'])
    console.log(this.props)
    return (
      <Layout>
        <article>
          <h1>{post.title}</h1>
          {post.imageUrl && <Image imgUrl={post.imageUrl} />}
          {post.sections.map(section => {
            return (
              <section key={section._key}>
                <h2>{section.heading}</h2>
                <BlockContent blocks={section.content} serializers={serializers(this.props)} />
              </section>
            )
          })} 
        </article>
      </Layout>
    )
  }
}

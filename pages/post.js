import React from 'react'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import sanityClient from '../lib/sanity'

const query = `*[_type == "post" && _id == $id] {
  _id,
  title,
  "body": body[]->{
    _id,
    heading,
    body
  }
}[0]
`

export default class Post extends React.Component {

  static async getInitialProps(req) {
    return {
      post: await sanity.fetch(query, {id: req.query.id})
    }
  }

  render() {
    const {post} = this.props
    return (
      <Layout>
        <article>
          <h1>{post.title}</h1>
          {post.body.map(section => {
              return (
                <section key={section._key}>
                  <h2>{section.heading}</h2>
                  <BlockContent blocks={section.body} />
                </section>
              )
            })
          }
        </article>
      </Layout>
    )
  }
}

import React from 'react'
import Link from 'next/link'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import sanityClient from '../lib/sanity'

import Image from '../components/Image'

const query = `*[_type == "post" && _id == $id] {
  _id,
  title,
  "imageUrl": mainImage.asset->url,
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
    console.log(post)
    return (
      <Layout>
        <article>
          <h1>{post.title}</h1>
          {post.imageUrl && <Image imgUrl={post.imageUrl} />}
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

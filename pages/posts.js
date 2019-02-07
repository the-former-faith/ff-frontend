import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import sanity from '../lib/sanity'
import sanityClient from '../lib/sanity'

const query = `*[_type == "post"] {
  _id,
  title
  }[0...50]
`

export default class posts extends React.Component {
  static async getInitialProps() {
    return {
      posts: await sanity.fetch(query)
    }
  }

  render() {
    const {posts} = this.props
    return (
      <Layout>
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <Link href={{pathname: '/post', query: {id: post._id}}}>
                <a>
                  <h3>{post.title}</h3>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

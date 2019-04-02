import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import sanity from '../config/sanity'
import sanityClient from '../config/sanity'
import localize from '../utils/localize'

const query = `*[_type == "post"] {
  _id,
  title,
  slug
  }[0...50]
`

export default class posts extends React.Component {
  static async getInitialProps(req) {
    console.log('request:', req)
    return {
      posts: await sanity.fetch(query),
      lang: 'sw'
    }
  }

  render() {
    const {posts, lang} = this.props
    const filteredPosts = localize(posts, [lang, 'en'])
    return (
      <Layout>
        <ul>
          {filteredPosts.map(post => (
            <li key={post._id}>
              <Link href={{pathname: '/post', query: {slug: post.slug.current, lang: lang}}} as={lang + "/post/" + post.slug.current}>
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

/**/
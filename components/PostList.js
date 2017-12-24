import React, { Component } from 'react'
import Link from 'next/link'

export default class PostList extends Component {
  render () {
    const posts = this.props.posts.map((post, i) => {
      return <li key={i}>
        <Link as={`/post/${post.data.url}`}href={`/post?title=${post.data.url}`}>
          <a>{post.data.title}</a>
        </Link>

        {this.props.role == "admin" &&
          <Link as={`/edit/${post.data.url}`}href={`/edit?title=${post.data.url}`}>
            <a>Edit</a>
          </Link>
        }
        

      </li>
    });
    return <ul>
      {posts}
    </ul>
  }
}

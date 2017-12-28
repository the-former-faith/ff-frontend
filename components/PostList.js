import React, { Component } from 'react'
import Link from 'next/link'
if (typeof window !== 'undefined') { require('../functions/modernizr.min'); }

export default class PostList extends Component {
  render () {
    const posts = this.props.posts.map((post, i) => {
      if (typeof window !== 'undefined' && Modernizr.flexbox) {
        console.log("Flexbox!!!");
      } else {
        console.log("No flexbox");
      }
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

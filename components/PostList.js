import React, { Component } from 'react'
import Link from 'next/link'

export default class PostList extends Component {
  render () {
    let currentPosts = []
    if (this.props.posts !== 'object' && this.props.posts.constructor !== Array) {
      currentPosts.push(this.props.posts)
    } else {
      currentPosts = this.props.posts
    }
    const posts = currentPosts.map((post, i) => {
      const description = function() {
        if (post.data.description) {
          return post.data.description
        } else {
          const firstLine = JSON.parse(post.data.body)
          return firstLine.blocks[0].text
        }
      }()
      
      return <li key={i} className="post">
        <style jsx>
          {`
            .post {
              list-style: none;
              border: 3px solid;
              display: grid;
              grid-template-columns: 1fr 20px;
            }
            .post:not(:last-child) {
              border-bottom: none;
            }
            .post a h2, a.postLink p {
              color: black;
            }
            .postLink {
              display: grid;
              grid-template-rows: 1fr 3fr;
            }
            .postLink.postLinkWithImage {
              grid-template-columns: 1fr 3fr;
            }
            .postLink img {
              grid-column: 1 / 2;
              grid-row: 1 / 3;
              width: 100%;
              border-right: 3px solid black;
            }
            .postLink h2, .postLink p {
              margin: 1rem 1rem .5rem 1rem;
            }
            .post a {
              text-decoration: none;
            }
            .editLink p {
              transform: rotate(-90deg);
              color: white;
            }
            .editLink {
              background-color: black;
            }

          `}
        </style>
        <Link as={`/post/${post.data.url}`}href={`/post?title=${post.data.url}`}>
          <a className={post.data.featuredImage ? "postLink postLinkWithImage" :  "postLink"}>
            {post.data.featuredImage &&
              <img src={post.data.featuredImage} />
            }
            <h2>{post.data.title}</h2>
            <p>{description}</p>
          </a>
        </Link>

        {this.props.role == "admin" &&
          <Link as={`/edit/${post.data.url}`}href={`/edit?title=${post.data.url}`}>
            <a className="editLink"><p>Edit</p></a>
          </Link>
        }

      </li>
    });
    return <ul className='postList'>
      <style jsx>
      {`
        .postList {
          -webkit-margin-before: 0;
          -webkit-margin-after: 0;
          -webkit-padding-start: 0;
        }
      `}
      </style>
      {posts}
    </ul>
  }
}

import React, { Component } from 'react'
import Link from 'next/link'
import { database } from '../functions/database'
import PostList from '../components/PostList'
import LoginButton from '../components/LoginButton'

export default class Index extends Component {
  static async getInitialProps ({req, query}) {
    const user = req && req.session ? req.session.decodedToken : null
    const posts = await database.getCollection("post")
    return { user, posts }
  }

  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }

  componentDidMount () {
    database.auth().then(a => this.setState({user: a[0]})).catch(a => console.log(a))
  }

  render () {
    const { user } = this.state
    return <div>
      <LoginButton user={user} />
      <PostList posts={this.props.posts} />
    </div>
  }
}

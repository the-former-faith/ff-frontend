import React, { Component } from 'react'
import firebase from 'firebase'
import { database } from '../functions/database'
import PostList from '../components/PostList'
import PageLayout from '../components/PageLayout'

export default class Index extends Component {
  static async getInitialProps ({req, query}) {
    const user = req && req.session ? req.session.decodedToken : null
    const role = user ? await database.getUserRole(user.user_id) : null
    const posts = role == "admin"  ? await database.getCollection("post") :
        await database.getQuery("post", ["published", "==", true], 25)
    return { user, posts, role }
  }

  constructor (props) {
    super(props)
    this.state = {
      role: this.props.role,
      user: this.props.user
    }
  }

  componentDidMount () {
    database.init();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        database.getUserRole(user.uid)
            .then(a => this.setState({ user: user, role: a }))
        database.serverLogin(user)
      } else {
        this.setState({ user: null, role: null })
        database.serverLogout()
      }
    })
  }

  render () {
    return <PageLayout user={this.state.user} >
        <PostList posts={this.props.posts} role={this.state.role} />
    </PageLayout>
  }
}

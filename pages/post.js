import React, { Component } from 'react'
import {Editor, EditorState} from 'draft-js'
import firebase from 'firebase'
import { database } from '../functions/database'
import { content } from '../functions/content'
import PageLayout from '../components/PageLayout'
import 'isomorphic-unfetch'

export default class Post extends Component {
  static async getInitialProps ({req, query}) { 
    //these could be grouped together
    //Perhaps use a function to throw them into an array, and then return the array from the function.
    //Then use a spread operator to pass them in the return of getInitialProps
    const page = query.title ? await database.getQuery("post", ["url", "==", query.title], 1) : null

    //these could be grouped together and used on other pages
    const user = req && req.session ? req.session.decodedToken : null
    const role = user == undefined ? null : user == null ? null : await database.getUserRole(user.user_id)
    return { page, user, role }
  }

  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      page: this.props.page,
      role: this.props.role
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
      <article>
        {this.state.page.data.featuredImage &&
          <img width="400px" src={this.state.page.data.featuredImage} />
        }
        <h1>{this.state.page.data.title}</h1>
        <Editor 
          editorState={content.loadDraft(this.state.page.data.body)}
          readOnly={true}
        />
      </article>
    </PageLayout>
  }
}

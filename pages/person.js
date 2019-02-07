import React, { Component } from 'react'
import PageLayout from '../components/PageLayout'
import { database } from '../functions/database'
import 'isomorphic-unfetch'

export default class Post extends Component {
  static async getInitialProps ({req, query}) { 
    var paris = await fetch('http://bible.exchange/graphql?query=query{%20viewer%20{%20bibleVerse(id:%22John%201:1%22){%20id,%20body,%20reference%20}%20}%20}')
    .then(a => {return a.json()})

    //these could be grouped together and used on other pages
    const user = req && req.session ? req.session.decodedToken : null
    const role = user == undefined ? null : user == null ? null : await database.getUserRole(user.user_id)
    
    return { user, role, paris }
  }

  constructor (props) {
    super(props)
    this.state = {
      paris: this.props.paris,
      user: this.props.user,
      role: this.props.role
    }
  }
  
  render () {
    return <PageLayout user={this.state.user} >
      <article>
        <p>Hello</p>
      </article>
    </PageLayout>
  }
}

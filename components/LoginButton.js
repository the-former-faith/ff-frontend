import React, { Component } from 'react'
import firebase from 'firebase'

export default class LoginButton extends Component {
  handleLogin () {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  handleLogout () {
    firebase.auth().signOut()
  }

  render () {
     return <div>
      {
        this.props.user
        ? <button onClick={this.handleLogout}>Logout</button>
        : <button onClick={this.handleLogin}>Login</button>
      }
    </div>
  }
}

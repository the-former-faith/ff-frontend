
import firebase from 'firebase'

import clientCredentials from '../credentials/client'

export const firebaseInit = async () => {
    if(!firebase.apps.length) {
        console.log('no app')
        return firebase.initializeApp(clientCredentials)
    } else {
       return console.log('App is here!')
    }
}

export const firebaseLogin = () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())

export const firebaseLogout = () => firebase.auth().signOut()

export const firebaseUser = async () => {
    const user = await firebase.auth().currentUser
    console.log('User!', user)
    if(user) {
        return user
    } 
    return "Log in"
}


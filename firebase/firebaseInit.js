import firebase from 'firebase'
import clientCredentials from '../credentials/client'

export default function firebaseInit() {
    if(!firebase.apps.length) {
        return firebase.initializeApp(clientCredentials)
    }
}
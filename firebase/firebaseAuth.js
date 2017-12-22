import firebase from 'firebase'
import 'isomorphic-unfetch'

export default function firebaseAuth(user) {
    if (user) {
        return user.getIdToken()
        .then((token) => {
          // eslint-disable-next-line no-undef
          return fetch('/api/login', {
            method: 'POST',
            // eslint-disable-next-line no-undef
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ token })
          })
        })
        return user
    } else {
        // eslint-disable-next-line no-undef
        fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin'
        })
        return null
    }
}
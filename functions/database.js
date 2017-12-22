import firebase from 'firebase'
require("firebase/firestore")
import clientCredentials from '../credentials/client'

class Database {

  init() {
    if(!firebase.apps.length) {
      return firebase.initializeApp(clientCredentials)
    }
  }

  auth() {
    this.init();
    const user = new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          user.getIdToken().then(token => {
            // eslint-disable-next-line no-undef
            return fetch("/api/login", {
              method: "POST",
              // eslint-disable-next-line no-undef
              headers: new Headers({ "Content-Type": "application/json" }),
              credentials: "same-origin",
              body: JSON.stringify({ token })
            }
           )
           return user  
          })
          const currentUser = JSON.parse(JSON.stringify(user))
          const userRole = this.getQuery("user", ["uid","==",currentUser.uid], 1).then(thisUser => {
            const myUser = currentUser
            myUser.role = thisUser.data.role
            return myUser
          })
          resolve(userRole)
        } else {
          // eslint-disable-next-line no-undef
          fetch("/api/logout", {
            method: "POST",
            credentials: "same-origin"
          });
          reject(null);
        }
      });
    });
    return Promise.all([user]);
  }

  //Use to check if user exists
  getUser(request) {
    const user = request && request.session ? request.session.decodedToken : null
    return user
  }

  getCollectionDocs = (snapshot) => {
    let docs = []
    if (snapshot.size == 1) {
      snapshot.forEach(function(doc) {
        docs = {id: doc.id, data: doc.data()}
      });
    } else {
      snapshot.forEach(function(doc) {
        docs.push({id: doc.id, data: doc.data()})
      });
    }
    return docs
  }

  getCollection(collection) {
    this.init()
    const db = firebase.firestore();
    const collectionPosts = db.collection(collection).get(
    ).then(querySnapshot => this.getCollectionDocs(querySnapshot));
    return collectionPosts
  }

  getDoc(collection, document) {
    this.init();
    const db = firebase.firestore();
    const databaseDocument = db.collection(collection).doc(document)
    const docData = databaseDocument.get().then(function(doc) {
      if (doc.exists) {
        return("Document data:", doc.data());
      } else {
        return("No such document!");
      }
    }).catch(function(error) {
        return("Error getting document:", error)
    });
    return docData
  }

  getQuery(collection, query, numberOfResults) {
    this.init()
    const num = numberOfResults ? numberOfResults : 10
    const db = firebase.firestore()
    const queryResults = db.collection(collection).where(...query)
    .limit(num).get()
    .then((querySnapshot) => this.getCollectionDocs(querySnapshot))
    .catch(function(error) {
        console.log("Error getting documents: ", error)
    });
    return queryResults
  }

  setDoc(collection, data, docRef) {
    this.init()
    const db = firebase.firestore();
    return db.collection(collection).doc(docRef).set(JSON.parse(JSON.stringify(data)))
  }

  addDoc(collection, data) {
    this.init()
    const db = firebase.firestore();
    return db.collection(collection).add(
      JSON.parse(JSON.stringify(data))
    )
  }

  saveDoc(collection, data, docRef) {
    if(docRef == null) {
      return this.addDoc(collection, data)
    } else {
      return this.setDoc(collection, data, docRef)
    }
  }
}
export let database = new Database();
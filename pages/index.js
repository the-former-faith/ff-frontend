import Auth from '../components/Auth'
import firebase from 'firebase'
require("firebase/firestore");
import { fsFunctions } from '../firebase/firestore'
import { firebaseInit } from '../firebase/auth'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
    firebaseInit().then(() => {
      this.loaded = true
      this.firestore = firebase.firestore()
      this.fs = fsFunctions(this.firestore)
    })

    this.updateUser = (val) => this.setState({ user: val })
  }

  async requestData() {
    this.fs.requestCollection('posts').then(data => {
      this.setState({ data: data })
    })

  }
  render() {
    const { user, data } = this.state
    const updateUser = this.updateUser
    const loaded = this.loaded
    const requestData = this.requestData.bind(this)
    return (

      <div>
        {firebase &&
          <div>
            <button onClick={requestData}>Request</button>
            <p>Hello {user.displayName}!</p>
            <Auth updateUser={updateUser} />
          </div>
        }
      </div>

    )
  }
}

export default Index
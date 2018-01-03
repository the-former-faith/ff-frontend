import React, { Component } from 'react'
import { database } from '../functions/database'
import firebase from 'firebase'

export default class ContentFormImgUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 0,
      max: 0,
      url: props.value ? props.value : ''
    }
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount() {
    database.init()
  }
  onFormChange(name) {
    this.props.onChange(name);
  }
  onChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    const storageRef = firebase.storage().ref('photos/' + file.name)
    const task = storageRef.put(file)
    task.on('state_changed',
      function progress(snapshot) {
        this.setState({
          value: snapshot.bytesTransferred,
          max: snapshot.totalBytes
        })
      }.bind(this),
      function error(err) {
        console.log(err)
      },
      function complete() {
        storageRef.getDownloadURL().then(imageUrl => {
          this.setState({
            url: imageUrl
          })
          this.props.onChange(imageUrl)
        })
      }.bind(this)
    )
  }
  render () {
    return <div>
      {this.state.url !== '' &&
        <img src={this.state.url} />
      }
      <progress value={this.state.value} max={this.state.max} ></progress>
      <input type="file" onChange={e => this.onChange(e)} />
      <input type="url" value={this.state.url}  onChange={(event) => this.props.onChange(event.target.value)} />
    </div>
  }
}
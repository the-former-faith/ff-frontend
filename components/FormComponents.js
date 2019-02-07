import React, { Component } from 'react'
import { database } from '../functions/database'
import firebase from 'firebase'
import Autocomplete from 'react-autocomplete'

export class ImgUpload extends Component {
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
      <style jsx>
        {`
          .button {
            background-color: transparent;
            border: 1px solid #870069;
            font-weight: bold;
            color: #870069;
            font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
            display: inline-block;
            padding: .5rem;
            margin: 0;
          }
          .button:hover {
            background-color: #870069;
            color: #fff;
          }
          #upload-photo {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
          }
          #upload-photo:focus + label {
            outline: 1px dotted #000;
            outline: -webkit-focus-ring-color auto 5px;
          }
        `}
      </style>
      {this.state.url !== '' &&
        <img width="200" src={this.state.url} />
      }
      <input id="upload-photo" type="file" onChange={e => this.onChange(e)} />
      <label htmlFor="upload-photo" className="button">{this.state.url == '' ? 'Select Photo' : 'Change Photo'}</label>
      <label htmlFor="photo-url">Photo URL</label>
      <input id="photo-url" type="url" value={this.state.url}  onChange={(event) => this.props.onChange(event.target.value)} />
      {this.state.max > 0 &&
        <progress value={this.state.value} max={this.state.max} ></progress>
      }
    </div>
  }
}

export class PredictiveSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.formData.name ? props.formData.name : '',
      id: props.formData.id ? props.formData.id : ''
    };
  }

  onNameChange(name) {
    return (event) => {
      this.setState({
        name: event.target.value,
        id: event.target.dataset.id
      }, () => {
        //this.props.formData.id = "chicken"
        //console.log(this.props.formData.id)
        this.props.onChange(this.state)});
    };
  }
  onIdChange(name) {
    return (event) => {
      this.setState({
        id: event.target.value
      }, () => {
        this.props.onChange(this.state)});
    };
  }

  render() {
    console.log(this.props)
    const {name, id} = this.state;
    return (
      <div>
        <input type="text"  onChange={this.onNameChange("name")} data-id="fred"/>
        <input type="text" value={this.state.id} onChange={this.onIdChange("id")} />
        <Autocomplete
  getItemValue={(item) => item.label}
  items={[
    { label: 'apple' },
    { label: 'banana' },
    { label: 'pear' }
  ]}
  renderItem={(item, isHighlighted) =>
    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
      {item.label}
    </div>
  }
  value={value}
  onChange={(e) => value = e.target.value}
  onSelect={(val) => value = val}
/>
      </div>
    );
  }
}
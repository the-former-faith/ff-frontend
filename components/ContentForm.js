import React, { Component } from 'react'
import Form from "react-jsonschema-form"
import {Editor, EditorState, convertToRaw} from 'draft-js'
import { content } from '../functions/content'
import { database } from '../functions/database'
import firebase from 'firebase'

const BodyWidget = (props) => {
  return (
    <Editor 
      editorState={props.value ? content.loadDraft(props.value) : EditorState.createEmpty()}
      onChange={(event) => props.onChange(content.saveDraft(event))}
    />
  );
};

export class Upload extends Component {
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

const widgets = {
  body: BodyWidget,
  upload: Upload
}

export default class ContentForm extends Component {
  render () {
    return <Form
      schema={this.props.schema.schema}
      uiSchema={this.props.schema.uiSchema} 
      onSubmit={this.props.onSubmit} 
      onChange={this.props.onChange} 
      formData={this.props.formData}
      widgets={widgets}
    />
  }
}
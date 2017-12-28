import React, { Component } from 'react'
import Form from "react-jsonschema-form"
import {Editor, EditorState, convertToRaw} from 'draft-js'
import { content } from '../functions/content'

const MyCustomWidget = (props) => {
  console.log(props)
  return (
    <Editor 
      editorState={props.value ? content.loadDraft(props.value) : EditorState.createEmpty()}
      onChange={(event) => props.onChange(content.saveDraft(event))}
    />
  );
};

const widgets = {
  test: MyCustomWidget
};

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
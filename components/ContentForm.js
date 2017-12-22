import React, { Component } from 'react'
import Form from "react-jsonschema-form";

export default class ContentForm extends Component {
  render () {
     return <Form 
        schema={this.props.schema.schema}
        uiSchema={this.props.schema.uiSchema} 
        onSubmit={this.props.onSubmit} 
        onChange={this.props.onChange} 
        formData={this.props.formData}
      />
  }
}
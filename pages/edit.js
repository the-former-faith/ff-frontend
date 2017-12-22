import React, { Component } from 'react'
import { database } from '../functions/database'
import LoginButton from '../components/LoginButton'
import ContentForm from '../components/ContentForm'

export default class Index extends Component {
  static async getInitialProps ({req, query}) { 
    const page = query.title ? await database.getQuery("post", ["url", "==", query.title], 1) : null
    const formData = query.title ? page.data : {}
    const user = database.getUser(req)
    const schema = await database.getDoc("schema","jPn07suotpNjwThzggHI")
    const docRef = query.title ? page.id : null
    return { formData, user, schema, docRef }
  }

  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      formData: this.props.formData,
      docRef: this.props.docRef,
      save: "unsaved"
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    //database.getQuery("post", ["url", "==", "post-1"], 1).then(b => console.log(b))
    database.auth().then(a => this.setState({user: a[0]})).catch(a => console.log(a))
  }
  
  onChange = (form) => this.setState({formData: form.formData, save: "unsaved"})

  onSubmit = (form) => { 
    this.setState({save: "saving"})
    database.saveDoc(
    this.props.schema.schema.title, form.formData, this.state.docRef
  ).then(docRef => {
    if (docRef !== undefined) {
      this.setState({docRef: docRef.id, save: "saved"})
    } else {
      this.setState({save: "saved"})
    }
  }).catch(function(error){
    console.error(error)
  })}

  render () {
    const { user } = this.state
    return <div>
      <p>{this.state.save}</p>
      <LoginButton user={user} />
      <ContentForm 
        schema={this.props.schema} 
        formData={this.state.formData}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    </div>
  }
}

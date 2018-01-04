import React, { Component } from 'react'
import firebase from 'firebase'
import { database } from '../functions/database'
import ContentForm from '../components/ContentForm'
import PageLayout from '../components/PageLayout'
import 'isomorphic-unfetch'

export default class Index extends Component {
  static async getInitialProps ({req, query}) { 
    //these could be grouped together
    //Perhaps use a function to throw them into an array, and then return the array from the function.
    //Then use a spread operator to pass them in the return of getInitialProps
    const page = query.title ? await database.getQuery("post", ["url", "==", query.title], 1) : null
    const formData = query.title ? page.data : {}
    const docRef = query.title ? page.id : null
    const schema = await database.getDoc("schema","jPn07suotpNjwThzggHI")

    //these could be grouped together and used on other pages
    const user = req && req.session ? req.session.decodedToken : null
    const role = req && req.session && user !== null ? await database.getUserRole(user.user_id) : null
    
    return { formData, user, schema, docRef, role }
  }

  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      formData: this.props.formData,
      docRef: this.props.docRef,
      role: this.props.role,
      save: "unsaved"
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    database.init();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        database.getUserRole(user.uid)
            .then(a => this.setState({ user: user, role: a }))
        database.serverLogin(user)
      } else {
        this.setState({ user: null, role: null })
        database.serverLogout()
      }
    })
  }
  
  onChange = (form) => this.setState({formData: form.formData, save: "unsaved"})

  onSubmit = (form) => { 
    this.setState({save: "saving"})
    
    if (form.formData.datePublished == undefined && form.formData.published == true) {
      let newForm = Object.assign({},form.formData,{datePublished: new Date().toString()})
      this.setState({formData: newForm})
    }
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
    let page = null;
    if (this.state.role == "admin") {
      page = <ContentForm 
        schema={this.props.schema} 
        formData={this.state.formData}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />;
    } else {
      page = <p>You must log in and be an admin to see this page.</p>;
    }

    return <PageLayout user={this.state.user} className="edit">
      <style jsx>
      {`
        :global(fieldset) {
          border: none;
          padding: 0;
          margin: 0;
        }
        :global(legend) {
          display: none;
        }
        :global(label) {
          margin: 1.2rem 0 .2rem 0;
          display: block;
          font-family: "Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace;
          font-weight: bold;
        }
        :global(input[type=text]), :global(input[type=url]) {
          width: 100%;
          font-size: 1.2rem;
        }
        :global(textarea) {
          width: 100%;
          font-size: 1.2rem;
        }
      `}
      </style>
      {page}
      <p>{this.state.save}</p>
    </PageLayout>
  }
}

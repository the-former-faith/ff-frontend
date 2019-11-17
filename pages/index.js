import React from 'react'
import Router from 'next/router'
import cookies from 'next-cookies'

export default class extends React.Component {
  static async getInitialProps(req) {
  	const langCookie = cookies(req).lang;
  	let lang
  	if (typeof langCookie === 'undefined' || langCookie === '') {
  		lang = 'en'
  	} else {
  		lang = langCookie
  	}
  	console.log('cookie', langCookie)
    if (req.res) {
      req.res.writeHead(302, {
        Location: `/${lang}`
      })
      req.res.end()
    } else {
      Router.push(`/${lang}`)
    }
    return {}
  }
  render() {
    return <div/>
  }
}
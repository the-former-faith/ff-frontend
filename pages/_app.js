import App from 'next/app'
import React from 'react'
import setCookieLang from '../utils/setCookieLang'

class MyApp extends App {
  static async getInitialProps(appContext) {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
    return { 
      lang: appContext.router.query.lang,
      ...appProps
    }
  }

  componentDidMount() {
    const {lang} = this.props
    setCookieLang(lang)
  }

  render() {
    const { Component, pageProps, lang } = this.props
    return <Component {...pageProps} lang={lang}/>
  }
}

export default MyApp

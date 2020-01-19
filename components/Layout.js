import React, { useState } from 'react'
import Head from 'next/head'
import SiteHeader from './SiteHeader'
import Modal from './Modal'
import ModalContext from '../context/ModalContext'
import '../themes/defaultTheme/styles.scss'

export default (props) => {
  const [modalStatus, setModalStatus] = useState({
    'isToggled': false,
    'title': null,
    'content': null
  })

  return (
    <ModalContext.Provider value={[modalStatus, setModalStatus]}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>The Former Faith</title>
      </Head>
      <SiteHeader />
      <main>
        {props.children}
      </main>
      <footer className="site-footer">
      </footer>
      {modalStatus.isToggled &&
        <Modal />
      }
    </ModalContext.Provider>
  )
}
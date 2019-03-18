import Head from 'next/head'
import SiteHeader from './SiteHeader'
import "./styles/styles.scss"

export default props => (
  <React.Fragment>
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
  </React.Fragment>
)
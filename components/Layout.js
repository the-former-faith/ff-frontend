import Head from 'next/head'
import Link from 'next/link'

export default props => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>The Former Faith</title>
    </Head>
    <nav>
      <Link href="/posts"><a>Posts</a></Link>
    </nav>
    <main>
      {props.children}
    </main>
    <footer>
    </footer>
  </div>
)
import Logo from './Logo'
import Link from 'next/link'

const PageHeader = () => (
  <header>
    <Link href={`/`}>
      <a>
        <Logo />
      </a>
    </Link>
    <style jsx>
      {`
        header {
          display: flex;
          justify-content: center;
          padding: 1em;
        }
        header > :global(svg) {
          max-width: 200px;
        }
      `}
    </style>
  </header>
);

export default PageHeader;
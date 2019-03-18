import Logo from '../Logo'
import Link from 'next/link'

const SiteHeader = () => (
  <header className="site-header">
    <Link href={`/`}>
      <a>
        <Logo />
      </a>
    </Link>
  </header>
);

export default SiteHeader;
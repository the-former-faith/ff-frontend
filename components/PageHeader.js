import Logo from './Logo'

const PageHeader = () => (
  <header>
    <Logo />
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
import Logo from './Logo'

const PageHeader = () => (
  <header>
    <Logo />
    <style jsx>
      {`
        header {
          display: flex;
          justify-content: flex-start;
        }
        header > :global(svg) {
          max-width: 100px;
        }
      `}
    </style>
  </header>
);

export default PageHeader;
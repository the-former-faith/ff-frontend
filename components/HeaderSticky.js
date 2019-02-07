const HeaderSticky = ({children}) => (
  <header className="header">
    <style jsx>
      {`
        .header {
          top: 0;
          position: sticky;
          display: flex;
          background-color: #fff;
          justify-content: space-between;
          padding: .5rem 0;
        }
      `}
      </style>
      {children}
  </header>
);

export default HeaderSticky;
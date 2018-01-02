import LoginButton from '../components/LoginButton'

const PageFooter = ({user}) => (
  <footer className="footer">
    <style jsx>
      {`
        .footer {
          display: flex;
          align-items: flex-end;
          padding-bottom: .5rem;
          justify-content: flex-end;
        }
      `}
      </style>
    <LoginButton user={user} />
  </footer>
);

export default PageFooter;
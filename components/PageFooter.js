import LoginButton from '../components/LoginButton'

const PageFooter = ({user}) => (
  <footer>
    <LoginButton user={user} />
  </footer>
);

export default PageFooter;
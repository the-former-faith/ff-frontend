import PageHeader from '../components/PageHeader'
import PageFooter from '../components/PageFooter'

const PageLayout = ({user, children}) => (
  <div className="root">
    <style jsx>
      {`
        .root {
          display: grid;
          grid-template-rows: 70px 1fr 50px;
          min-height: 100vh;
        }
      `}
    </style>
    <PageHeader />
      {children}
    <PageFooter user={user} />
  </div>
);

export default PageLayout;
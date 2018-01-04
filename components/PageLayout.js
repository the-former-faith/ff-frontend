import PageHeader from '../components/PageHeader'
import PageFooter from '../components/PageFooter'

const PageLayout = ({user, children, className}) => (
  <div className={"root " + className}>
    <style jsx>
      {`
        .root {
          display: grid;
          grid-template-rows: 150px 1fr 70px;
          min-height: 100vh;
          max-width: 60em;
          margin: 0 auto;
        }
        :global(body) {
          margin: 0;
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        }
      `}
    </style>
    <PageHeader />
      {children}
    <PageFooter user={user} />
  </div>
);

export default PageLayout;
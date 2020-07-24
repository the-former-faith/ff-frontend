const TestTag = props => (
  <strong>{props.children}</strong>
)

const serializers = {
	marks: {
    abbrTag: TestTag
  }
}

export default serializers
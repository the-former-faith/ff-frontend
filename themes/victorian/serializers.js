const TestTag = props => (
  <strong style={{'color': 'red'}}>{props.children}</strong>
)

const serializers = {
	marks: {
    abbrTag: TestTag
  }
}

export default serializers
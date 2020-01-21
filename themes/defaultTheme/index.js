import serializers from './serializers'

const theme = (props) => {
	return (<div id="body">
		{props.children}
	</div>)
}

export {serializers}

export default theme
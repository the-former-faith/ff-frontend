import styles from './victorian.module.scss'
import serializers from './serializers'

const theme = (props) => {
	return (<div id="body" className={styles.victorian}>
		{props.children}
	</div>)
}

export {serializers}

export default theme
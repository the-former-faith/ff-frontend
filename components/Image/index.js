import React from 'react'
import SVG from 'react-inlinesvg'

export default class Image extends React.Component {
	render() {
		const {imgUrl} = this.props
		return (
			<figure>
				{imgUrl.endsWith('.svg') &&
					<SVG src={imgUrl} />
				}
			</figure>
		)
	}
}
import React from 'react'
import SVG from 'react-inlinesvg'
import "isomorphic-fetch"

function createMarkup(text) {
  return {
    __html: text
  };
}

async function getSvg(url) {
	let results = await fetch(url)
    .then(r => r.text())
    .then(text => {
       return text
    })
    .catch(console.error.bind(console));
  return results
}

export default class Image extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = { script: null };
	}
	render() {
		const {imgUrl} = this.props
		const mySvg = getSvg(imgUrl)
		return (
			<figure>
				{imgUrl.endsWith('.svg') &&
					<SVG 
						src={imgUrl}
					/>
				}

				<div dangerouslySetInnerHTML={createMarkup(mySvg)} />
			</figure>
		)
	}
}
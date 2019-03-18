import React, { Component } from "react"

export default class Logo extends Component {
  render() {
    return <svg 
      xmlns="http://www.w3.org/2000/svg" 
      x="0"
      y="0"
      width={ this.props.width } 
      height={ this.props.height }
      viewBox="0, 0, 792, 540"
      aria-labelledby="title"
    >
      <title id="title">{this.props.title}</title>
      <text transform="matrix(0.996, 0.087, -0.087, 0.996, 422.608, 365.51)">
        <tspan x="-342.452" y="106.69" fontFamily="Raleway" fontWeight="700" fontSize="305" kerning="-5" fill={ this.props.fill }>F</tspan>
        <tspan x="-198.307" y="106.69" fontFamily="Raleway" fontWeight="700" fontSize="305" kerning="-16" fill={ this.props.fill }>a</tspan>
        <tspan x="-39.237" y="106.69" fontFamily="Raleway" fontWeight="700" fontSize="305" kerning="-12" fill={ this.props.fill }>i</tspan>
        <tspan x="26.538" y="106.69" fontFamily="Raleway" fontWeight="700" fontSize="305" kerning="-10" fill={ this.props.fill }>t</tspan>
        <tspan x="133.658" y="106.69" fontFamily="Raleway" fontWeight="700" fontSize="305" fill={ this.props.fill }>h</tspan>
      </text>
      <text transform="matrix(0.996, 0.087, -0.087, 0.996, 436.877, 174.185)">
        <tspan x="-331.991" y="65.933" fontFamily="Raleway" fontWeight="700" fontSize="200" kerning="-8" fill={ this.props.fill }>F</tspan>
        <tspan x="-231.991" y="65.933" fontFamily="Raleway" fontWeight="700" fontSize="200" kerning="-10" fill={ this.props.fill }>o</tspan>
        <tspan x="-120.791" y="65.933" fontFamily="Raleway" fontWeight="700" fontSize="200" kerning="-8" fill={ this.props.fill }>r</tspan>
        <tspan x="-51.391" y="65.933" fontFamily="Raleway" fontWeight="700" fontSize="200" kerning="-10" fill={ this.props.fill }>m</tspan>
        <tspan x="124.809" y="65.933" fontFamily="Raleway" fontWeight="700" fontSize="200" kerning="-8" fill={ this.props.fill }>e</tspan>
        <tspan x="236.609" y="65.933" fontFamily="Raleway" fontWeight="700" fontSize="200" fill={ this.props.fill }>r</tspan>
      </text>
      <path d="M753.413,537.418 L52.795,477.445 L74.482,507.205 L37.425,503.963 L2.694,459.808 L44.709,422.368 L82.753,425.696 L54.875,452.231 L731.331,511.414 L762.894,150.654 L224.844,103.581 L226.957,79.424 L789.179,128.612 L753.413,537.418 z" fill={ this.props.fill }/>
      <text transform="matrix(0.996, 0.087, -0.087, 0.996, 204.5, 46.901)">
        <tspan x="-83.73" y="24.242" fontFamily="Raleway" fontWeight="700" fontSize="90" kerning="-4" fill={ this.props.fill }>th</tspan>
        <tspan x="-2.81" y="24.242" fontFamily="Raleway" fontWeight="700" fontSize="90" fill={ this.props.fill }>e</tspan>
      </text>
      <path d="M115.363,209.767 L142.87,212.173 L141.842,223.923 L114.335,221.516 L115.363,209.767 z" fill={ this.props.fill }/>
    </svg>
  }
}

Logo.defaultProps = {
	width: '100%',
  height: '100%',
  fill: '#870069',
  title: "The Former Faith Logo"
}
import merge from 'lodash.merge'
import dynamic from 'next/dynamic'

const ThemeWrapper = (props) => {
  let Wrapper = null
  const defaultSerializers = require(`../../themes/defaultTheme/`).serializers
  if (props.theme !== 'defaultTheme') {
    const customSerializers = require(`../../themes/${props.theme}/`).serializers
    Wrapper = dynamic(import(`../../themes/${props.theme}/`))
    props.setSerializers(merge(defaultSerializers, customSerializers))
  } else {
    Wrapper = dynamic(import(`../../themes/defaultTheme/`))
    props.setSerializers(defaultSerializers)
  }
  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  )
}

export default ThemeWrapper
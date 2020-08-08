import BlockContent from '@movingbrands/svelte-portable-text'
import client from '../sanityClient'
import Link from './Link.svelte'

export default {
  marks: {
    link: ({ children, mark }) => ({
      component: Link,
      childNodes: children,
      props: mark,
    })
  }
}
import LinkTag from '$lib/components/tags/LinkTag.svelte'

export default {
  marks: {
    link: ({ children, mark }) => ({
      component: LinkTag,
      childNodes: children,
      props: mark,
    })
  }
}
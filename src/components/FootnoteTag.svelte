<script>
  import { footnotes } from '../stores.js'
  import { stores } from '@sapper/app'
  const { page } = stores()
  export let mark
  footnotes.update((n) => [...n, mark])
  export let position = $footnotes.length
</script>

<slot /><sup><a id={`footnote-link-${position}`} href={`${$page.path}#footnote-${position}`}>{position}</a></sup>

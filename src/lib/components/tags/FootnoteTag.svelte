<script>
  import { footnotes } from '$lib/scripts/stores.js'
  import { getStores } from '$app/stores'
  const { page } = getStores()
  export let mark
  footnotes.update((n) => [...n, mark])
  export let position = $footnotes.length
</script>

<slot /><sup><a id={`footnote-link-${position}`} href={`${$page.path}#footnote-${position}`}>{position}</a></sup>

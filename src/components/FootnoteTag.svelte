<script>
  import { footnotes } from '../stores.js'
  import { stores } from '@sapper/app'
  const { page } = stores()
  console.log($page)
  export let mark;
  footnotes.update(n => [...n, mark.content])
  export let position = $footnotes.length;
</script>

<slot /><sup><a href={`${$page.path}/#footnote-${position}`} >{position}</a></sup>

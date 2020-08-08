<script>
  import { footnotes, currentPath } from '../stores.js'
  export let mark;
  footnotes.update(n => [...n, mark.content])
  export let position = $footnotes.length;
  console.log($currentPath)
</script>

<slot /><sup><a href={`${$currentPath}/#footnote-${position}`} >{position}</a></sup>

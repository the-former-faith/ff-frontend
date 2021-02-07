<script>
  import MetaAuthors from './../MetaAuthors.svelte'
  export let citation
</script>

<p>
  <strong>{citation.source.title.en}</strong>
  {#if citation.source.authors} by <MetaAuthors authors={citation.source.authors} />{/if}
  {#if citation.source.pageStart}, page {citation.source.pageStart}{/if}
  {#if citation.source.pageEnd} to {citation.source.pageEnd}{/if}
</p>

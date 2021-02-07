<script>
  import MetaAuthors from './../MetaAuthors.svelte'
  export let citation
</script>

<p>
  <a href="en/newspaper-article/{citation.source.slug.en.current}"><strong>{citation.source.title.en}</strong></a>
  {#if citation.source.authors} by <MetaAuthors authors={citation.source.authors} />{/if}
  {#if citation.source.parent} in <em>{citation.source.parent.title}</em>{/if}
  {#if citation.source.pageStart}, page {citation.source.pageStart}{/if}
  {#if citation.source.pageEnd} to {citation.source.pageEnd}{/if}
</p>

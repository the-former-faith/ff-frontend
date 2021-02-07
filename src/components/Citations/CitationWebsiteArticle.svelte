<script>
  import MetaAuthors from './../MetaAuthors.svelte'
  export let citation
</script>

<p>
  <a href={citation.source.url}><strong>{citation.source.title.en}</strong></a>
  {#if citation.source.authors} by <MetaAuthors authors={citation.source.authors} />{/if}
  {#if citation.source.parent} on <em>{citation.source.parent.title}</em>{/if}
</p>

<script>
  import MetaAuthors from '$lib/components/layout/MetaAuthors.svelte'
  export let source
</script>

<p>
  <a href={source.url}><strong>{source.title.en}</strong></a>
  {#if source.authors} by <MetaAuthors authors={source.authors} />{/if}
  {#if source.parent} on <em>{source.parent.title}</em>{/if}
</p>

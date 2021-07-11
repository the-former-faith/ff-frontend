<script>
  import MetaAuthors from '$lib/components/layout/MetaAuthors.svelte'
  export let source
</script>

<p>
  <strong>{source.title.en}</strong>
  {#if source.authors} by <MetaAuthors authors={source.authors} />{/if}
  {#if source.pageStart}, page {source.pageStart}{/if}
  {#if source.pageEnd} to {source.pageEnd}{/if}
</p>

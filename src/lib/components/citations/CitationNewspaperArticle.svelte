<script>
  import MetaAuthors from '$lib/components/layout/MetaAuthors.svelte'
  import { base } from '$app/paths'
  export let source
</script>

<p>
  <a href="{base}/en/newspaper-article/{source.slug.en.current}"><strong>{source.title.en}</strong></a>
  {#if source.authors} by <MetaAuthors authors={source.authors} />{/if}
  {#if source.parent} in <em>{source.parent.title.en}</em>{/if}
  {#if source.pageStart}, page {source.pageStart}{/if}
  {#if source.pageEnd} to {source.pageEnd}{/if}
</p>

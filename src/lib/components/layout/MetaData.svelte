<script>
  import MetaAuthors from './MetaAuthors.svelte'
  export let createdAt
  export let authors
  export let parent
  export let pageStart
  export let source
  let date = new Date(createdAt)
</script>

<div class="post-meta">
  {#if authors}
    <p>
      <MetaAuthors {authors} />
    </p>
  {/if}
  {#if parent}
    <p>{parent.title.en}</p>
  {/if}
  {#if date}
    <p>{date.toDateString()}</p>
  {/if}
  {#if pageStart}
    <p>Page {pageStart}</p>
  {/if}
  {#if source}
    <p><a href={source}>source</a></p>
  {/if}
</div>

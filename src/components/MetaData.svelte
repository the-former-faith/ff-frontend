<script>
  import MetaAuthors from './MetaAuthors.svelte'
  export let createdAt
  export let authors
  export let parent
  export let pageStart
  let date = new Date(createdAt)
</script>

<div class="post-meta">
  {#if authors}
    <p>
      <MetaAuthors {authors} />
    </p>
  {/if}
  {#if parent}
    <p>{parent.title}</p>
  {/if}
  {#if date}
    <p>{date.toDateString()}</p>
  {/if}
  {#if pageStart}
    <p>Page {pageStart}</p>
  {/if}
</div>

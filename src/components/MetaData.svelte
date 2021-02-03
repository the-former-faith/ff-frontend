<script>
  import MetaAuthors from './MetaAuthors.svelte'
  export let createdAt
  export let authors
  let date = new Date(createdAt)
</script>

<div class="post-meta">
  {#if authors}
    <p>
      <MetaAuthors {authors} />
    </p>
  {/if}
  {#if date}
    <p>{date.toDateString()}</p>
  {/if}
</div>

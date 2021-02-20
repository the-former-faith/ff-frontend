<script>
  import ImageObject from './ImageObject.svelte'
  import MetaAuthors from './MetaAuthors.svelte'

  export let posts

  const getTitleSize = (title) => {
    if (title > 70) {
      return 'lg'
    } else if (title > 40) {
      return 'md'
    } else {
      return 'sm'
    }
  }
</script>

<ul class="posts-list">
  {#each posts as post}
    <li class={getTitleSize(post.title.en.length)}>
      <h3>
        <a rel="prefetch" href="en/{post._type.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}/{post.slug.en.current}">{post.title.en}</a>
      </h3>
      {#if post.mainImage}
        <ImageObject image={post.mainImage.file} ratio={{ x: 4, y: 3 }} />
      {/if}
      {#if post.file}
        <ImageObject image={post.file} ratio={{ x: 4, y: 3 }} />
      {/if}
      <div class="post-meta">
        {#if post.authors}
          <p>
            <MetaAuthors authors={post.authors} />
          </p>
        {/if}
        <p>{new Date(post._createdAt).toDateString()}</p>
      </div>
    </li>
  {/each}
</ul>

<style>
  h3 {
    word-break: break-word;
    hyphens: auto;
  }
  .md {
    grid-column: span 2;
  }
  .lg {
    grid-column: span 3;
    grid-row: span 2;
  }
</style>

<script>
  import ImageObject from './ImageObject.svelte'
  import MetaAuthors from './MetaAuthors.svelte'

  export let posts
</script>

<ul class="posts-list">
  {#each posts as post}
    <li>
      <h3>
        <a rel="prefetch" href="en/post/{post.slug.en.current}">{post.title.en}</a>
      </h3>
      {#if post.mainImage}
        <ImageObject image={post.mainImage.file} ratio={{ x: 4, y: 3 }} />
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

<script>
  import ImageBlock from '$lib/components/blocks/ImageBlock.svelte'
  import MetaAuthors from '$lib/components/layout/MetaAuthors.svelte'
  import { base } from '$app/paths'

  export let docs

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

{#key docs}
  <ul class="posts-list">
    {#each docs as doc}
      <li class="{getTitleSize(doc.title.en.length)} {doc.mainImage ? 'has-image' : ''}" id={doc.slug.en.current}>
        <h3>
          <a sveltekit:prefetch href="{base}/en/{doc._type.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}/{doc.slug.en.current}">{doc.title.en}</a>
        </h3>
        {#if doc.mainImage}
          <ImageBlock image={doc.mainImage.file} ratio={{ x: 4, y: 3 }} />
        {/if}
        {#if doc.file}
          <ImageBlock image={doc.file} ratio={{ x: 4, y: 3 }} />
        {/if}
        <div class="post-meta">
          {#if doc.authors}
            <p>
              <MetaAuthors authors={doc.authors} />
            </p>
          {/if}
          <p>{new Date(doc._createdAt).toDateString()}</p>
        </div>
      </li>
    {/each}
  </ul>
{/key}

<style>
  /*-- Posts list --*/
  .posts-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    gap: 1px;
    background-image: repeating-linear-gradient(-45deg, var(--color-foreground), var(--color-foreground) 1px, transparent 1px, transparent 10px);
    outline: 2px solid;
  }

h3 {
  padding: 1rem;
}

.post-meta {
  border: none;
  border-top: 1px solid;
  padding: 0.5rem 1rem;
}

.posts-list .post-meta p {
  border: none;
  line-height: 1.2;
  padding: 0;
}

  li {
    background-color: var(--color-background);
    outline: 2px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0;
  }
  h3 {
    word-break: break-word;
    hyphens: auto;
  }
  @media screen and (min-width: 768px) {
    .md {
      grid-column: span 2;
    }
    .lg {
      grid-column: span 3;
    }
    .md.has-image,
    .lg.has-image {
      grid-row: span 2;
    }
  }
</style>

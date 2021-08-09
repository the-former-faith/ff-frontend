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

<ul class="posts-list">
  {#each docs as doc}
    <li class="{getTitleSize(doc.title.en.length)} {doc.mainImage ? 'has-image' : ''}">
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

<style>
  h3 {
    word-break: break-word;
    hyphens: auto;
  }
  @media screen and (min-width: 768px) {
    .has-image {
      grid-row: span 2;
    }
    .md {
      grid-column: span 2;
    }
    .lg {
      grid-column: span 3;
    }
  }
</style>

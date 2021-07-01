<script>
  import BlockContent from '@movingbrands/svelte-portable-text'
  import FootnotesList from './FootnotesList.svelte'
  import serializers from './serializers'
  import urlBuilder from '@sanity/image-url'
  import MetaData from './MetaData.svelte'
  import ImageObject from './ImageObject.svelte'
  import client from '../sanityClient'
  import AudioObject from './AudioObject.svelte'

  const urlFor = (source) => urlBuilder(client).image(source)

  export let post

  const filterVideo = (files) => {
    return files.filter((x) => {
      return x.file.asset.extension === 'mp4'
    })
  }

  let image
  if (post.mainImage) {
    image = post.mainImage.file
  } else if (post.file) {
    image = post.file
  }
</script>

<svelte:head>
  {#if post.theme !== 'defaultTheme'}
    <link rel="stylesheet" href={`/styles/${post.theme}.css`} />
  {/if}
  {#if post}
    <title>{post.title.en}</title>
    <meta property="og:title" content={post.title.en} />
    <meta property="og:type" content="article" />
  {/if}

  {#if post && image}
    <meta property="og:image" content={urlFor(image).size(1200, 630).format('jpg').fit('max').url()} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  {:else}
    <!--<meta property="og:image" content="https://tender-panini-0676cc.netlify.app/logo-large.png" />-->
  {/if}
</svelte:head>

{#if post}
  <article class="flow">
    {#if image}
      <ImageObject {image} ratio={post._type === 'newspaperArticle' ? undefined : { x: 4, y: 3 }} />
    {/if}

    <h1>{post.title.en}</h1>

    <MetaData createdAt={post.date ? post.date.time : post._createdAt} authors={post.authors} parent={post.parent} pageStart={post.pageStart} source={post.source} />

    {#if post.narrations}
      <div class="narration">
        <p><strong>Listen to narration for this sermon:</strong></p>
        <AudioObject embed={post.narrations} files={post.narrations} />
      </div>
    {/if}

    {#if post.longDescription}
      <div class="flow">
        <BlockContent blocks={post.longDescription.en} {serializers} />
      </div>
    {/if}

    {#if post.content}
      <div class="flow">
        <BlockContent blocks={post.content.en} {serializers} />
      </div>
    {/if}

    <slot />

    <FootnotesList />
  </article>
{:else}
  <p>Article not found</p>
{/if}

<style>
  .narration {
    display: flex;
    flex-wrap: wrap;
  }
  .narration p {
    margin-right: 1rem;
  }
</style>

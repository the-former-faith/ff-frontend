<script>
  import { assets } from '$app/paths'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import FootnotesList from '$lib/components/layout/FootnotesList.svelte'
  import serializers from '$lib/scripts/serializers'
  import urlBuilder from '@sanity/image-url'
  import MetaData from '$lib/components/layout/MetaData.svelte'
  import ImageBlock from '$lib/components/blocks/ImageBlock.svelte'
  import client from '$lib/scripts/sanityClient'
  import AudioBlock from '$lib/components/blocks/AudioBlock.svelte'
  import DocumentList from '$lib/components/layout/DocumentList.svelte'

  const urlFor = (source) => urlBuilder(client).image(source)

  export let doc
  export let wikiP

  const filterVideo = (files) => {
    return files.filter((x) => {
      return x.file.asset.extension === 'mp4'
    })
  }

  let image
  if (doc.mainImage) {
    image = doc.mainImage.file
  } else if (doc.file) {
    image = doc.file
  }
</script>

<svelte:head>
  {#if doc.theme !== 'defaultTheme'}
    <link rel="stylesheet" href={`${assets}/styles/${doc.theme}.css`} />
  {/if}
  {#if doc}
    <title>{doc.title.en}</title>
    <meta property="og:title" content={doc.title.en} />
    <meta property="og:type" content="article" />
  {/if}

  {#if doc && image}
    <meta property="og:image" content={urlFor(image).size(1200, 630).format('jpg').fit('max').url()} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  {:else}
    <!--<meta property="og:image" content="https://tender-panini-0676cc.netlify.app/logo-large.png" />-->
  {/if}
</svelte:head>

{#if doc}
  <article class="flow">
    {#if image}
      <ImageBlock {image} ratio={doc._type === 'newspaperArticle' ? undefined : { x: 4, y: 3 }} />
    {/if}

    <h1>{doc.title.en}</h1>

    <MetaData createdAt={doc.date ? doc.date.time : doc._createdAt} authors={doc.authors} parent={doc.parent} pageStart={doc.pageStart} source={doc.source} />

    {#if doc.narrations}
      <div class="narration">
        <p><strong>Listen to narration for this sermon:</strong></p>
        <AudioBlock embed={doc.narrations} files={doc.narrations} />
      </div>
    {/if}

    {#if doc.longDescription}
      <div class="flow">
        <BlockContent blocks={doc.longDescription.en} {serializers} />
      </div>
    {/if}

    {#if doc.content}
      <div class="flow">
        <BlockContent blocks={doc.content.en} {serializers} />
      </div>
    {/if}

    <!--{#if wikiP}
      <div class="flow ">
        {@html wikiP.parse.text}
      </div>
    {/if}-->

    {#if doc.referencedBy}
      <h3>Referenced By</h3>
      <DocumentList docs={doc.referencedBy} />
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

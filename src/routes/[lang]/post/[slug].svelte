<script context="module">
  import client from '../../../sanityClient'
  import { clientWithToken } from '../../../sanityClient'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import FootnotesList from '../../../components/FootnotesList.svelte'
  import serializers from '../../../components/serializers'
  import urlBuilder from '@sanity/image-url'
  import { footnotes } from '../../../stores.js'
  import MetaData from '../../../components/MetaData.svelte'
  import ImageObject from '../../../components/ImageObject.svelte'
  import groq from 'groq'

  const urlFor = (source) => urlBuilder(client).image(source)

  export async function preload({ params }, session) {
    const { slug } = params
    const query = groq`*[_type == "post" && slug.en.current == $slug]{
      _id,
      title,
      theme,
      "authors": authors[]->,
      mainImage->,
      ...,
      content {
        "en": en[]{
          ...,
          _type == "blockQuoteObject" => {
            ...,
            "source": source {
              ...,
              "author": author->
            }
          },
          _type == "imageObject" => {
            ...,
            asset-> {
              ...
            }
          },
          _type == "newspaperArticleObject" => {
            ...,
            embed -> {
              file {
                ...,
                asset->
              }
            }
          },
          _type == "mapObject" => {
            ...,
            embed -> {
              ...,
              points[]-> {
                ...,
                mainImage-> {
                  file
                },
                "coordinates": location-> {
                  ...coordinates
                }
              }
            }
          },
          markDefs[]{
            ...,
            _type == "internalLink" => {
              "slug": @.reference->slug.en.current,
              "lang": en,
              "type": @.reference->_type,
            },
            _type == "footnote" => {
              ...,
              "citations": citations[]{
                ...,
                "source": source-> {
                  ...,
                  newspaper-> {
                    title
                  },
                  "authors": authors[]-> {
                    title
                  }
                }
              }
            }
          }
        }
      },
      ...
    }[0]`

    footnotes.update(() => [])

    //const post = await client.fetch(query, { slug }).catch((err) => this.error(404, err))
    const post = await clientWithToken.fetch(query, { slug }).catch((err) => this.error(404, err))

    return { post, slug }
  }
</script>

<script>
  export let post
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

  {#if post && post.mainImage}
    <meta property="og:image" content={urlFor(post.mainImage.file).size(1200, 630).format('jpg').fit('max').url()} />
  {:else}
    <meta property="og:image" content="https://tender-panini-0676cc.netlify.app/logo-large.png" />
  {/if}
</svelte:head>

{#if post}
  <article class="flow">
    {#if post.mainImage}
      <ImageObject image={post.mainImage.file} ratio={{ x: 4, y: 3 }} />
    {/if}

    <h1>{post.title.en}</h1>

    <MetaData createdAt={post._createdAt} authors={post.authors} />

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
    {#if $footnotes.length > 0}
      <FootnotesList />
    {/if}
  </article>
{:else}
  <p>Article not found</p>
{/if}

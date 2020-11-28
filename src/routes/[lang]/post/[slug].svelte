<script context="module">
  import client from '../../../sanityClient'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import FootnotesList from '../../../components/FootnotesList.svelte'
  import serializers from '../../../components/serializers'
  import urlBuilder from '@sanity/image-url'
  import { footnotes } from '../../../stores.js'
  import MetaAuthors from '../../../components/MetaAuthors.svelte'
  import groq from 'groq'
  import { onMount } from 'svelte'

  const urlFor = (source) => urlBuilder(client).image(source)

  export async function preload({ params }) {
    const { slug } = params
    const query = groq`*[_type == "post" && slug.en.current == $slug]{
      _id,
      title,
      theme,
      "authors": authors[]->,
      publishedAt,
      mainImage->,
      "sections": sections[]{
        _id,
        headingText,
        headingLevel,
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
              "imageFile": imageFile->{
                ...
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
        }
      },
      ...
    }[0]`

    footnotes.update((x) => [])

    const post = await client
      .fetch(query, { slug })
      .catch((err) => this.error(500, err))
    return { post, slug }
  }
</script>

<script>
  export let post

  let authors = post.authors
  let publishDate = new Date(post.publishedAt)

  onMount(() => {
    var request = new Request('https://tuiw9zvo.api.sanity.io/v1/users/me')
    fetch(request)
      .then((response) => response.text())
      .then((result) => console.log('Result: ', result))
  })
</script>

<svelte:head>
  <title>{post.title.en}</title>

  {#if post.css}
    <link rel="stylesheet" href={post.css} />
  {/if}

  <meta property="og:title" content={post.title.en} />
  <meta property="og:type" content="article" />

  {#if post.mainImage}
    <meta
      property="og:image"
      content={urlFor(post.mainImage.image)
        .size(1200, 630)
        .format('jpg')
        .fit('max')
        .url()} />
  {:else}
    <meta
      property="og:image"
      content="https://tender-panini-0676cc.netlify.app/logo-large.png" />
  {/if}
</svelte:head>

<article class="flow">
  {#if post.mainImage}
    <img
      src={urlFor(post.mainImage.image)
        .width(800)
        .fit('max')
        .auto('format')
        .url()}
      alt={post.mainImage.image.altText.en} />
  {/if}

  <h1>{post.title.en}</h1>

  <div class="post-meta">
    {#if authors}
      <p>
        <MetaAuthors {authors} />
      </p>
    {/if}
    <p>{publishDate.toDateString()}</p>
  </div>

  {#if post.sections}
    {#each post.sections as section}
      <section class="flow">
        {#if section.headingLevel === 'h2'}
          <h2>{section.headingText.en}</h2>
        {:else if section.headingLevel === 'h3'}
          <h3>{section.headingText.en}</h3>
        {:else if section.headingLevel === 'h4'}
          <h4>{section.headingText.en}</h4>
        {:else if section.headingLevel === 'h5'}
          <h5>{section.headingText.en}</h5>
        {:else if section.headingLevel === 'h6'}
          <h6>{section.headingText.en}</h6>
        {/if}
        <BlockContent blocks={section.content.en} {serializers} />
      </section>
    {/each}
  {/if}
  {#if $footnotes.length > 0}
    <FootnotesList />
  {/if}
</article>

<script context="module">
  import client from "../../../sanityClient";
  import BlockContent from "@movingbrands/svelte-portable-text";
  import FootnotesList from "../../../components/FootnotesList.svelte";
  import serializers from "../../../components/serializers";
  import urlBuilder from '@sanity/image-url';
  import { currentPath, footnotes } from '../../../stores.js'

  const urlFor = source => urlBuilder(client).image(source);
  
  export async function preload({ params }) {
    const { slug } = params
    const query = `*[_type == "post" && slug.en.current == $slug]{
      _id,
      title,
      theme,
      mainImage{
        ...,
        "imageFile":  imageFile->{
          ...
        }
      },
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
              "imageFile":  imageFile->{
                ...
              }
            },
            markDefs[]{
              ...,
              _type == "internalLink" => {
                "slug": @.reference->slug.en.current,
                "lang": en,
                "type": @.reference->_type,
              }
            }
          }
        }
      }
    }[0]`;

    footnotes.update(x => [])

    const post = await client
      .fetch(query, { slug })
      .catch(err => this.error(500, err));
    return { post, slug };
  }
</script>

<script>
  export let post
  export let slug
  currentPath.update(x => `/en/post/${slug}`)
</script>

<svelte:head>
	<title>{post.title.en}</title>
	<link rel="stylesheet" href={post.css} >
</svelte:head>

<article>
	<h1>{post.title.en}</h1>

  {#if post.mainImage}
    <img src={urlFor(post.mainImage.imageFile.image).width(800).auto('format').url()} alt={post.mainImage.imageFile.image.altText.en} />
  {/if}

	{#each post.sections as section}
		<section>
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
  {#if $footnotes.length > 0}
    <FootnotesList />
  {/if}
</article>

<script>
  // https://www.npmjs.com/package/@sanity/image-url
  import urlBuilder from '@sanity/image-url'
  import client from '../sanityClient'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import CitationNewspaperArticle from './Citations/CitationNewspaperArticle.svelte'
  import serializers from './serializersSimple'
  export let image
  export let caption
  export let source
  export let ratio //object

  const urlFor = (url) => urlBuilder(client).image(url)

  const findRatioHeightbyWidth = (x, y) => {
    const commonDenominator = x / y.x
    const commonHeight = commonDenominator * y.y
    return Math.round(commonHeight)
  }

  const processedUrl = (url, width) => {
    return urlFor(url)
      .width(width)
      .height(ratio ? findRatioHeightbyWidth(width, ratio) : undefined)
      .auto('format')
      .fit(ratio ? 'crop' : 'scale')
      .url()
  }

  const sizes = [300, 400, 600, 800, 1000, 1200, 2000, 2400]

  const srcSet = sizes.map((x) => {
    return `${processedUrl(image, x)} ${x}w`
  })
</script>

<figure>
  <img alt={image.alt} srcset={srcSet.toString()} src={processedUrl(image, 600)} sizes="(min-width: 1024px) 30vw, 96vw" loading="lazy" />

  {#if caption || source}
    <figcaption>
      {#if caption}
        <BlockContent blocks={caption} {serializers} />
      {/if}
      {#if caption && source}
        <hr />
      {/if}
      {#if source}
        <footer>
          <CitationNewspaperArticle {source} />
        </footer>
      {/if}
    </figcaption>
  {/if}
</figure>

<style>
  img {
    margin: 0 auto;
  }

  figcaption {
    font-size: 0.8em;
    line-height: 1.2;
  }

  footer {
    font-size: 0.8em;
  }
</style>

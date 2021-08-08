<script>
  import urlBuilder from '@sanity/image-url'
  import client from '$lib/scripts/sanityClient'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import CitationNewspaperArticle from '$lib/components/citations/CitationNewspaperArticle.svelte'
  import serializers from '$lib/scripts/serializersSimple'
  export let image
  export let caption
  export let source
  export let ratio //object
  console.log(image)

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
      .quality(90)
      .url()
  }

  const sizes = [300, 400, 600, 800, 1000, 1200, 2000, 2400]

  const srcSet = sizes.map((x) => {
    return `${processedUrl(image, x)} ${x}w`
  })

  const getSizeFromString = (x) => {
    const dimensions = x.split('-')[2]
    return dimensions ? dimensions.split('x') : undefined
  }

  const increaseRatio = (x) => Object.values(x).map(y => y * 100)

  const dimensions = ratio ? increaseRatio(ratio) : [image.asset.metadata.dimensions.width, image.asset.metadata.dimensions.height] 

</script>

<figure>
  <img 
    alt={image.alt.en} 
    srcset={srcSet.toString()} 
    src={processedUrl(image, 600)} 
    sizes="(min-width: 1024px) 33vw, 96vw" 
    loading="lazy"
    width={dimensions[0]}
    height={dimensions[1]} 
  />

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
    margin: 0 auto auto;
    height: auto;
    width: 100%;
  }

  figure {
    margin: 0 auto auto;
    width: 100%;
  }

  figcaption {
    font-size: var(--step--2);
    line-height: 1.2;
  }

  footer {
    font-size: var(--step--2);
  }
</style>

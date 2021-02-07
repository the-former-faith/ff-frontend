<script>
  // https://www.npmjs.com/package/@sanity/image-url
  import urlBuilder from '@sanity/image-url'
  import client from '../sanityClient'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from './serializersSimple'
  export let image
  export let caption
  export let ratio //object

  const urlFor = (source) => urlBuilder(client).image(source)

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
      .fit(ratio ? 'crop' : 'max')
      .url()
  }

  const sizes = [300, 400, 600, 800, 1000, 1200, 2000, 2400]

  const srcSet = sizes.map((x) => {
    return `${processedUrl(image, x)} ${x}w`
  })
</script>

<figure>
  <img alt={image.alt} srcset={srcSet.toString()} src={processedUrl(image, 600)} sizes="(min-width: 1024px) 1024px, 96vw" loading="lazy" />

  {#if caption}
    <figcaption>
      <BlockContent blocks={caption} {serializers} />
    </figcaption>
  {/if}
</figure>

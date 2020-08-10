<script>
  // https://www.npmjs.com/package/@sanity/image-url
  import urlBuilder from '@sanity/image-url'
  import client from '../sanityClient'
  import BlockContent from "@movingbrands/svelte-portable-text"
  import serializers from "./serializersSimple"
  export let url
  export let alt
  export let caption
  const urlFor = source => urlBuilder(client).image(source)
  const processedUrl = (url, width) => {
    return urlFor(url)
          .width(width)
          .auto('format')
          .fit('max')
          .url()
  }
  const sizes = [300, 400, 600, 800, 1000, 1200, 2000, 2400]
  const srcSet = sizes.map(x => {
    return `${processedUrl(url, x)} ${x}w`
  })

</script>

<figure>

  <img 
    {alt} 
    srcset={srcSet.toString()}
    src={processedUrl(url, 600)} 
    sizes="(min-width: 1024px) 1024px, 96vw" 
    loading="lazy"
  />

  {#if caption}
    <figcaption>
      <BlockContent blocks={caption} {serializers} />
    </figcaption>
  {/if}
</figure>

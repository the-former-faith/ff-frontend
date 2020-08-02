// https://www.sanity.io/docs/what-you-need-to-know-about-block-text/presenting-block-text
// https://github.com/movingbrands/svelte-portable-text
import BlockContent from '@movingbrands/svelte-portable-text';
// https://www.npmjs.com/package/@sanity/image-url
import urlBuilder from '@sanity/image-url';
import client from '../sanityClient';
import Link from './Link.svelte';
import AbbrTag from './AbbrTag.svelte';
import ImageObject from './ImageObject.svelte';

const urlFor = source => urlBuilder(client).image(source);

export default {
  marks: {
    link: ({ children, mark }) => ({
      component: Link,
      childNodes: children,
      props: mark,
    }),
    abbrTag: ({ children, mark }) => ({
      component: AbbrTag,
      childNodes: children,
      props: mark,
    })
  },
  types: {
    imageObject: ({ node, children }) => {
      console.log(node)
      return ({
      component: ImageObject,
      childNodes: children,
      props: {
        url: urlFor(node.imageFile.image)
          .width(800)
          .auto('format')
          .url(),
        alt: node.imageFile.image.altText.en,
      },
    })}
  }
};

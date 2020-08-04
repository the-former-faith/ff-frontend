// https://www.sanity.io/docs/what-you-need-to-know-about-block-text/presenting-block-text
// https://github.com/movingbrands/svelte-portable-text
import BlockContent from '@movingbrands/svelte-portable-text';
// https://www.npmjs.com/package/@sanity/image-url
import urlBuilder from '@sanity/image-url';
import client from '../sanityClient';
import Link from './Link.svelte';
import AbbrTag from './AbbrTag.svelte';
import ImageObject from './ImageObject.svelte';
import ChartBlock from './ChartBlock.svelte';
import BlockQuote from './BlockQuote.svelte';

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
    })},
    chartBlock: ({ node, children }) => {
      return ({
        component: ChartBlock,
        childNodes: children,
        props: {
          data: {
            labels: node.labels,
            datasets: node.datasets
          },
          title: node.title,
          type: node.type
        }
      })
    },
    blockQuoteObject: ({ node, children }) => {
      console.log(node)
      return ({
        component: BlockQuote,
        childNodes: children,
        props: {
          author: node.source.author,
          text: node.text
        }
      })
    }
  }
};

// https://www.sanity.io/docs/what-you-need-to-know-about-block-text/presenting-block-text
// https://github.com/movingbrands/svelte-portable-text
import BlockContent from '@movingbrands/svelte-portable-text';
// https://www.npmjs.com/package/@sanity/image-url
import urlBuilder from '@sanity/image-url';
import client from '../sanityClient';
import Link from './Link.svelte';
import AbbrTag from './AbbrTag.svelte';
import ImageObject from './ImageObject.svelte';
import LangTag from './LangTag.svelte';
import ChartBlock from './ChartBlock.svelte';
import BlockQuote from './BlockQuote.svelte';
import QuoteTag from './QuoteTag.svelte';

const urlFor = source => urlBuilder(client).image(source);

export default {
  marks: {
    abbrTag: ({ children, mark }) => ({
      component: AbbrTag,
      childNodes: children,
      props: mark,
    }),
    internalLink: ({ children, mark }) => ({
      component: Link,
      childNodes: children,
      props: {
        href: `/en/${mark.type}/${mark.slug}`
      },
    }),
    langTag: ({ children, mark }) => ({
      component: LangTag,
      childNodes: children,
      props: {
        lang: mark.lang
      }
    }),
    link: ({ children, mark }) => ({
      component: Link,
      childNodes: children,
      props: mark,
    }),
    quoteTag: ({ children, mark }) => ({
      component: QuoteTag,
      childNodes: children,
      props: {
        cite: mark.source
      }
    }),
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
      return ({
        component: BlockQuote,
        childNodes: children,
        props: {
          source: node.source,
          text: node.text
        }
      })
    }
  }
};

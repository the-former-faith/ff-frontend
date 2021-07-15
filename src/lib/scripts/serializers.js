// https://www.sanity.io/docs/what-you-need-to-know-about-block-text/presenting-block-text
// https://github.com/movingbrands/svelte-portable-text
import BlockContent from '@movingbrands/svelte-portable-text';
import InternalLinkTag from '$lib/components/tags/InternalLinkTag.svelte'
import LinkTag from '$lib/components/tags/LinkTag.svelte'
import AbbrTag from '$lib/components/tags/AbbrTag.svelte'
import AudioBlock from '$lib/components/blocks/AudioBlock.svelte'
import BibleTag from '$lib/components/tags/BibleTag.svelte'
import FootnoteTag from '$lib/components/tags/FootnoteTag.svelte'
import ImageBlock from '$lib/components/blocks/ImageBlock.svelte'
import VideoBlock from '$lib/components/blocks/VideoBlock.svelte'
import LangTag from '$lib/components/tags/LangTag.svelte'
import ChartBlock from '$lib/components/blocks/ChartBlock.svelte'
import BlockQuoteBlock from '$lib/components/blocks/BlockQuoteBlock.svelte'
import QuoteTag from '$lib/components/tags/QuoteTag.svelte'
import MapBlock from '$lib/components/blocks/MapBlock.svelte'
import PageBreakTag from '$lib/components/tags/PageBreakTag.svelte'

export default {
  marks: {
    abbrTag: ({ children, mark }) => ({
      component: AbbrTag,
      childNodes: children,
      props: mark,
    }),
    bibleTag: ({ children, mark }) => ({
      component: BibleTag,
      childNodes: children,
      props: {
        book: mark.book,
        chapter: mark.chapter,
        verse: mark.verse,
        verseEnd: mark.verseEnd
      },
    }),
    footnote: ({ children, mark }) => ({
      component: FootnoteTag,
      childNodes: children,
      props: {
        mark: mark
      }
    }),
    internalLink: ({ children, mark }) => ({
      component: LinkTag,
      childNodes: children,
      props: {
        href: `/en/${mark.type}/${mark.slug}`
      },
    }),
    personLink: ({ children, mark }) => ({
      component: InternalLinkTag,
      childNodes: children,
      props: {
        mark: mark,
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
      component: LinkTag,
      childNodes: children,
      props: mark,
    }),
    pageBreak: ({ children, mark }) => ({
      component: PageBreakTag,
      childNodes: children,
      props: mark,
    }),
    quoteTag: ({ children, mark }) => ({
      component: QuoteTag,
      childNodes: children,
      props: {
        cite: mark.source
      }
    })
  },
  types: {
    audioObject: ({ node, children }) => {
      return ({
      component: AudioBlock,
      childNodes: children,
      props: {
        embed: node.embed
      },
    })},
    imageObject: ({ node, children }) => {
      return ({
      component: ImageBlock,
      childNodes: children,
      props: {
        image: node.embed.file,
        caption: node.caption
      },
    })},
    newspaperArticleObject: ({ node, children }) => {
      //Move this funky math stuff into the image function,
      //Since I already have some math stuff for ratio there.
      let image = node.embed.file
      let hotspot = image.hotspot
      let dimensions= image.asset.metadata.dimensions
      return ({
        component: ImageBlock,
        childNodes: children,
        props: {
          image: image,
          caption: node.caption,
          ratio: {
            x: dimensions.width * hotspot.width,
            y: dimensions.height * hotspot.height
          },
          source: node.embed
        },
      })
    },
    videoObject: ({ node, children }) => {
      return ({
      component: VideoBlock,
      childNodes: children,
      props: {
        embed: node.embed
        //url: node.url,
        //startTime: node.startTime,
        //endTime: node.endTime,
        //caption: node.caption,
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
        component: BlockQuoteBlock,
        childNodes: children,
        props: {
          source: node.source,
          text: node.text
        }
      })
    },
    mapObject: ({ node, children }) => {
      return ({
        component: MapBlock,
        childNodes: children,
        props: {
          map: node.embed,
          caption: node.caption
        }
      })
    }
  }
};

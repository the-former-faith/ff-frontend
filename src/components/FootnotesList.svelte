<script context="module">
  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from './serializersSimple'
  import { footnotes } from '../stores.js'
  import { stores } from '@sapper/app'
  import CitationBook from './Citations/CitationBook.svelte'
  import CitationWebsiteArticle from './Citations/CitationWebsiteArticle.svelte'
  import CitationNewspaperArticle from './Citations/CitationNewspaperArticle.svelte'
</script>

<script>
  const { page } = stores()
  const citationBlocks = {
    citationNewspaperArticle: CitationNewspaperArticle,
    citationWebsiteArticle: CitationWebsiteArticle,
    citationBook: CitationBook,
  }
</script>

{#if $footnotes.length > 0}
  <aside>
    <hr />
    <h2>Footnotes</h2>
    <ol>
      {#each $footnotes as footnote, i}
        <li id={`footnote-${i + 1}`}>
          <BlockContent blocks={footnote.content} {serializers} />
          {#if footnote.citations}
            {#each footnote.citations as citation}
              {#if citation.source}
                <svelte:component this={citationBlocks[citation._type]} source={citation.source} />
              {/if}
            {/each}
          {/if}
          <a href={`${$page.path}#footnote-link-${i + 1}`}>&#10149; Jump back</a>
        </li>
      {/each}
    </ol>
  </aside>
{/if}

<style>
  aside {
    clear: both;
    font-size: 0.8em;
  }
</style>

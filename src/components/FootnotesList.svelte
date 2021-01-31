<script context="module">
  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from './serializersSimple'
  import MetaAuthors from './MetaAuthors.svelte'
  import { footnotes } from '../stores.js'
</script>

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
              <p>
                <strong>{citation.source.title.en}</strong>
                {#if citation.source.authors} by <MetaAuthors authors={citation.source.authors} />{/if}
                {#if citation.source.newspaper} in <em>{citation.source.newspaper.title}</em>{/if}
                {#if citation.pageStart}, page {citation.pageStart}{/if}
                {#if citation.pageEnd} to {citation.pageEnd}{/if}
              </p>
            {/if}
          {/each}
        {/if}
      </li>
    {/each}
  </ol>
</aside>

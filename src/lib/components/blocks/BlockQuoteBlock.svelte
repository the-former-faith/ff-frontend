<script context="module">
  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from '$lib/scripts/serializersSimple'
</script>

<script>
  export let source
  export let text
</script>

<blockquote cite={source ? source.url : undefined}>
  <BlockContent blocks={text} {serializers} />
  {#if source}
    <footer>
      {#if source.author}
        &mdash;{source.author.title.en}
      {/if}
      {#if source.title || source.url}
        <cite>
          {#if source.url}
            <a href={source.url}>{source.title ? source.title : source.url}</a>
          {:else}
            {source.title}
          {/if}
        </cite>
      {/if}
    </footer>
  {/if}
</blockquote>

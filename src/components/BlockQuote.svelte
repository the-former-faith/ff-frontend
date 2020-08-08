<script context="module">
  import BlockContent from "@movingbrands/svelte-portable-text";
  import serializers from "./serializers";
</script>

<script>
  export let source;
  export let text;

  const parseGivenName = (x = { givenNames: [] }) =>
    x.givenNames.en ? x.givenNames.en.join(" ") : "";

  const parseFamilyName = (x) => x.familyName.en || "";

  const combineNames = (x) => {
    const givenName = parseGivenName(x);
    const familyName = parseFamilyName(x);
    return givenName && familyName ? `${givenName} ${familyName}` : familyName || givenName;
  };

  const displayName = x => combineNames(x) || '';
</script>

<blockquote cite={source ? source.url : undefined}>
  <BlockContent blocks={text} {serializers} />
  {#if source}
    <footer>
      &mdash;{source.author ? displayName(source.author) : ''}{source.author && source.url ? ',' : '' }
      {#if source.title || source.url }
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
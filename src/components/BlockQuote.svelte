<script context="module">
  import BlockContent from "@movingbrands/svelte-portable-text";
  import serializers from "./serializers";
</script>

<script>
  export let author;
  export let text;
</script>


<blockquote>
  <BlockContent blocks={text} {serializers} />
---{author.givenNames.en.join(' ')} {author.familyName.en}
</blockquote>
<script context="module">
    import BlockContent from "@movingbrands/svelte-portable-text"
    import serializers from "./serializers"
    import { footnotes } from '../stores.js'
</script>

<aside>
    <ol>
        {#each $footnotes as footnote, i}
            <li id={`footnote-${i + 1}`}>
                <BlockContent blocks={footnote} {serializers} />
            </li>
        {/each}
    </ol>
</aside>
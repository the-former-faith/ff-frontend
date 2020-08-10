<script context="module">
    import BlockContent from "@movingbrands/svelte-portable-text"
    import serializers from "./serializersSimple"
    import { footnotes } from '../stores.js'
</script>

<aside>
    <hr />
    <h2>Footnotes</h2>
    <ol>
        {#each $footnotes as footnote, i}
            <li id={`footnote-${i + 1}`}>
                <BlockContent blocks={footnote} {serializers} />
            </li>
        {/each}
    </ol>
</aside>
<script>
    import { hasYoutube} from '../stores.js'
</script>

<svelte:head>
    {#if hasYoutube}
        <script type="text/javascript" src="https://www.youtube.com/iframe_api"></script>
    {/if}
</svelte:head>
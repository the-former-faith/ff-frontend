<script>
  import { hasYoutube } from '../stores.js'
  const ready = () => hasYoutube.update(() => 'loaded')
</script>

<svelte:head>
  {#if $hasYoutube}
    <script
      type="text/javascript"
      src="https://www.youtube.com/iframe_api"
      on:load={ready}
      defer>
    </script>
  {/if}
</svelte:head>

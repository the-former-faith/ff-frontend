<script>
  import LogoSmall from "./LogoSmall.svelte"
  import LogoLarge from "./LogoLarge.svelte"

  import { currentPath } from '../stores.js'
</script>

{#if $currentPath === '/en'}
  <LogoLarge />
{:else}
  <LogoSmall />
{/if}
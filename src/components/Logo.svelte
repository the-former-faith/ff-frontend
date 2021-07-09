<script>
  import LogoSmall from './LogoSmall.svelte'
  import LogoLarge from './LogoLarge.svelte'
  import { getStores } from '$app/stores'
  const { page } = getStores()
</script>

<!--A bug in Chrome is making the page show up as '/en/' instead of '/en'. 
  I added both for now to fix it.
  I can research it later to see if I can fix it.-->
{#if $page.path === '/en' || $page.path === '/en/'}
  <LogoLarge />
{:else}
  <LogoSmall />
{/if}

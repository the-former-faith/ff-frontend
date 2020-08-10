<script>
  import LogoSmall from "./LogoSmall.svelte"
  import LogoLarge from "./LogoLarge.svelte"
  import { stores } from '@sapper/app'
  const { page } = stores()
</script>

{#if $page.path === '/en'}
  <LogoLarge />
{:else}
  <LogoSmall />
{/if}
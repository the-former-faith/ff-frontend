<script>
  import Logo from './Logo.svelte'
  import { getStores } from '$app/stores'
  const { page } = getStores()
</script>

<header role="banner" class="site-header  {$page.path === '/en' || $page.path === '/en/' ? 'home' : ''}">
  <a class="site-logo" href="/en/"><Logo /></a>
  <ul class="main-menu" role="navigation">
    <li><a href="/en/">home</a></li>
    <li><a href="/en/newspaper-article/">archive</a></li>
    <li><a href="/en/about/">about</a></li>
  </ul>
</header>

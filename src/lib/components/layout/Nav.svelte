<script>
  import Logo from '$lib/components/icons/Logo.svelte'
  import { getStores } from '$app/stores'
  const { page } = getStores()
</script>

<header role="banner" class="site-header  {$page.path === '/en' || $page.path === '/en/' ? 'home' : ''}">
  <a class="site-logo" href="/en/"><Logo /></a>
  <ul class="main-menu" role="navigation">
    <li><a href="/en/">home</a></li>
    <li><a href="/en/newspaper-article/">archive</a></li>
    <!--<li><a href="/en/about/">about</a></li>-->
  </ul>
</header>

<style>
.site-header {
  display: grid;
  grid-template-columns: minmax(auto, 80px) 1fr max-content;
  grid-gap: 0.5rem;
  margin-bottom: 1rem;
}

.site-header.home {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

@media screen and (min-width: 414px) {
  .site-header.home {
    display: grid;
    grid-template-columns: minmax(auto, 200px) 1fr max-content;
  }
}

ul.main-menu {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  grid-column: -1;
  text-align: center;
}

.main-menu a {
  text-decoration: none;
  display: block;
  font-size: var(--step--1);
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  border: 1px solid;
}
</style>
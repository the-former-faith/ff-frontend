<script>
  	import Logo from "./Logo.svelte";
	import { stores } from '@sapper/app'
  	const { page } = stores()
	export let segment;
</script>

<style>
	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}
</style>


<nav class="site-header">
	<a class="site-logo" aria-current='{segment === undefined ? "page" : undefined}' href='/en'><Logo /></a>
	<ul class="main-menu {$page.path === '/en' ? 'home' : ''}">
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='/en'>home</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='/en/about'>about</a></li>
	</ul>
</nav>

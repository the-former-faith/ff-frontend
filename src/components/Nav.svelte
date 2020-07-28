<script context="module">
  import Logo from "./Logo.svelte";
</script>

<script>
	export let segment;
</script>

<style>
	nav {
		display: flex;
		justify-content: space-between;
	}

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

	a {
		text-decoration: none;
		display: block;
	}

	ul {
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li a {
		padding: 1em 0.5em;
	}

</style>


<nav>
	<a aria-current='{segment === undefined ? "page" : undefined}' href='/en'><Logo /></a>
	<ul>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='/en'>home</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='about'>about</a></li>
	</ul>
</nav>

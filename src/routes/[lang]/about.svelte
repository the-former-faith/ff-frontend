<script>
	import { currentPath } from '../../stores.js'
	currentPath.update(x => 'en/about')
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>
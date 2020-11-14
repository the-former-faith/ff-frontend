<script>
	import Nav from '../components/Nav.svelte'
	import Footer from '../components/Footer.svelte'
	import YouTubeScriptTag from '../components/YouTubeScriptTag.svelte'
	export let segment
</script>

<YouTubeScriptTag />

<Nav {segment}/>

<main> 
	<slot></slot>
</main>

<Footer />
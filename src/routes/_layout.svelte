<script>
	import Nav from '../components/Nav.svelte';
	export let segment;
</script>

<Nav {segment}/>

<main> 
	<h6>God is Good</h6>
	<h5>God is Good</h5>
	<h4>God is Good</h4>
	<h3>God is Good</h3>
	<h2>God is Good</h2>
	<slot></slot>
</main>
<script context="module">
  	import client from '../../sanityClient'
	export function preload({ params, query }) {
    	return client.fetch('*[_type == "post"]').then(posts => {
			return { posts };
		}).catch(err => this.error(500, err));
	}
</script>

<script>
	export let posts;
</script>

<svelte:head>
	<title>The Former Faith</title>
</svelte:head>

<ul>
	{#each posts as post}
		<li><a rel='prefetch' href='en/post/{post.slug.en.current}'>{post.title.en}</a></li>
	{/each}
</ul>


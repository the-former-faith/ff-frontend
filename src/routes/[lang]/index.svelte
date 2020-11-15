<script context="module">
	import client from '../../sanityClient'
	import ImageObject from '../../components/ImageObject.svelte'
	import MetaAuthors from '../../components/MetaAuthors.svelte'
	export function preload({ params, query }) {
    	return client.fetch(`*[_type == "post"]{
		title,
		"authors": authors[]-> {
			title
		},
		publishedAt,
		slug,
		mainImage{
			...,
			"imageFile":  imageFile->{
			...
			}
		}
		}`).then(posts => {
			return { posts };
		}).catch(err => this.error(500, err));
	}
</script>

<script>
	export let posts
</script>

<svelte:head>
	<title>The Former Faith</title>
</svelte:head>
<h2>Latest Articles</h2>
<ul class="posts-list">
	{#each posts as post}
		<li>
			<h3><a rel='prefetch' href='en/post/{post.slug.en.current}'>{post.title.en}</a></h3>
			{#if post.mainImage}
				<ImageObject url={post.mainImage.imageFile.image} alt={post.mainImage.imageFile.image.altText.en} />
			{/if}
			<div class="post-meta">
				{#if post.authors}
					<p><MetaAuthors authors={post.authors} /></p>
				{/if}
				<p>{new Date(post.publishedAt).toDateString()}</p>
			</div>
		</li>
	{/each}
</ul>
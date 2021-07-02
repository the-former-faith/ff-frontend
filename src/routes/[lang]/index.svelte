<script context="module">
  import client from '../../sanityClient.js'
  import groq from 'groq'

  export function preload() {
    return client
      .fetch(
        groq`*[_type == "post" || _type == "postLink"]{
          _createdAt,
          _type,
					title,
					"authors": authors[]-> {
						title
					},
					slug,
					mainImage->
				} | order(_createdAt desc)`
      )
      .then((posts) => {
        return { posts }
      })
      .catch((err) => this.error(500, err))
  }
</script>

<script>
  import DocumentList from '../../components/DocumentList.svelte'

  export let posts
</script>

<svelte:head>
  <title>The Former Faith</title>
</svelte:head>
<h2>Latest Articles</h2>
<DocumentList {posts} />

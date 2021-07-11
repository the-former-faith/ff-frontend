<script context="module">
  import client from '../../sanityClient.js'
  import groq from 'groq'

  export async function load() {
    const res = await client
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

    if (res) return { props: { posts: await res } }

    return {
      status: res.status,
      error: new Error()
    }

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

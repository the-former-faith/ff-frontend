<script context="module">
  import client from '$lib/scripts/sanityClient.js'
  import groq from 'groq'

  export async function load() {
    const res = await client
      .fetch(
        groq`*[_type == "post" || _type == "postLink" || featured == true]{
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

    if (res) return { props: { docs: await res } }

    return {
      status: res.status,
      error: new Error()
    }

  }
</script>

<script>
  import DocumentList from '$lib/components/layout/DocumentList.svelte'

  export let docs

</script>

<svelte:head>
  <title>The Former Faith</title>
</svelte:head>
<h2>Latest Articles</h2>
<DocumentList {docs} />

<script context="module">
  import client from '../../../sanityClient.js'
  import groq from 'groq'

  export function preload() {
    return client
      .fetch(
        groq`*[_type == "sermon"]{
          _createdAt,
          _type,
					title,
					"authors": authors[]-> {
						title
					},
					slug,
					file
				}`
      )
      .then((posts) => {
        return { posts }
      })
      .catch((err) => this.error(500, err))
  }
</script>

<script>
  import DocumentList from '../../../components/DocumentList.svelte'
  export let posts
</script>

<svelte:head>
  <title>Historical Sermons</title>
</svelte:head>
<h2>Historical Sermons</h2>
<DocumentList {posts} />

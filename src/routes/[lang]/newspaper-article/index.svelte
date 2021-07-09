<script context="module">
  import client from '../../../sanityClient.js'
  import groq from 'groq'

  export function load() {
    return client
      .fetch(
        groq`*[_type == "newspaperArticle"]{
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
  <title>Newspaper Articles Archive</title>
</svelte:head>

<a href="/en/sermon/">sermons</a>

<h2>Newspaper Articles Archive</h2>
<DocumentList {posts} />

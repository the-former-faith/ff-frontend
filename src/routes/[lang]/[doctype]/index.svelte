<script context="module">
  import client from '$lib/scripts/sanityClient'
  import { convertToCamelCase } from '$lib/scripts/utilities'
  import groq from 'groq'

  export async function load({ page }) {
    const { doctype } = page.params

    const doctypeCamelCase = convertToCamelCase(doctype)

    const query = groq`*[_type == $doctypeCamelCase]{
      _createdAt,
      _type,
      title,
      "authors": authors[]-> {
        title
      },
      slug,
      file
    }`

    const res = await client.fetch(query, { doctypeCamelCase }).catch((err) => this.error(404, err))

    if (res) return { props: { docs: await res } }
  }
</script>

<script>
  import DocumentList from '$lib/components/layout/DocumentList.svelte'
  export let docs
</script>

<svelte:head>
  <title>Newspaper Articles Archive</title>
</svelte:head>

<a href="/en/sermon/">sermons</a>

<h2>Newspaper Articles Archive</h2>
<DocumentList {docs} />

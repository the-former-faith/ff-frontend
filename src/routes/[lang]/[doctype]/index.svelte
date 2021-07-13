<script context="module">
  import client from '$lib/scripts/sanityClient'
  import { convertToCamelCase, convertToTitleCase } from '$lib/scripts/utilities'
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
      mainImage->
    } | order(_createdAt desc)`

    const res = await client.fetch(query, { doctypeCamelCase }).catch((err) => this.error(404, err))

    if (res) return { props: { docs: await res, doctype: doctype } }
  }
</script>

<script>
  import DocumentList from '$lib/components/layout/DocumentList.svelte'
  export let docs
  export let doctype
</script>

<svelte:head>
  <title>{convertToTitleCase(doctype, '-')} Archives</title>
</svelte:head>

<h2>{convertToTitleCase(doctype, '-')} Archives</h2>

<DocumentList {docs} />

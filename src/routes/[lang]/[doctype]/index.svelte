<script context="module">
  import client from '$lib/scripts/sanityClient'
  import { convertToCamelCase, convertToTitleCase } from '$lib/scripts/utilities'
  import groq from 'groq'
  import { page } from '$app/stores';

  export async function load({ page }) {
    const { doctype } = page.params
    const currentPage = page.query.get('page')
    let redirect = {}

    if (!currentPage) {
      redirect.redirect = `${page.path}?page=1`
      redirect.status = 307
    }

    const doctypeCamelCase = convertToCamelCase(doctype)

    const query = groq`{
      "list": *[_type == $doctypeCamelCase]{
        _createdAt,
        _type,
        title,
        "authors": authors[]-> {
          title
        },
        slug,
        file,
        mainImage->
      } | order(_createdAt desc)[${currentPage - 1}...${currentPage * 50}],
      "count": count(*[_type == $doctypeCamelCase])
    }`

    const res = await client.fetch(query, { doctypeCamelCase }).catch((err) => this.error(404, err))

    if (res) return { props: { docs: await res, doctype: doctype }, ...redirect }
  }
</script>

<script>
  import DocumentList from '$lib/components/layout/DocumentList.svelte'
  export let docs
  export let doctype
  export let currentPage

  const pages = Math.ceil(docs.count / 50)

</script>

<svelte:head>
  <title>{convertToTitleCase(doctype, '-')} Archives</title>
</svelte:head>

<h2>{convertToTitleCase(doctype, '-')} Archives</h2>

<p>Total Results: {docs.count}</p>

{#if pages > 1}
  <ul>
    {#each Array(pages) as _, i}
      <li><a href="{$page.path}?page={i + 1}">{i + 1}</a></li>
    {/each}
  </ul>
{/if}

<DocumentList docs={docs.list} />

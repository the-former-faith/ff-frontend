<script context="module">
  import client from '$lib/scripts/sanityClient'
  import { convertToCamelCase, convertToTitleCase } from '$lib/scripts/utilities'
  import groq from 'groq'

  import { goto, invalidate, prefetch, prefetchRoutes } from '$app/navigation';
  import { getStores, navigating, page, session } from '$app/stores';

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
      } | order(_createdAt desc)[0...50],
      "count": count(*[_type == $doctypeCamelCase])
    }`

    const res = await client.fetch(query, { doctypeCamelCase }).catch((err) => this.error(404, err))

    if (res) return { props: { docs: await res, doctype: doctype }, ...redirect }
  }
</script>

<script>
  import DocumentList from '$lib/components/layout/DocumentList.svelte'
  import { get } from 'svelte/store';
  export let docs
  export let doctype
  export let currentPage

  const setParam = () => {
    console.log('clicked')
    $page.query.set("page","1")
    goto(`${$page.path}?page=1`, { replaceState: true, noscroll: true })
  }
</script>

<svelte:head>
  <title>{convertToTitleCase(doctype, '-')} Archives</title>
</svelte:head>

<h2>{convertToTitleCase(doctype, '-')} Archives</h2>

<DocumentList docs={docs.list} />

<button on:click={()=> setParam()}>Goto</button>
<button on:click={()=> $page.query.set("page","0")}>Set query param</button>
<button on:click={()=> console.log($page.query.get('page'))}>print weather to console</button>

<p>Total Results: {docs.count}</p>

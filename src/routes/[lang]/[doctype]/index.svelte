<script context="module">
  import client from '$lib/scripts/sanityClient'
  import { convertToCamelCase, convertToTitleCase } from '$lib/scripts/utilities'
  import groq from 'groq'
  import { page } from '$app/stores';

  export async function load({ page }) {
    const { doctype } = page.params
    const currentPage = page.query.get('page')
    let redirect = {}
    const divisor = 25

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
      } | order(_createdAt desc)| [${currentPage * divisor - divisor}...${(currentPage * divisor) - 1}],
      "count": count(*[_type == $doctypeCamelCase])
    }`

    const res = await client.fetch(query, { doctypeCamelCase }).catch((err) => this.error(404, err))

    if (res) return { props: { docs: await res, doctype: doctype, currentPage: currentPage, divisor: divisor }, ...redirect }
  }
</script>

<script>
  import DocumentList from '$lib/components/layout/DocumentList.svelte'
  export let docs
  export let doctype
  export let currentPage
  export let divisor

  const pages = Math.ceil(docs.count / divisor)

</script>

<svelte:head>
  <title>{convertToTitleCase(doctype, '-')} Archives</title>
</svelte:head>

<h2>{convertToTitleCase(doctype, '-')} Archives</h2>

<DocumentList docs={docs.list} />

<nav role="navigation" aria-label="Pagination Navigation">
  <ul>
    <li class="total">
      <p>Total Results: {docs.count}</p>
    </li>
    {#if pages > 1}
      {#each Array(pages) as _, i}
        <li>
          <a 
            sveltekit:prefetch 
            aria-current="{i + 1 == currentPage}" 
            href="{$page.path}?page={i + 1}"><span class="hidden">Go to page </span>{i + 1}
          </a>
        </li>
      {/each}
    {/if}
  </ul>
</nav>

<style>
  ul {
    margin-top: 2rem;
    list-style: none;
    display: grid;
    gap: 1px;
    grid-auto-columns: minmax(48px, auto);
    grid-auto-rows: 48px;
    grid-auto-flow: column;
    align-content: center;
    justify-content: center;
  }

  a {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    outline: 1px solid;
  }

  .total {
    padding-right: 1rem;
    align-self: center;
  }

  .hidden {
    clip: rect(0 0 0 0); 
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap; 
    width: 1px;
  }
</style>

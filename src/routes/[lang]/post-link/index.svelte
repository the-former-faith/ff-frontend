<script context="module">
  export function load({ page }) {
    return this.fetch(`${page.params.lang}/post.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts, page.params }
      })
  }
</script>

<script>
  export let posts
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
  {#each posts as post}
    <li><a sveltekit:prefetch href="en/post/{post.slug}">{post.title}</a></li>
  {/each}
</ul>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<script>
  export async function load() {
    return this.redirect(200, 'en/')
  }
  if (typeof window !== 'undefined') {
    window.location.replace('/en/')
  }
</script>

<svelte:head>
  <title>The Former Faith</title>
</svelte:head>
<p>Redirecting</p>

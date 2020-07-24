<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<script>
	export async function preload(page, session) {
		return this.redirect(200, 'en');
	}
	if (typeof window !== 'undefined') {
		window.location.replace("/en");
	}
</script>

<p>Redirecting</p>

<script>
	import { displayTitles } from '$lib/scripts/utilities'
    export let authors
    let titles = displayTitles(authors)
</script>

{#each titles as title, i}
	{#if i !== 0}, {/if}<span>{title}</span>
{/each}

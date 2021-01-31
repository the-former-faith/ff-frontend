<script context="module">
  import Chart from 'svelte-frappe-charts';
  import { onMount } from 'svelte';
</script>

<script>
  let mounted = false

  onMount(()=>{mounted = true});

  export let data;
  export let title;
  export let type;
</script>


<h2>{title}</h2>
{#if mounted == true}
  <Chart {data} {type} {title} />
{/if}
<script>
  export let embed
  export let files
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<audio playsinline controls crossorigin="anonymous">
  {#each files as file}
    <source src={file.file.asset.url} type={file.file.asset.mimeType} />
  {/each}
  {#if embed.transcriptions}
    {#each embed.transcriptions as { transcription }}
      <track kind="captions" label="English captions" src={transcription.asset.url} srclang="en" default />
    {/each}
  {/if}
</audio>

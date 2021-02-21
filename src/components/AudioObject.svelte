<script>
  export let embed
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video playsinline controls crossorigin="anonymous">
  {#each embed.files as file}
    <source src={file.asset.url} type="audio/mp4" />
  {/each}
  {#if embed.transcriptions}
    {#each embed.transcriptions as { transcription }}
      <track kind="captions" label="English captions" src={transcription.asset.url} srclang="en" default />
    {/each}
  {/if}
</video>

<style>
  video::cue {
    background-color: transparent;
    color: inherit;
    font-size: 1.5rem;
    font-size: var(--step-0);
    font-family: 'Antarctica VF', sans-serif;
    line-height: 1.2;
  }

  video {
    border: 2px solid;
    height: 100px;
    width: 100%;
  }
</style>

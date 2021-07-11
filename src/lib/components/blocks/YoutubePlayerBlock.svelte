<script>
  import { muted, hasYoutube } from '../stores.js'
  import { onDestroy, onMount } from 'svelte'
  export let youtubeId
  export let startTimeCalculated
  export let endTimeCalculated

  let htmlId = 'player-' + youtubeId
  let player
  let paused = false
  let ready = false

  hasYoutube.update(() => 'requested')
  let isMounted = false

  onMount(() => {
    isMounted = true
  })

  $: if (isMounted && $hasYoutube === 'loaded') {
    window.YT.ready(function () {
      createPlayer()
    })
  }

  let options = {
    iv_load_policy: 3,
    modestbranding: 1,
    controls: 0,
    rel: 0,
    start: startTimeCalculated,
  }

  if (endTimeCalculated) {
    options.end = endTimeCalculated
  }

  // This function creates an <iframe> (and YouTube player) after the API code downloads.
  function createPlayer() {
    player = new YT.Player(htmlId, {
      height: '390',
      width: '640',
      videoId: youtubeId,
      playerVars: options,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    })
  }

  let handleMuted = () => {
    muted.update(() => ($muted ? false : true))
  }

  const unsubscribe = muted.subscribe((muteState) => {
    if (ready) {
      if (muteState) {
        player.mute()
      } else {
        player.unMute()
      }
    }
  })

  onDestroy(unsubscribe)

  let handleInsterction = (e) => {
    let isIntersecting = e[0].isIntersecting
    if (isIntersecting) {
      player.playVideo()
    } else {
      player.pauseVideo()
    }
  }

  //The API will call this function when the video player is ready.
  function onPlayerReady() {
    ready = true
    if ($muted) {
      player.mute()
    } else {
      player.unMute()
    }

    let observer = new IntersectionObserver(handleInsterction)
    observer.observe(document.getElementById(htmlId))
  }

  // The API calls this function when the player's state changes.
  function onPlayerStateChange(event) {
    if (event.data === 0) {
      ready = false
      player.destroy()
    } else if (event.data === 1 && paused === true) {
      //Add slight delay to hide YouTube transition
      setTimeout(() => {
        paused = false
      }, 300)
    } else if (event.data === 2) {
      paused = true
    }
  }
</script>

<style>
  .youtube-player {
    width: 100%;
  }

  .container {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 90vh;
  }

  .youtube-player {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100vw;
    height: 90vh;
    transform: translate(-50%, -50%);
  }

  @media (min-aspect-ratio: 16/9) {
    .youtube-player {
      height: 56.25vw;
    }
  }

  @media (max-aspect-ratio: 16/9) {
    .youtube-player {
      width: 140vh;
    }
  }

  .mute {
    position: absolute;
    bottom: 0;
  }

  .cover {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: aquamarine;
  }
</style>

<div class="container">
  <div id={htmlId} class="youtube-player" />
  {#if ready}
    <button class="mute" on:click={handleMuted}>Muted: {$muted}</button>
  {/if}
  {#if paused}
    <button
      class="cover"
      on:click={() => {
        player.playVideo()
      }}>Resume</button>
  {/if}
</div>

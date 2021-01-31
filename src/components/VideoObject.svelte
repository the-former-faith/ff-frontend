<script>
  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from './serializersSimple'
  import YoutubePlayer from './YoutubePlayer.svelte'
  export let url
  export let caption
  export let startTime
  export let endTime

  let reduceMotion = false
  let featured = true

  function extractYoutubeId(youtubeUrl) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    youtubeUrl = decodeURIComponent(youtubeUrl)
    return youtubeUrl.match(p) ? RegExp.$1 : false
  }

  const calculateTime = (t) => {
    return (
      (t.hour ? t.hour * 3600 : 0) +
      (t.minute ? t.minute * 60 : 0) +
      (t.second ? t.second : 0)
    )
  }

  let startTimeCalculated = startTime ? calculateTime(startTime) : 0

  let endTimeCalculated = startTime ? calculateTime(endTime) : undefined

  let youtubeId = extractYoutubeId(url)
</script>

<figure>
  <YoutubePlayer
    {youtubeId}
    {featured}
    {startTimeCalculated}
    {endTimeCalculated} />

  {#if caption}
    <figcaption>
      <BlockContent blocks={caption} {serializers} />
    </figcaption>
  {/if}
</figure>

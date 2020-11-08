<script>
  import client from '../sanityClient'
  import BlockContent from "@movingbrands/svelte-portable-text"
  import serializers from "./serializersSimple"
  import YoutubePlayer from "./YoutubePlayer.svelte"
  export let url
  export let caption
  let mute = false
  let reduceMotion = false
  let featured = true
  

  function extractYoutubeId(youtubeUrl){
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    youtubeUrl = (decodeURIComponent(youtubeUrl));
    return (youtubeUrl.match(p)) ? RegExp.$1 : false ;
  }

  let youtubeId = extractYoutubeId(url);

</script>

<figure>

  <YoutubePlayer {youtubeId} />

  {#if caption}
    <figcaption>
      <BlockContent blocks={caption} {serializers} />
    </figcaption>
  {/if}
</figure>

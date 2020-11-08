<svelte:head>
    <script type="text/javascript" src="https://www.youtube.com/iframe_api" on:load={onYouTubeIframeAPIReady}></script>
</svelte:head>

<script>
    export let youtubeId

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
        console.log('Hey')
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: youtubeId,
            playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0
            },
            events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
            }
        });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        console.log(event)
    }
</script>

<p>{youtubeId}</p>

<div class="container">
    <div id="player"></div>
</div>

<style>
    .container { 
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 90vh;
    }

    .container > * {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100vw;
        height: 90vh;
        transform: translate(-50%, -50%);
    }

    @media (min-aspect-ratio: 16/9) {
        .container > * {
            height: 56.25vw
        }
    }

    @media (max-aspect-ratio: 16/9) {
        .container > * {
            width: 177.78vh
        }
    }
</style>
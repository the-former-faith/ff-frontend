<script>
  import { Map, controls } from '@beyonk/svelte-mapbox'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import MapMarker from './MapMarker.svelte'
  import serializers from './serializersSimple'
  import urlBuilder from '@sanity/image-url'
  import client from '../sanityClient'

  const urlFor = (source) => urlBuilder(client).image(source)

  const { NavigationControl, ScaleControl } = controls

  let token = 'pk.eyJ1IjoibWF0dGppbSIsImEiOiJja2tsaXZ6cGcwZ3ZkMnZwcmExNjhwZGFxIn0.CJ_95QqWns1zY2MqV7j3Uw'

  export let map
  export let caption
  let { center, zoom } = map

  let points = map.points

  let pointsWithCoordinates = points.filter((point) => point.coordinates)

  let noScriptMarkers = pointsWithCoordinates.map((point, i) => {
    return `pin-s-${i + 1}+870069(${point.coordinates.lng},${point.coordinates.lat})`
  })
</script>

<figure>
  <Map accessToken={token} options={{ scrollZoom: false }} style="mapbox://styles/mattjim/ckklrh9mr143w17kcm0thu1p1" {zoom} center={[center.lng, center.lat]}>
    {#each pointsWithCoordinates as point}
      <MapMarker lat={point.coordinates.lat} lng={point.coordinates.lng} label={point.title.en} image={point.mainImage}>
        <div>
          {#if point.mainImage}
            <div class="marker hasImage">
              <img src={urlFor(point.mainImage.file).width(80).height(80).auto('format').fit('crop').crop('entropy').url()} alt={point.mainImage.file.alt.en} />
            </div>
          {:else}
            <div class="marker" />
          {/if}
        </div>
      </MapMarker>
    {/each}
    <NavigationControl />
    <ScaleControl />
  </Map>
  <noscript>
    <img
      src={`https://api.mapbox.com/styles/v1/mattjim/ckklrh9mr143w17kcm0thu1p1/static/${noScriptMarkers.join()}/${center.lng},${center.lat},${zoom}/500x300@2x?access_token=${token}&logo=false`}
      alt={map.title.en}
    />
  </noscript>
  <figcaption>
    {#if caption}
      <BlockContent blocks={caption} {serializers} />
    {:else}
      <strong>{map.title.en}</strong>
    {/if}
    <noscript>
      <p>Map points:</p>
      <ol>
        {#each pointsWithCoordinates as point}
          <li>{point.title.en}</li>
        {/each}
      </ol>
    </noscript>
  </figcaption>
</figure>

<style>
  :global(.mapboxgl-map) {
    height: 90vh !important;
  }

  .marker {
    height: 40px;
    width: 40px;
    border: 2px solid purple;
    background-color: purple;
    transform: rotate(45deg);
    border-radius: 50% 50% 0 50%;
    overflow: hidden;
  }

  .marker img {
    transform: rotate(-45deg);
    border-radius: 50%;
  }
</style>

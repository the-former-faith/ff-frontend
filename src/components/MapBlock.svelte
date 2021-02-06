<script>
  import { Map, Marker, controls } from '@beyonk/svelte-mapbox'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import MapMarker from './MapMarker.svelte'
  import serializers from './serializersSimple'

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
      <!--<Marker lat={point.coordinates.lat} lng={point.coordinates.lng} color="#870069" label={point.title.en} popupClassName="class-name" />-->
      <MapMarker lat={point.coordinates.lat} lng={point.coordinates.lng} label={point.title.en} image={point.mainImage} />
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

  :global(.image-marker) {
    border-radius: 50%;
    border: 2px solid purple;
    height: 50px;
    width: 50px;
  }
</style>

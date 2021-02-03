<script>
  import { Map, Marker, controls } from '@beyonk/svelte-mapbox'

  const { NavigationControl, ScaleControl } = controls

  let token = 'pk.eyJ1IjoibWF0dGppbSIsImEiOiJja2tsaXZ6cGcwZ3ZkMnZwcmExNjhwZGFxIn0.CJ_95QqWns1zY2MqV7j3Uw'
  let lng = -58.76666
  let lat = 8.65
  let zoom = 2

  export let points

  let noScriptMarkers = points.map((point) => {
    return `pin-s-l+870069(${point.location.lng},${point.location.lat})`
  })
</script>

<Map accessToken={token} options={{ scrollZoom: false }} style="mapbox://styles/mattjim/ckklrh9mr143w17kcm0thu1p1" zoom={3.5} center={[-58.76666, 8.65]}>
  {#each points as point}
    <Marker lat={point.location.lat} lng={point.location.lng} color="#870069" label={point.title} popupClassName="class-name" />
  {/each}
  <NavigationControl />
  <ScaleControl />
</Map>

<noscript />

<p>
  <img
    src={`https://api.mapbox.com/styles/v1/mattjim/ckklrh9mr143w17kcm0thu1p1/static/${noScriptMarkers.join()}/${lng},${lat},${zoom}/500x300@2x?access_token=${token}&logo=false`}
    alt="Map of the Edmund Pettus Bridge in Selma, Alabama."
  />
</p>

<style>
  :global(.mapboxgl-map) {
    height: 90vh !important;
  }
</style>

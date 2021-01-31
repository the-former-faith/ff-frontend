<script>
  import { Map, Geocoder, Marker, controls } from '@beyonk/svelte-mapbox'

  const { GeolocateControl, NavigationControl, ScaleControl } = controls

  export let points
  console.log(points)
</script>

<Map
  accessToken="pk.eyJ1IjoibWF0dGppbSIsImEiOiJja2tsaXZ6cGcwZ3ZkMnZwcmExNjhwZGFxIn0.CJ_95QqWns1zY2MqV7j3Uw"
  on:recentre={(e) => console.log(e.detail.center.lat, e.detail.center.lng)}
  options={{ scrollZoom: false }}
>
  {#each points as point}
    <Marker lat={point.location.lat} lng={point.location.lng} color="rgb(255,255,255)" label={point.title} popupClassName="class-name" />
  {/each}
  <NavigationControl />
  <GeolocateControl options={{ some: 'control-option' }} />
  <ScaleControl />
</Map>

<style>
  :global(.mapboxgl-map) {
    height: 200px !important;
  }
</style>

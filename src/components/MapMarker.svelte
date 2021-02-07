<script>
  //I got a lot of code for this from https://imfeld.dev/writing/svelte_domless_components
  import { getContext } from 'svelte'
  import { contextKey } from '@beyonk/svelte-mapbox'

  const { getMap, getMapbox } = getContext(contextKey)
  const map = getMap()
  const mapbox = getMapbox()

  function move(lng, lat) {
    marker.setLngLat({ lng, lat })
  }

  export let lat
  export let lng
  export let label = 'Marker'
  export let popupClassName
  export let markerOffset = [40, 0]
  export let popupOffset = [40, -20]
  export let popup = true

  let marker

  $: marker && move(lng, lat)

  function createMarker(markerElement) {
    marker = new mapbox.Marker({ element: markerElement, offset: markerOffset })

    if (popup) {
      const popupEl = new mapbox.Popup({
        offset: popupOffset,
        className: popupClassName,
      }).setText(label)

      marker.setPopup(popupEl)
    }

    marker.setLngLat({ lng, lat }).addTo(map)

    return {
      destroy() {
        if (marker) {
          marker.remove()
          marker = undefined
        }
      },
    }
  }

  export function getMarker() {
    return marker
  }
</script>

<div use:createMarker>
  {#if marker}
    <slot />
  {/if}
</div>

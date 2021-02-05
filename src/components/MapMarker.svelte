<script>
  import { getContext, onMount } from 'svelte'
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
  export let popupClassName = 'beyonk-mapbox-popup'
  export let markerOffset = [0, 0]
  export let popupOffset = 10
  export let color = '#870069'
  export let popup = true

  let marker

  $: marker && move(lng, lat)

  onMount(() => {
    var el = document.createElement('div')
    el.innerText = label
    marker = new mapbox.Marker(el)

    if (popup) {
      const popupEl = new mapbox.Popup({
        offset: popupOffset,
        className: popupClassName,
      }).setHTML(`<p>Hi there ${label}</p>`)

      marker.setPopup(popupEl)
    }

    marker.setLngLat({ lng, lat }).addTo(map)

    return () => marker.remove()
  })

  export function getMarker() {
    return marker
  }
</script>

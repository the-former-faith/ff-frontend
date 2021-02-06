<script>
  import { getContext, onMount } from 'svelte'
  import { contextKey } from '@beyonk/svelte-mapbox'
  import urlBuilder from '@sanity/image-url'
  import client from '../sanityClient'

  const urlFor = (source) => urlBuilder(client).image(source)

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
  export let markerOffset = [0, 0]
  export let popupOffset = 10
  export let color = '#870069'
  export let popup = true
  export let image

  let marker

  $: marker && move(lng, lat)

  onMount(() => {
    let el
    if (image) {
      el = document.createElement('img')
      let src = urlFor(image.file).width(100).height(100).auto('format').fit('crop').crop('entropy').url()
      el.src = src
      //el.alt = image.alt.en
      el.className = 'image-marker'
    }

    marker = new mapbox.Marker(el ? el : { color, offset: markerOffset })

    if (popup) {
      const popupEl = new mapbox.Popup({
        offset: popupOffset,
        className: popupClassName,
      }).setText(label)

      marker.setPopup(popupEl)
    }

    marker.setLngLat({ lng, lat }).addTo(map)

    return () => marker.remove()
  })

  export function getMarker() {
    return marker
  }
</script>

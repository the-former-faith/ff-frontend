<script>
  import { assets } from '$app/paths'
  import Nav from '$lib/components/layout/Nav.svelte'
  import Footer from '$lib/components/layout/Footer.svelte'
  //import YouTubeScriptTag from '../components/YouTubeScriptTag.svelte'
  //import * as R from 'ramda'
  //import { getStores } from '$app/stores'
  //import { onMount } from 'svelte'
  //import { clientWithCredentials } from '../sanityClient.js'

  //const { session } = getStores()

  // onMount(async () => {
  //   let sanityUser = await clientWithCredentials.users.getById('me')
  //   console.log(sanityUser)
  //   console.log($session.user)
  //   if (!R.equals($session.user, sanityUser)) {
  //     document.cookie = `user=${JSON.stringify(sanityUser)}`
  //     location.reload()
  //   }
  // })
</script>

<svelte:head>
  <link rel='stylesheet' href='{assets}/global.css'>
</svelte:head>

<Nav />

<main>
  <slot />
</main>

<Footer />

<!--<YouTubeScriptTag />-->

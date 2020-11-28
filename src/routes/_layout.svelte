<script>
  import Nav from '../components/Nav.svelte'
  import Footer from '../components/Footer.svelte'
  import YouTubeScriptTag from '../components/YouTubeScriptTag.svelte'
  import * as R from 'ramda'
  import { stores } from '@sapper/app'
  import { onMount } from 'svelte'
  import client from '../sanityClient.js'
  export let segment

  const { session } = stores()

  onMount(async () => {
    let sanityUser = await client(true).users.getById('me')
    if (!R.equals($session.user, sanityUser)) {
      document.cookie = `user=${JSON.stringify(sanityUser)}`
      location.reload()
    }
  })
</script>

<Nav {segment} />

<main>
  <slot />
</main>

<Footer />

<YouTubeScriptTag />

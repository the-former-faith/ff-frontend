import sanityClient from '@sanity/client'

const unauthicatedClient = sanityClient({
  projectId: 'tuiw9zvo',
  dataset: 'production',
  useCdn: true
})

const authenticatedClient = sanityClient({
  projectId: 'tuiw9zvo',
  dataset: 'production',
  token: process.env.SANITY_READ,
  useCdn: false
})

const client = (x) => x ? authenticatedClient : unauthicatedClient

export default client
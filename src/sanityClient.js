import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'tuiw9zvo',
  dataset: 'production',
  token: process.env.SANITY_READ,
  useCdn: true
})

export default client

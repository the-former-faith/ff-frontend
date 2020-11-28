import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'tuiw9zvo',
  dataset: 'production',
  withCredentials: true,
  //token: process.env.SANITY_READ,
  //useCdn: true
})

export default client

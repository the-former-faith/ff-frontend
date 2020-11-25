import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'tuiw9zvo',
  dataset: 'production',
  withCredentials: true,
  useCdn: true
})

export default client

import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'tuiw9zvo',
  dataset: 'production',
  useCdn: true
})

export default client

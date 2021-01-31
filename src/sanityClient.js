import sanityClient from '@sanity/client'

const clientWithoutAuth = sanityClient({
  projectId: 'tuiw9zvo',
  dataset: 'production',
  useCdn: true
})

export const clientWithToken = sanityClient({
  projectId: 'tuiw9zvo',
  dataset: 'production',
  token: process.env.SANITY_READ,
  useCdn: false
})

export const clientWithCredentials = sanityClient({
  projectId: 'tuiw9zvo',
  dataset: 'production',
  withCredentials: true,
  useCdn: false
})

const setClient = (x) => x ? clientWithToken : clientWithoutAuth

//Change this to be set with a store
const client = setClient(false)

export default client
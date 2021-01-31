import { writable } from 'svelte/store'

export const footnotes = writable([])

export const muted = writable(true)

export const hasYoutube = writable(false)
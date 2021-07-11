<script>
  export let book
  export let chapter
  export let verse
  export let verseEnd
</script>

<a href={`https://www.biblegateway.com/passage/?search=${book.replace(/ /g, '+')}+${chapter}%3A${verse}${verseEnd ? '-' + verseEnd : ''}&version=KJV`}>
  <slot />
</a>

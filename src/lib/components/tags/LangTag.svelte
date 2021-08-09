<script>
  export let lang;
</script>

<span {lang}>
  <slot />
</span>

<style>
  span {
    font-style: italic;
  }
</style>
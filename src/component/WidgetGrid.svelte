<script>
  import Widget from './Widget.svelte';
</script>

<div>
  <Widget colspan={2} />
  <Widget />
  <Widget />
  <Widget />
  <Widget colspan={3} />
  <Widget colspan={4} />
  <Widget />
  <Widget colspan={2} />
  <Widget />
</div>

<style lang="scss">
  @media screen and (min-width: 800px) {
    div {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 0.5rem;
    }
  }
</style>

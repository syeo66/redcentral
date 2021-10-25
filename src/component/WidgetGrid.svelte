<script lang="ts">
  import Widget from './Widget.svelte';
  import CryptoCharts from './widgets/CryptoCharts.svelte';
</script>

<div>
  <Widget colspan={3} rowspan={4}><CryptoCharts /></Widget>
  <Widget rowspan={2} />
  <Widget />
  <Widget />
  <Widget />
  <Widget />
  <Widget />
  <Widget />
</div>

<style lang="scss">
  @media screen and (min-width: 800px) {
    div {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 0.5rem;
      overflow: auto;
      max-height: 100%;
      grid-auto-flow: dense;
    }
  }
</style>

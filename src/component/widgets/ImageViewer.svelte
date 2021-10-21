<script lang="ts">
  import PrevNext from '../PrevNext.svelte';

  interface Image {
    alt: string;
    src: string;
  }

  export let images: Image[] = [];

  let pointer = 0;
  $: currentChart = images[pointer];
</script>

<div>
  <PrevNext max={images.length} bind:count={pointer} />
  <img alt={currentChart.alt} src={currentChart.src} />
</div>

<style lang="scss">
  div,
  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1.619;
    border-radius: 0.5rem;
  }
</style>

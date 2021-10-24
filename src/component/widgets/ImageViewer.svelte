<script lang="ts">
  import { onMount } from 'svelte';

  import PrevNext from '../PrevNext.svelte';

  interface Image {
    alt: string;
    src: string;
  }

  export let images: Image[] = [];

  let isLoaded: boolean[] = images.map(() => false);

  onMount(async () => {
    images.forEach((image, key) => {
      const img = new Image();
      img.onload = () => (isLoaded[key] = true);
      img.src = image.src;
    });
  });

  let pointer = 0;
  $: currentChart = images[pointer];
</script>

<div>
  <PrevNext max={images.length} bind:count={pointer} />
  {#if isLoaded[pointer]}
    <img alt={currentChart.alt} src={currentChart.src} />
  {:else}
    Loading...
  {/if}
</div>

<style lang="scss">
  div,
  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1.619;
    border-radius: 0.5rem;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

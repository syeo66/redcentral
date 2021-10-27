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
  {#if images.length > 1}
    <PrevNext max={images.length} bind:count={pointer} />
  {/if}
  {#if isLoaded[pointer]}
    <img alt={currentChart.alt} src={currentChart.src} />
  {:else}
    Loading...
  {/if}
</div>

<style lang="scss">
  div,
  img {
    border-radius: 0.5rem;
  }
  img {
    width: 100%;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
  }
</style>

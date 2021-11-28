<script lang="ts">
  import { onMount } from 'svelte';
  import type { ImageViewerPanel, Image } from '../../types';

  import PrevNext from '../PrevNext.svelte';

  export let panel: ImageViewerPanel;

  $: images = panel?.settings?.images;
  $: isLoaded = images?.map(() => false);

  onMount(async () => {
    images.forEach((image, key) => {
      const img = new Image();
      img.onload = () => (isLoaded[key] = true);
      img.src = image.src;
    });
  });

  let pointer = 0;
  $: currentImage = images?.[pointer];
</script>

<div>
  {#if images?.length > 1}
    <PrevNext max={images.length} bind:count={pointer} />
  {/if}
  {#if currentImage && isLoaded[pointer]}
    <img alt={currentImage.alt} src={currentImage.src} />
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

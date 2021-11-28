<script lang="ts">
  import type { Image } from '../../types';

  export let data: Record<string, unknown> = { images: '' };

  let value = '';
  $: images = [{ src: value, alt: '' }] as Image[];

  $: data = { images };
</script>

<label>
  Image URL
  <input type="text" bind:value />
</label>

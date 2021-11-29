<script lang="ts">
  import { query } from '@firebase/firestore';

  import { useQuery } from '@sveltestack/svelte-query';

  import type { NasaImagesPanel, Image, ImageViewerPanel } from '../../types';

  import ImageViewer from './ImageViewer.svelte';

  const queryResult = useQuery('nasa-images', () =>
    fetch(
      'https://www.nasa.gov/api/2/ubernode/_search?size=24&from=0&sort=promo-date-time%3Adesc&q=((ubernode-type%3Afeature%20OR%20ubernode-type%3Aimage)%20AND%20(routes%3A1446))&_source_include=promo-date-time%2Cmaster-image%2Cnid%2Ctitle%2Ctopics%2Cmissions%2Ccollections%2Cother-tags%2Cubernode-type%2Cprimary-tag%2Csecondary-tag%2Ccardfeed-title%2Ctype%2Ccollection-asset-link%2Clink-or-attachment%2Cpr-leader-sentence%2Cimage-feature-caption%2Cattachments%2Curi'
    ).then((res) => res.json())
  );

  export let panel: NasaImagesPanel;

  $: images =
    $queryResult.data?.hits?.hits?.slice(0, 10).map((entry) => ({
      alt: entry._source?.['master-image']?.alt,
      src: entry._source?.['master-image']?.uri.replace(
        'public:/',
        'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public'
      ),
    })) ?? [];

  $: imagePanel = { ...panel, settings: { images }, component: 'ImageViewer' } as ImageViewerPanel;
</script>

{#if $queryResult.isLoading}
  Loading...
{:else if $queryResult.error}
  <div>Could not load data.</div>
{:else}
  <ImageViewer panel={imagePanel} />
{/if}

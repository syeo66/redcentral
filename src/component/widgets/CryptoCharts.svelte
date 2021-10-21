<script lang="ts">
  import PrevNext from '../PrevNext.svelte';

  const charts = [
    {
      alt: 'BTC Chart',
      src: 'https://docs.google.com/spreadsheets/d/1bokEgNZuB4kXXWfalhvHY1Iw_obRvajwF1lhW0nFcc4/embed/oimg?id=1bokEgNZuB4kXXWfalhvHY1Iw_obRvajwF1lhW0nFcc4&oid=210156340&disposition=ATTACHMENT&bo=false&filetype=png&zx=7m4ey04q8b5t',
    },
    {
      alt: 'ETH Chart',
      src: 'https://docs.google.com/spreadsheets/d/10wK2-f_BfcnQGA3ScQfbHWr7z87dmmarEGHCS_zVeu8/embed/oimg?id=10wK2-f_BfcnQGA3ScQfbHWr7z87dmmarEGHCS_zVeu8&oid=210156340&disposition=ATTACHMENT&bo=false&filetype=png&zx=f4j5yq7u3wtk',
    },
    {
      alt: 'ADA Chart',
      src: 'https://docs.google.com/spreadsheets/d/1RDgo5_DPeuOQuBS7adZLyeP1ym-2tiDG3SSL3OBsjgA/embed/oimg?id=1RDgo5_DPeuOQuBS7adZLyeP1ym-2tiDG3SSL3OBsjgA&oid=210156340&disposition=ATTACHMENT&bo=false&filetype=png&zx=vqhsytr4jrjp',
    },
  ];

  let pointer = 0;
  $: currentChart = charts[pointer];
</script>

<div>
  <PrevNext max={charts.length} bind:count={pointer} />
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

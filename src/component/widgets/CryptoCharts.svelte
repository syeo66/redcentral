<script lang="ts">
  import ImageViewer from './ImageViewer.svelte';

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
    {
      alt: 'DOGE Chart',
      src: 'https://docs.google.com/spreadsheets/d/1m0xZYhZmABHf9ILZjOKitiHWNEPlAovdLjMli9236S0/embed/oimg?id=1m0xZYhZmABHf9ILZjOKitiHWNEPlAovdLjMli9236S0&oid=210156340&disposition=ATTACHMENT&bo=false&filetype=png&zx=wkkws6ne6343',
    },
    {
      alt: 'SOL Chart',
      src: 'https://docs.google.com/spreadsheets/d/1tGKsg-2yF7mNXJefyVuf-hrT5K_RIYH-V8FZfjlhMQQ/embed/oimg?id=1tGKsg-2yF7mNXJefyVuf-hrT5K_RIYH-V8FZfjlhMQQ&oid=210156340&disposition=ATTACHMENT&bo=false&filetype=png&zx=qtrevvsyjgly',
    },
    {
      alt: 'DOT Chart',
      src: 'https://docs.google.com/spreadsheets/d/1jN_0OLf-JZVxt2FviSIhclCdvRhgZWJFM5lGpVJ7pew/embed/oimg?id=1jN_0OLf-JZVxt2FviSIhclCdvRhgZWJFM5lGpVJ7pew&oid=210156340&disposition=ATTACHMENT&bo=false&filetype=png&zx=7ona6bqrjizl',
    },
  ];
</script>

<ImageViewer images={charts} />

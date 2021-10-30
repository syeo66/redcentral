<script lang="ts">
  import DOMPurify from 'dompurify';

  import type { HtmlContentPanel } from '../../types';

  export let panel: HtmlContentPanel;
  $: output = DOMPurify.sanitize(panel.settings.content);
</script>

<div>{@html output}</div>

<style lang="scss">
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0.7rem 0;
    @media screen and (min-width: 800px) {
      padding: 0;
    }
  }
</style>

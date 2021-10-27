<script lang="ts">
  import type { HtmlContentPanel } from '../../types';

  export let panel: HtmlContentPanel;
</script>

<div>{@html panel.settings.content}</div>

<style lang="scss">
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>

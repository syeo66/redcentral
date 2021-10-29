<script lang="ts">
  import type { Panel } from '../types';
  import BitcoinPrice from './widgets/BitcoinPrice.svelte';

  import CryptoCharts from './widgets/CryptoCharts.svelte';
  import Debugger from './widgets/Debugger.svelte';
  import HtmlContent from './widgets/HtmlContent.svelte';

  export let panel: Panel;
</script>

<div class={`colspan-${panel.size.columns} rowspan-${panel.size.rows}`}>
  {#if panel.component === 'CryptoCharts'}
    <CryptoCharts />
  {:else if panel.component === 'HtmlContent'}
    <HtmlContent {panel} />
  {:else if panel.component === 'BitcoinPrice'}
    <BitcoinPrice />
  {:else}
    <Debugger {panel} />
  {/if}
</div>

<style lang="scss">
  div {
    &:not(:last-child) {
      margin-bottom: 0.5rem;

      @media screen and (min-width: 800px) {
        margin-bottom: 0;
      }
    }

    border-radius: 0.5rem;
    min-height: 3rem;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;

    @media screen and (min-width: 800px) {
      margin-bottom: 0;

      &.colspan-1 {
        grid-column: span 1;
      }

      &.colspan-2 {
        grid-column: span 2;
      }

      &.colspan-3 {
        grid-column: span 3;
      }

      &.colspan-4 {
        grid-column: span 4;
      }

      &.rowspan-1 {
        grid-row: span 1;
      }

      &.rowspan-2 {
        grid-row: span 2;
      }

      &.rowspan-3 {
        grid-row: span 3;
      }

      &.rowspan-4 {
        grid-row: span 4;
      }
    }
  }
</style>

<script lang="ts">
  import { onDestroy } from 'svelte';

  import BitcoinPrice from './widgets/BitcoinPrice.svelte';
  import CryptoCharts from './widgets/CryptoCharts.svelte';
  import Debugger from './widgets/Debugger.svelte';
  import HtmlContent from './widgets/HtmlContent.svelte';

  import type { Panel } from '../types';

  export let panel: Panel;
  export let isEditMode = false;

  let component: HTMLElement;
  let isFullScreen = false;

  const handleEscape = ({ key }) => {
    if (key === 'Escape') {
      isFullScreen = false;
      document.exitFullscreen();
    }
  };

  const handleFullscreen = () => {
    isFullScreen = !!document.fullscreenElement;
  };

  const handleDblClick = () => {
    isFullScreen = !isFullScreen;

    if (isFullScreen) {
      component.requestFullscreen();
      return;
    }

    document.exitFullscreen();
  };

  document.addEventListener('keydown', handleEscape);
  document.addEventListener('fullscreenchange', handleFullscreen, false);

  onDestroy(() => {
    document.removeEventListener('keydown', handleEscape);
    document.removeEventListener('fullscreenchange', handleFullscreen);
  });
</script>

<div
  class={`colspan-${panel.size.columns} rowspan-${panel.size.rows}`}
  class:fullscreen={isFullScreen}
  on:dblclick={handleDblClick}
  bind:this={component}
>
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
    &.fullscreen {
      position: absolute;
      left: 0;
      top: 0;
      background-color: #222;
      width: 100%;
      height: 100%;
      bottom: 0;
      right: 0;
      z-index: 100;
    }

    &:not(:last-child) {
      margin-bottom: 0.5rem;

      @media screen and (min-width: 800px) {
        margin-bottom: 0;
      }
    }

    user-select: none;
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

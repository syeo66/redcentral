<script lang="ts">
  import type { Dashboard } from '../types';

  import Widget from './Widget.svelte';

  export let dashboard: Dashboard;

  $: panels = [...(dashboard?.panels || [])].sort((a, b) => a.position - b.position);
</script>

<div>
  {#if dashboard}
    {#each panels as panel}
      <Widget {panel} />
    {/each}
  {/if}
</div>

<style lang="scss">
  @media screen and (min-width: 800px) {
    div {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 0.5rem;
      overflow: auto;
      max-height: 100%;
      grid-auto-flow: dense;
      max-width: 100%;
    }
  }
</style>

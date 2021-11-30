<script lang="ts">
  import type { Dashboard } from '../types';

  import WidgetGrid from './WidgetGrid.svelte';

  export let id = '';
  export let isEditMode = false;
  export let dashboards: Record<string, Dashboard>;

  $: currentDashboard = dashboards[id];
</script>

<main>
  <WidgetGrid dashboard={currentDashboard} {isEditMode} />
</main>

<style lang="scss">
  main {
    background: #444;
    padding: 1rem;

    border-bottom: 1px solid #000;
    border-top: 1px solid #666;

    @media screen and (min-width: 800px) {
      border: 0 transparent none;
      grid-area: main;
    }
  }
</style>

<script lang="ts">
  import { editMode } from '../stores';

  import type { Dashboard } from '../types';

  import WidgetGrid from './WidgetGrid.svelte';

  export let id = '';
  export let dashboards: Record<string, Dashboard>;

  let isEditMode = false;

  editMode.subscribe((value) => {
    isEditMode = value;
  });

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

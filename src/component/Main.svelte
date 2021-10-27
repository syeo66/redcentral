<script lang="ts">
  import type { User } from 'firebase/auth';

  import WidgetGrid from './WidgetGrid.svelte';

  export let user: User;
</script>

<main><WidgetGrid {user} /></main>

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

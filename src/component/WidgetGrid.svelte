<script lang="ts">
  import type { User } from 'firebase/auth';
  import { doc, DocumentSnapshot, onSnapshot } from 'firebase/firestore';
  import { onDestroy } from 'svelte';

  import { db } from '../firebase';
  import type { Dashboard, DashboardUser, Panel } from '../types';

  import Widget from './Widget.svelte';

  export let user: User;

  let dashboards: Record<string, Dashboard> = {};
  let selectedDashboard = '';

  $: currentDashboard = dashboards[selectedDashboard];
  $: panels = [...(currentDashboard?.panels || [])].sort((a, b) => a.position - b.position);

  const unsub = onSnapshot(doc(db, 'users', user.uid), (doc: DocumentSnapshot<DashboardUser>) => {
    if (!doc.exists || !doc.data().dashboards) {
      return;
    }

    const dashboardReducer = (acc: Record<string, Dashboard>, dashboard: Dashboard) => ({
      ...acc,
      [dashboard.uuid]: dashboard,
    });

    dashboards = doc.data().dashboards.reduce(dashboardReducer, {});

    if (!selectedDashboard) {
      selectedDashboard = doc.data().dashboards[0].uuid;
    }
  });

  onDestroy(() => unsub());
</script>

<div>
  {#if currentDashboard}
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

<script lang="ts">
  import { onDestroy } from 'svelte';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import { Router, Route } from 'svelte-routing';
  import type { User } from 'firebase/auth';
  import { doc, DocumentSnapshot, onSnapshot } from 'firebase/firestore';

  import Header from './component/Header.svelte';
  import Login from './component/Login.svelte';
  import Main from './component/Main.svelte';
  import Navigation from './component/Navigation.svelte';
  import { auth, db } from './firebase';
  import type { Dashboard, DashboardUser } from './types';

  let user: User;
  let firstId = '';

  auth.onAuthStateChanged((u) => (user = u));

  const queryClient = new QueryClient();

  let dashboards: Record<string, Dashboard> = {};

  $: unsub =
    user &&
    onSnapshot(doc(db, 'users', user.uid), (doc: DocumentSnapshot<DashboardUser>) => {
      if (!doc.exists || !doc.data().dashboards) {
        return;
      }

      const dashboardReducer = (acc: Record<string, Dashboard>, dashboard: Dashboard) => ({
        ...acc,
        [dashboard.uuid]: dashboard,
      });

      dashboards = doc.data().dashboards.reduce(dashboardReducer, {});
      firstId = doc.data().dashboards[0].uuid;
    });

  onDestroy(() => unsub && unsub());
</script>

<QueryClientProvider client={queryClient}>
  <Router>
    <div>
      <Header />
      {#if !user}
        <nav />
        <Login />
      {:else}
        <Route path="/:id" let:params>
          <Navigation {user} id={params.id} {dashboards} />
          <Main id={params.id} {dashboards} />
        </Route>

        <Route path="/">
          <Navigation {user} id={firstId} {dashboards} />
          <Main id={firstId} {dashboards} />
        </Route>
      {/if}
    </div>
  </Router>
</QueryClientProvider>

<style lang="scss">
  div {
    @media screen and (min-width: 800px) {
      display: grid;
      grid-template-columns: 16rem 1fr;
      grid-template-rows: 5rem 1fr;
      grid-template-areas: 'header main' 'nav main';
      height: 100%;
    }

    nav {
      background: #333;
      border-bottom: 1px solid #000;
      border-top: 1px solid #666;

      @media screen and (min-width: 800px) {
        border-bottom: 0 transparent none;
        grid-area: nav;
      }
    }
  }
</style>

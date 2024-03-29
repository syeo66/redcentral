<script lang="ts">
  import type { Unsubscribe } from 'firebase/firestore';
  import type { User } from 'firebase/auth';
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import { Router, Route } from 'svelte-routing';
  import { onDestroy, setContext } from 'svelte';
  import { onSnapshot, collection, QuerySnapshot } from 'firebase/firestore';

  import Header from './component/Header.svelte';
  import Login from './component/Login.svelte';
  import Main from './component/Main.svelte';
  import Navigation from './component/Navigation.svelte';
  import Tools from './component/Tools.svelte';

  import { auth, db } from './firebase';
  import type { Dashboard, UserContext } from './types';

  let user: User;
  let firstId = '';
  let unsub: Unsubscribe;

  setContext<UserContext>('user', { getUser: () => user });

  auth.onAuthStateChanged((u) => {
    user = u;

    if (!user) {
      unsub?.();
      unsub = null;

      return;
    }

    unsub = onSnapshot(
      collection(db, 'users', user?.uid || 'empty', 'dashboards'),
      (results: QuerySnapshot<Dashboard>) => {
        firstId = '';

        const newDashboards: Record<string, Dashboard> = {};

        results.forEach((entry) => {
          newDashboards[entry.id] = entry.data();
        });

        firstId = Object.values(newDashboards).sort((a, b) => a.position - b.position)?.[0].uuid || '';

        dashboards = newDashboards;
      }
    );
  });

  const queryClient = new QueryClient();

  let dashboards: Record<string, Dashboard> = {};

  onDestroy(() => unsub?.());
</script>

<QueryClientProvider client={queryClient}>
  <Router>
    <section>
      <Header />
      {#if !user}
        <nav />
        <div class="tools" />
        <Login />
      {:else}
        <Tools />

        <Route path="/:id" let:params>
          <Navigation id={params.id} {dashboards} />
          <Main id={params.id} {dashboards} />
        </Route>

        <Route path="/">
          <Navigation id={firstId} {dashboards} />
          <Main id={firstId} {dashboards} />
        </Route>
      {/if}
    </section>
  </Router>
</QueryClientProvider>

<style lang="scss">
  section {
    @media screen and (min-width: 800px) {
      display: grid;
      grid-template-columns: 16rem 1fr;
      grid-template-rows: 5rem 1fr 4rem;
      grid-template-areas: 'header main' 'nav main' 'tools main';
      height: 100%;
    }

    nav,
    .tools {
      background: #333;
      border-bottom: 1px solid #000;
      border-top: 1px solid #666;

      @media screen and (min-width: 800px) {
        &:last-child {
          border-bottom: 0 transparent none;
        }
      }
    }

    nav {
      @media screen and (min-width: 800px) {
        grid-area: nav;
      }
    }

    .tools {
      @media screen and (min-width: 800px) {
        grid-area: tools;
      }
    }
  }
</style>

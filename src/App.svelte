<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import { Router, Route } from 'svelte-routing';
  import { onSnapshot, collection, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
  import { onDestroy } from 'svelte';
  import type { User } from 'firebase/auth';

  import Header from './component/Header.svelte';
  import Login from './component/Login.svelte';
  import Main from './component/Main.svelte';
  import Navigation from './component/Navigation.svelte';
  import Tools from './component/Tools.svelte';

  import { auth, db } from './firebase';
  import type { Dashboard } from './types';

  let user: User;
  let firstId = '';
  let isEditMode = false;
  let unsub: Unsubscribe;

  auth.onAuthStateChanged((u) => {
    user = u;

    if (!user) {
      unsub = null;

      return;
    }

    unsub = onSnapshot(
      collection(db, 'users', user?.uid || 'empty', 'dashboards'),
      (results: QuerySnapshot<Dashboard>) => {
        firstId = '';

        const newDashboards = {};

        results.forEach((entry) => {
          if (!firstId) {
            firstId = entry.id;
          }
          newDashboards[entry.id] = entry.data();
        });

        dashboards = newDashboards;
      }
    );
  });

  const queryClient = new QueryClient();

  let dashboards: Record<string, Dashboard> = {};

  const handleEditMode = (e: CustomEvent<boolean>) => (isEditMode = e.detail);

  onDestroy(() => unsub && unsub());
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
        <Tools on:editmode={handleEditMode} />

        <Route path="/:id" let:params>
          <Navigation {user} id={params.id} {dashboards} {isEditMode} />
          <Main id={params.id} {dashboards} {isEditMode} {user} />
        </Route>

        <Route path="/">
          <Navigation {user} id={firstId} {dashboards} {isEditMode} />
          <Main id={firstId} {dashboards} {isEditMode} {user} />
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

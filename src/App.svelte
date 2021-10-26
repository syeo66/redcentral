<script lang="ts">
  import type { User } from 'firebase/auth';

  import Header from './component/Header.svelte';
  import Login from './component/Login.svelte';
  import Main from './component/Main.svelte';
  import Navigation from './component/Navigation.svelte';
  import { auth } from './firebase';

  let user: User;

  auth.onAuthStateChanged((u) => (user = u));
</script>

<div>
  <Header />
  <Navigation {user} />
  {#if !user}
    <Login />
  {:else}
    <Main {user} />
  {/if}
</div>

<style lang="scss">
  div {
    @media screen and (min-width: 800px) {
      display: grid;
      grid-template-columns: 16rem 1fr;
      grid-template-rows: 5rem 1fr;
      grid-template-areas: 'header main' 'nav main';
      height: 100%;
    }
  }
</style>

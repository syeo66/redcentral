<script lang="ts">
  import Header from './component/Header.svelte';
  import Main from './component/Main.svelte';
  import Navigation from './component/Navigation.svelte';
</script>

<div>
  <Header />
  <Navigation />
  <Main />
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

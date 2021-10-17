<script>
  import RedCentral from './RedCentral.svelte';
</script>

<div>
  <header><RedCentral /></header>
  <nav>Navigation</nav>
  <main>Main</main>
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

  header {
    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom: 1px solid #000;
    background: #333;

    padding: 1rem;

    @media screen and (min-width: 800px) {
      grid-area: header;
    }
  }

  main {
    background: #444;

    @media screen and (min-width: 800px) {
      grid-area: main;
    }
  }

  nav {
    border-top: 1px solid #666;
    background: #333;
    padding: 1rem;

    @media screen and (min-width: 800px) {
      grid-area: nav;
    }
  }
</style>

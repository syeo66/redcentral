<script>
  import RedCentral from './RedCentral.svelte';
</script>

<div>
  <header><a href="/"><RedCentral /></a></header>
  <nav><a href="/" class="active">Home</a></nav>
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

    > * {
      border-bottom: 1px solid #000;
      border-top: 1px solid #666;
    }
  }

  header {
    display: flex;
    align-items: center;
    justify-content: center;

    background: #333;

    padding: 1rem;
    border-top: 0 transparent none;

    a {
      color: #fff;
    }

    @media screen and (min-width: 800px) {
      grid-area: header;
    }
  }

  main {
    background: #444;
    padding: 1rem;

    @media screen and (min-width:  800px) {
      border: 0 transparent none;
      grid-area: main;
    }
  }

  nav {
    background: #333;
    padding: 1rem;

    a {
      display: block;
      border: 1px solid #666;
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
      background-color: #222;
      border-radius: .3rem;
      color: #eee;
      padding: .6rem;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
      text-decoration: none;
      transition: background-color 250ms, box-shadow 250ms;

      &.active {
        background-color: #333;
        border: 1px solid #000;
        border-bottom: 1px solid #666;
        border-right: 1px solid #666;
        box-shadow: 0 0 0 rgba(0,0,0,0.5);
      }

      &:hover {
        background-color: #2d2d2d;
        border: 1px solid #444;
        border-bottom: 1px solid #222;
        border-right: 1px solid #222;
        box-shadow: 0 0 5ms rgba(0,0,0,0.3);
      }
    }

    @media screen and (min-width: 800px) {
      border-bottom: 0 transparent none;
      grid-area: nav;
    }
  }
</style>

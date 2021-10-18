<script lang="ts">
  import RedCentral from './RedCentral.svelte';
</script>

<header><a href="/"><RedCentral /></a></header>

<style lang="scss">
  header {
    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom: 1px solid #000;
    border-top: 1px solid #666;

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
</style>

<script lang="ts">
  import { fly, fade } from 'svelte/transition';
</script>

<div transition:fade={{ duration: 200 }} class="modal">
  <div transition:fly={{ duration: 200, y: 500 }} class="window">
    <slot />
  </div>
</div>

<style lang="scss">
  // modal with rounded border and dark background
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .window {
    @media screen {
      border-radius: 0.5rem;
      background: #222;
      padding: 1rem;
      min-width: 16rem;
    }
  }
</style>

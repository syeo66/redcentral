<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let style = '';

  const dispatch = createEventDispatcher();

  const handleClick = () => dispatch('click');
</script>

<button on:click={handleClick} {style}>
  <slot />
</button>

<style lang="scss">
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #666;
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    background-color: #222;
    border-radius: 0.3rem;
    color: #eee;
    padding: 0.6rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-decoration: none;
    transition: background-color 250ms, box-shadow 250ms;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1rem;
  }
</style>

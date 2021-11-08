<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Button from './Button.svelte';

  const dispatch = createEventDispatcher();

  const handleConfirm = () => dispatch('confirm');
  const handleCancel = () => dispatch('cancel');
</script>

<div class="form">
  <slot />
  <div class="buttons">
    <Button isPrimary on:click={handleConfirm}>Save</Button>
    <Button on:click={handleCancel}>Cancel</Button>
  </div>
</div>

<style lang="scss">
  .buttons {
    display: flex;
    justify-content: flex-end;
    margin: 0 0 -0.5rem;
    padding: 0;
    margin-top: 1rem;
  }
</style>

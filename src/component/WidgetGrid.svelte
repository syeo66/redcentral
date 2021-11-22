<script lang="ts">
  import Icon from 'svelte-awesome';
  import { plusCircle } from 'svelte-awesome/icons';

  import type { User } from '@firebase/auth';

  import type { Dashboard } from '../types';

  import Widget from './Widget.svelte';
  import WidgetForm from './WidgetForm.svelte';

  export let user: User;
  export let dashboard: Dashboard;
  export let isEditMode = false;

  let showConfiguration = false;

  const handleWidgetAddClick = () => {
    showConfiguration = true;
  };

  const handleCancel = () => {
    showConfiguration = false;
  };

  const handleConfirm = () => {
    showConfiguration = false;
  };

  $: panels = [...(dashboard?.panels || [])].sort((a, b) => a.position - b.position);
</script>

<div>
  {#if dashboard}
    {#each panels as panel}
      <Widget {panel} {isEditMode} />
    {/each}

    {#if isEditMode}
      <div class="add-widget" on:click={handleWidgetAddClick}>
        <span><Icon data={plusCircle} scale={2} /></span>
      </div>
    {/if}
  {/if}

  {#if showConfiguration}
    <WidgetForm on:cancel={handleCancel} on:confirm={handleConfirm} {dashboard} {user} />
  {/if}
</div>

<style lang="scss">
  @media screen and (min-width: 800px) {
    div {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 0.5rem;
      overflow: auto;
      max-height: 100%;
      grid-auto-flow: dense;
      max-width: 100%;

      .add-widget {
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.3);
        padding: 0.25rem;
        cursor: pointer;
      }
    }
  }
</style>

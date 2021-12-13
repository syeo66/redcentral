<script lang="ts">
  import Icon from 'svelte-awesome';
  import { cog } from 'svelte-awesome/icons';
  import { isEditMode } from '../stores';

  const handleEditModeClick = () => {
    isEditMode.set(!$isEditMode);
  };
</script>

<div class="tools">
  <span on:click={handleEditModeClick} title={$isEditMode ? 'End edit mode' : 'Start edit mode'}>
    <Icon spin={$isEditMode} data={cog} scale={1.7} style="cursor:pointer;" />
  </span>
</div>

<style lang="scss">
  .tools {
    background: #333;
    border-bottom: 1px solid #000;
    border-top: 1px solid #666;
    display: flex;
    padding: 1rem;
    justify-content: flex-end;
    align-items: center;

    @media screen and (min-width: 800px) {
      grid-area: tools;

      &:last-child {
        border-bottom: 0 transparent none;
      }
    }
  }
</style>

<script context="module" lang="ts">
  export interface Option {
    value: string | number;
    label: string;
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ change: Option }>();

  export let options: Option[] = [];
  export let id: string;
  export let name: string;
  export let value = options?.[0]?.value;

  let active = false;

  $: selectedOption = options.find((option) => option.value === value);

  const handleToggle = () => {
    active = !active;
  };

  const handleClick = (option: Option) => {
    value = option.value;
    dispatch('change', option);
  };
</script>

<div class="dropdown" class:active on:click={handleToggle}>
  <input {id} {name} {value} type="hidden" />
  <div class="selected">{selectedOption?.label || 'Please choose...'}</div>
  <ul class="options">
    {#each options as option}
      {#if option.value !== value}
        <li class="option" on:click={() => handleClick(option)}>
          {option.label}
        </li>
      {/if}
    {/each}
  </ul>
</div>

<style lang="scss">
  .dropdown {
    position: relative;
    display: block;
    border: 1px solid #999;
    border-radius: 0.25rem;
    padding: 0.5rem;
    background: #333;
    cursor: pointer;
    min-width: 15rem;

    &.active {
      .options {
        transform: scaleY(1);
      }
    }

    .options {
      transform-origin: top;
      transition: 250ms transform;
      list-style: none;
      margin: 0 -0.5rem -0.5rem;
      padding: 0.5rem 0 0;
      position: absolute;
      width: 100%;
      transform: scaleY(0);

      li {
        border-top: 1px solid #999;
        padding: 0.5rem;
        background: #333;
        color: #fff;
        border-left: 1px solid #999;
        border-right: 1px solid #999;
        margin-left: -1px;
        margin-right: -1px;
        transition: 250ms background;

        &:hover {
          background: #444;
        }

        &:last-child {
          margin-bottom: 0;
          border-radius: 0 0 0.25rem 0.25rem;
          border-bottom: 1px solid #999;
        }
      }
    }
  }
</style>

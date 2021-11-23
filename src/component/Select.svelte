<script lang="ts">
  import Dropdown, { Option } from './Dropdown.svelte';

  export let options: Option[] = [];
  export let name: string;
  export let id = `${name}-${Math.round(Math.random() * 10000000)}`;
  export let label: string;
  export let value: string | number = '';
</script>

<div class="row">
  <label for={id}>{label}</label>
  <Dropdown {id} {name} {options} bind:value />
</div>

<style lang="scss">
  .row {
    width: 100%;
    display: flex;
    margin-bottom: 0.4rem;

    > label {
      width: 10rem;
      display: flex;
      align-items: center;
    }
  }
</style>

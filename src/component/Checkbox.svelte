<script lang="ts">
  export let label: string;
  export let name: string;
  export let value: boolean;
  export let id = `${name}-${Math.round(Math.random() * 10000000)}`;
</script>

<div class="row">
  <label for={id}>{label}</label>
  <input {id} {name} type="checkbox" bind:checked={value} />
</div>

<style lang="scss">
  .row {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.25rem;

    > label {
      width: 10rem;
    }

    > input {
      margin: 0;
    }
  }
</style>

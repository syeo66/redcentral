<script lang="ts">
  export let name: string;
  export let id = `${name}-${Math.round(Math.random() * 10000000)}`;
  export let label: string;
  export let value = '';
</script>

<div class="row">
  <label for={id}>{label}</label>
  <input {id} {name} bind:value />
</div>

<style lang="scss">
  .row {
    width: 100%;
    display: flex;
    margin-bottom: 0.25rem;

    > label {
      width: 10rem;
    }

    > input {
      min-width: 15rem;
    }
  }
</style>

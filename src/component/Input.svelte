<script lang="ts">
  export let name: string;
  export let id = `${name}-${Math.round(Math.random() * 10000000)}`;
  export let label: string;
  export let value: string | number = '';
</script>

<div class="row">
  <label for={id}>{label}</label>
  <input {id} {name} bind:value />
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

    > input {
      min-width: 15rem;
      margin: 0;
    }
  }
</style>

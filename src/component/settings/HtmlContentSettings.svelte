<script lang="ts">
  export let data: Record<string, unknown> = { content: '' };

  let value: string;

  $: data = { content: value };
</script>

<label>
  HTML Content
  <textarea bind:value />
</label>

<style lang="scss">
  textarea {
    margin-top: 0.4rem;
    width: 100%;
    height: 10em;
  }
</style>

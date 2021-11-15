<script>
  import Dropdown from './Dropdown.svelte';
  import Form from './Form.svelte';
  import Modal from './Modal.svelte';
</script>

<Modal>
  <Form>
    <h2>Widget</h2>
    <Dropdown />
  </Form>
</Modal>

<style lang="scss">
  h2 {
    margin-top: 0;
  }
</style>

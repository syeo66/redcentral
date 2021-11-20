<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Dropdown, { Option } from './Dropdown.svelte';
  import Form from './Form.svelte';
  import Modal from './Modal.svelte';

  const dispatch = createEventDispatcher();

  let options: Option[] = [
    {
      value: 1,
      label: 'Option 1',
    },
    {
      value: 2,
      label: 'Option 2',
    },
    {
      value: 3,
      label: 'Option 3',
    },
    {
      value: 4,
      label: 'Option 4',
    },
    {
      value: 5,
      label: 'Option 5',
    },
  ];

  const handleChange = (event: CustomEvent<Option>) => {
    console.log(event.detail);
  };

  const handleConfirm = () => dispatch('confirm');
  const handleCancel = () => dispatch('cancel');
</script>

<Modal>
  <Form on:cancel={handleCancel} on:confirm={handleConfirm}>
    <h2>Widget</h2>
    <Dropdown {options} on:change={handleChange} />
  </Form>
</Modal>

<style lang="scss">
  h2 {
    margin-top: 0;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import type { Option } from './Dropdown.svelte';

  import Form from './Form.svelte';
  import Modal from './Modal.svelte';
  import Select from './Select.svelte';

  const dispatch = createEventDispatcher();

  let value = 1;
  let options: Option[] = [
    {
      value: 'CryptoCharts',
      label: 'Crypto Charts',
    },
    {
      value: 'BitcoinPrice',
      label: 'Bitcoin Price',
    },
    {
      value: 'Debugger',
      label: 'Debugger',
    },
    {
      value: 'HtmlContent',
      label: 'HTML Content',
    },
    {
      value: 'ImageViewer',
      label: 'Image Viewer',
    },
  ];

  const handleConfirm = () => dispatch('confirm');
  const handleCancel = () => dispatch('cancel');
</script>

<Modal>
  <Form on:cancel={handleCancel} on:confirm={handleConfirm}>
    <h2>Widget</h2>
    <Select name="widgetType" label="Widget Type" {options} bind:value />
  </Form>
</Modal>

<style lang="scss">
  h2 {
    margin-top: 0;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  import Checkbox from './Checkbox.svelte';
  import Form from './Form.svelte';
  import Input from './Input.svelte';
  import Modal from './Modal.svelte';
  import type { Dashboard } from '../types';

  export let dashboard: Dashboard = { uuid: '', name: '', public: false, panels: [] };

  const dispatch = createEventDispatcher();

  const handleConfirm = () => dispatch('confirm');
  const handleCancel = () => dispatch('cancel');
</script>

<Modal>
  <Form on:cancel={handleCancel} on:confirm={handleConfirm}>
    <h2>Dashboard</h2>
    <Input label="Name" name="name" value={dashboard.name} />
    <Checkbox label="Is public" name="public" value={dashboard.public} />
  </Form>
</Modal>

<style lang="scss">
  h2 {
    margin-top: 0;
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte';

  import Form from './Form.svelte';
  import Modal from './Modal.svelte';

  const dispatch = createEventDispatcher();

  const handleConfirm = () => dispatch('confirm');
  const handleCancel = () => dispatch('cancel');
</script>

<Modal>
  <Form on:cancel={handleCancel} on:confirm={handleConfirm} />
</Modal>

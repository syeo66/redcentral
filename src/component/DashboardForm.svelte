<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import { doc, setDoc } from '@firebase/firestore';
  import type { User } from '@firebase/auth';

  import Checkbox from './Checkbox.svelte';
  import Form from './Form.svelte';
  import Input from './Input.svelte';
  import Modal from './Modal.svelte';
  import { db } from '../firebase';
  import type { Dashboard } from '../types';

  export let user: User;
  export let dashboard: Dashboard = { uuid: '', name: '', public: false, panels: [], position: 1 };

  const dispatch = createEventDispatcher();

  const handleConfirm = async () => {
    if (!user) {
      return;
    }

    const updateDashboard = { ...dashboard, uuid: dashboard.uuid || uuidv4() };
    setDoc(doc(db, 'users', user.uid, 'dashboards', updateDashboard.uuid), updateDashboard);

    dispatch('confirm');
  };

  const handleCancel = () => dispatch('cancel');
</script>

<Modal>
  <Form on:cancel={handleCancel} on:confirm={handleConfirm}>
    <h2>Dashboard</h2>
    <Input label="Name" name="name" bind:value={dashboard.name} />
    <Input label="Position" name="position" bind:value={dashboard.position} />
    <Checkbox label="Is public" name="public" bind:value={dashboard.public} />
  </Form>
</Modal>

<style lang="scss">
  h2 {
    margin-top: 0;
  }
</style>

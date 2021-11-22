<script lang="ts" context="module">
  const createPanel = <T extends WidgetType>(type: T): Panel => {
    switch (type) {
      case 'BitcoinPrice':
        return {
          component: type,
          uuid: uuidv4(),
          size: {
            columns: 1,
            rows: 1,
          },
          position: 0,
          settings: {},
        };
    }
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import { doc, updateDoc, arrayUnion } from '@firebase/firestore';
  import type { User } from '@firebase/auth';

  import type { Option } from './Dropdown.svelte';

  import Form from './Form.svelte';
  import Modal from './Modal.svelte';
  import Select from './Select.svelte';
  import { db } from '../firebase';
  import type { Panel, WidgetType, Dashboard } from '../types';

  export let user: User;
  export let dashboard: Dashboard;

  const dispatch = createEventDispatcher();

  let type: WidgetType | '' = '';
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

  const handleConfirm = async () => {
    if (!user || !type || !dashboard) {
      return;
    }

    const widget: Panel = createPanel(type);

    if (!widget) {
      return;
    }

    const dashboardRef = doc(db, 'users', user.uid, 'dashboards', dashboard.uuid);
    // Atomically add a new region to the "regions" array field.
    await updateDoc(dashboardRef, {
      panels: arrayUnion(widget),
    });

    dispatch('confirm');
  };
  const handleCancel = () => dispatch('cancel');
</script>

<Modal>
  <Form on:cancel={handleCancel} on:confirm={handleConfirm}>
    <h2>Widget</h2>
    <Select name="widgetType" label="Widget Type" {options} bind:value={type} />
  </Form>
</Modal>

<style lang="scss">
  h2 {
    margin-top: 0;
  }
</style>

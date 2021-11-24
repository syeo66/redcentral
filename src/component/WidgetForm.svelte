<script lang="ts" context="module">
  interface CreatePanelData {
    columns?: number;
    rows?: number;
    settings?: Record<string, string>;
  }

  const createPanel = <TData extends CreatePanelData>(
    type: WidgetType,
    { rows = 1, columns = 1, settings }: TData = {} as TData
  ): Panel => {
    const uuid = uuidv4();

    return {
      component: type,
      uuid,
      size: {
        columns,
        rows,
      },
      position: 0,
      settings,
    };
  };
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import { doc, updateDoc, arrayUnion } from '@firebase/firestore';
  import type { User } from '@firebase/auth';

  import type { Option } from './Dropdown.svelte';
  import type { Panel, WidgetType, Dashboard, PanelType } from '../types';

  import Form from './Form.svelte';
  import Input from './Input.svelte';
  import Modal from './Modal.svelte';
  import Select from './Select.svelte';

  import HtmlContentSettings from './settings/HtmlContentSettings.svelte';

  import { db } from '../firebase';

  export let user: User;
  export let dashboard: Dashboard;

  const dispatch = createEventDispatcher();

  let columns = 1;
  let rows = 1;
  let settings = {};
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

    const widget: Panel = createPanel(type, { rows, columns, settings });

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
    <Input name="columns" label="Columns" bind:value={columns} />
    <Input name="rows" label="Rows" bind:value={rows} />

    {#if type === 'HtmlContent'}
      <HtmlContentSettings bind:data={settings} />
    {/if}
  </Form>
</Modal>

<style lang="scss">
  h2 {
    margin-top: 0;
  }
</style>

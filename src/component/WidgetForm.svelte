<script lang="ts" context="module">
  interface CreatePanelData {
    columns: number;
    rows: number;
    settings?: Record<string, unknown>;
  }

  const createPanel = <TWidgetType extends WidgetType>(
    type: TWidgetType,
    data: CreatePanelData
  ): PanelType<WidgetType> => {
    const uuid = uuidv4();

    const { columns = 1, rows = 1, settings } = data;
    const baseObject = {
      uuid,
      size: {
        columns,
        rows,
      },
      position: 0,
    };

    switch (type) {
      case 'HtmlContent':
        return {
          ...baseObject,
          component: type,
          settings: settings as HtmlContentPanel['settings'],
        };

      case 'ImageViewer':
        return {
          ...baseObject,
          component: type,
          settings: settings as ImageViewerPanel['settings'],
        };
    }

    return { ...baseObject, component: type };
  };
</script>

<script lang="ts">
  import { createEventDispatcher, getContext } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  import { doc, updateDoc, arrayUnion } from '@firebase/firestore';

  import type { Option } from './Dropdown.svelte';
  import type { WidgetType, Dashboard, PanelType, HtmlContentPanel, ImageViewerPanel, UserContext } from '../types';

  import Form from './Form.svelte';
  import Input from './Input.svelte';
  import Modal from './Modal.svelte';
  import Select from './Select.svelte';

  import HtmlContentSettings from './settings/HtmlContentSettings.svelte';
  import ImageViewerSettings from './settings/ImageViewerSettings.svelte';

  import { db } from '../firebase';

  export let dashboard: Dashboard;

  const dispatch = createEventDispatcher();

  const { getUser } = getContext<UserContext>('user');

  let columns = 1;
  let rows = 1;
  let type: WidgetType;
  let settings: Record<string, unknown>;

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
      value: 'NasaImages',
      label: 'Nasa Images',
    },
    {
      value: 'ImageViewer',
      label: 'Image Viewer',
    },
  ];

  const handleConfirm = async () => {
    const user = getUser();

    if (!user || !type || !dashboard) {
      return;
    }

    const widget: PanelType<typeof type> = createPanel(type, { rows, columns, settings });

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

    {#if type === 'ImageViewer'}
      <ImageViewerSettings bind:data={settings} />
    {/if}
  </Form>
</Modal>

<style lang="scss">
  h2 {
    margin-top: 0;
  }
</style>

<script lang="ts">
  import { link } from 'svelte-routing';
  import { getContext } from 'svelte';
  import { signOut } from 'firebase/auth';

  import Icon from 'svelte-awesome';
  import { signOut as signOutIcon, globe, lock, cog, plusCircle } from 'svelte-awesome/icons';

  import Button from './Button.svelte';
  import DashboardForm from './DashboardForm.svelte';
  import { auth } from '../firebase';
  import type { Dashboard } from '../types';

  export let dashboards: Record<string, Dashboard> = {};
  export let id = '';
  export let isEditMode = false;

  const { getUser } = getContext('user');
  const emptyDashboard: Dashboard = { uuid: '', name: '', public: false, panels: [], position: 1 };

  let showConfiguration = false;
  let configureDashboard: Dashboard = { ...emptyDashboard };

  const handleCancel = () => {
    showConfiguration = false;
  };

  const handleConfirm = () => {
    showConfiguration = false;
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleDashboardEditClick = (dashboard: Dashboard) => (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    configureDashboard = { ...dashboard };
    showConfiguration = true;
  };

  const handleDashboardAddClick = () => {
    configureDashboard = { ...emptyDashboard };
    showConfiguration = true;
  };

  $: sortedDashboards = dashboards && Object.values(dashboards).sort((a, b) => a.position - b.position);
</script>

<nav>
  {#if getUser()}
    {#if dashboards}
      {#each sortedDashboards as dashboard}
        <a href={`/${dashboard.uuid}`} use:link class:active={id === dashboard.uuid}>
          <Icon data={dashboard.public ? globe : lock} />&nbsp;{dashboard.name}
          {#if isEditMode}
            <div class="icon" on:click={handleDashboardEditClick(dashboard)}><Icon data={cog} /></div>
          {/if}
        </a>
      {/each}
    {/if}

    {#if isEditMode}
      <div class="add-dashboard">
        <span on:click={handleDashboardAddClick}><Icon data={plusCircle} scale={2} /></span>
      </div>
    {/if}

    <Button on:click={handleLogout} style="margin-top:auto;">
      <Icon data={signOutIcon} />&nbsp;Logout
    </Button>
  {/if}

  {#if showConfiguration}
    <DashboardForm
      dashboard={configureDashboard}
      on:cancel={handleCancel}
      on:confirm={handleConfirm}
      user={getUser()}
    />
  {/if}
</nav>

<style lang="scss">
  nav {
    display: flex;
    flex-direction: column;

    background: #333;
    padding: 1rem;
    border-bottom: 1px solid #000;
    border-top: 1px solid #666;

    .add-dashboard {
      display: flex;
      height: 3rem;
      justify-content: flex-end;
      align-items: center;

      span {
        cursor: pointer;
      }
    }

    a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: 1px solid #666;
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
      background-color: #222;
      border-radius: 0.3rem;
      color: #eee;
      padding: 0.6rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      text-decoration: none;
      transition: background-color 250ms, box-shadow 250ms;
      cursor: pointer;
      margin-bottom: 0.3rem;

      .icon {
        margin-left: auto;
        height: 1rem;
        width: 1rem;
      }

      &.active {
        background-color: #333;
        border: 1px solid #000;
        border-bottom: 1px solid #666;
        border-right: 1px solid #666;
        box-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
      }

      &:hover {
        background-color: #2d2d2d;
        border: 1px solid #444;
        border-bottom: 1px solid #222;
        border-right: 1px solid #222;
        box-shadow: 0 0 5ms rgba(0, 0, 0, 0.3);
      }
    }

    @media screen and (min-width: 800px) {
      &:last-child {
        border-bottom: 0 transparent none;
      }
      grid-area: nav;
    }
  }
</style>

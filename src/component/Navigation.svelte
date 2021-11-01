<script lang="ts">
  import { link } from 'svelte-routing';
  import { signOut, User } from 'firebase/auth';

  import Icon from 'svelte-awesome';
  import { signOut as signOutIcon, globe, lock, cog } from 'svelte-awesome/icons';

  import Button from './Button.svelte';
  import { auth } from '../firebase';
  import type { Dashboard } from '../types';

  export let dashboards: Record<string, Dashboard> = {};
  export let id = '';
  export let isEditMode = false;
  export let user: User;

  const handleLogout = () => {
    signOut(auth);
  };

  const handleDashboardEditClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert('Dashboard editing is not implemented yet.');
  };
</script>

<nav>
  {#if user}
    {#if dashboards}
      {#each Object.entries(dashboards) as [key, dashboard]}
        <a href={`/${key}`} use:link class:active={id === key}>
          <Icon data={dashboard.public ? globe : lock} />&nbsp;{dashboard.name}
          {#if isEditMode}
            <div class="icon" on:click={handleDashboardEditClick}><Icon data={cog} /></div>
          {/if}
        </a>
      {/each}
    {/if}

    <Button on:click={handleLogout}><Icon data={signOutIcon} />&nbsp;Logout</Button>
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

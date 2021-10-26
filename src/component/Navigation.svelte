<script lang="ts">
  import { signOut, User } from 'firebase/auth';

  import Button from './Button.svelte';
  import { auth } from '../firebase';

  export let user: User;

  const handleLogout = () => {
    signOut(auth);
  };
</script>

<nav>
  {#if user}
    <a href="/" class="active">Home</a>
    <Button on:click={handleLogout}>Logout</Button>
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
      display: block;
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
      border-bottom: 0 transparent none;
      grid-area: nav;
    }
  }
</style>

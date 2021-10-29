<script>
  import Icon from 'svelte-awesome';
  import { google } from 'svelte-awesome/icons';
  import { signInWithPopup } from 'firebase/auth';

  import Button from './Button.svelte';
  import { auth, provider } from '../firebase';

  let error;

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      error = err;
    }
  };
</script>

<div>
  {#if error}
    <div>{JSON.stringify(error)}</div>
  {/if}
  <Button on:click={handleLogin}><Icon data={google} />&nbsp;Login with Google</Button>
</div>

<style lang="scss">
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
    margin: 0;
    width: 100%;
    height: 100%;

    @media screen and (min-width: 800px) {
      padding: 0;
      grid-area: main;
    }
  }
</style>

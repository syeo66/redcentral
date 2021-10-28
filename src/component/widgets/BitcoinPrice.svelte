<script lang="ts">
  import { useQuery } from '@sveltestack/svelte-query';

  const queryResult = useQuery('btcPrice', () => fetch('https://blockchain.info/ticker').then((res) => res.json()), {
    refetchInterval: 30000,
  });

  $: btcChf = $queryResult.data?.CHF?.last || 0;
  $: btcUsd = $queryResult.data?.USD?.last || 0;
  $: formattedPriceChf = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'CHF' }).format(btcChf);
  $: formattedPriceUsd = new Intl.NumberFormat('de-CH', { style: 'currency', currency: 'USD' }).format(btcUsd);
</script>

{#if $queryResult.isLoading}
  Loading...
{:else if $queryResult.error}
  <div>Could not load data.</div>
{:else}
  <div class="bitcoin-price">
    <img alt="BTC" src="https://bcb.red0.ch/ccicons/transparent/BTC.png" />
    <div class="prices">
      <div class="price">{formattedPriceChf}</div>
      <div class="price">{formattedPriceUsd}</div>
    </div>
  </div>
{/if}

<style lang="scss">
  .bitcoin-price {
    height: 100%;
    padding: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .price {
      text-align: right;
      font-size: 1.2rem;
    }

    > img {
      margin-right: 0.5rem;
      width: 2.4rem;
    }

    @media screen and (min-width: 800px) {
      padding: 0 0.7rem;
    }
  }
</style>

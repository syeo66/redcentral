<script lang="ts">
  export let count = 0;
  export let max: number;

  $: isLeftActive = count > 0;
  $: isRightActive = count < max - 1;
</script>

<div class="prev-next">
  <div
    class:active={isLeftActive}
    on:click={() => {
      count = Math.max(0, count - 1);
    }}
  >
    &lt;
  </div>
  <div
    class:active={isRightActive}
    on:click={() => {
      count = Math.min(max - 1, count + 1);
    }}
  >
    &gt;
  </div>
</div>

<style lang="scss">
  .prev-next {
    position: absolute;
    color: rgba(0, 0, 0, 0.3);
    width: 2em;
    height: 1em;
    display: flex;
    justify-content: space-evenly;
    top: 0.2rem;
    right: 0.2rem;
    font-size: 25px;
    align-items: flex-start;
    text-shadow: rgba(255, 255, 255, 0.05);

    .active {
      color: black;
    }

    > div {
      cursor: pointer;
      &:hover {
        color: #666;
      }
    }
  }
</style>

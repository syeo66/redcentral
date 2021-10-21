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
    width: 2em;
    height: 1em;
    display: flex;
    justify-content: space-evenly;
    top: 0.2rem;
    right: 0.2rem;
    font-size: 25px;
    align-items: flex-start;

    .active {
      color: black;
      text-shadow: 0 0 1px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5),
        0 0 20px rgba(255, 255, 255, 0.4);
    }

    > div {
      cursor: pointer;
      color: rgba(0, 0, 0, 0.2);
      text-shadow: none;
      transition: color 250ms, text-shadow 250ms;

      &:hover {
        color: #666;
      }
    }
  }
</style>

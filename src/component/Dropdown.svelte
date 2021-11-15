<script lang="ts">
  let options = [
    {
      value: '1',
      label: 'Option 1',
    },
    {
      value: '2',
      label: 'Option 2',
    },
    {
      value: '3',
      label: 'Option 3',
    },
    {
      value: '4',
      label: 'Option 4',
    },
  ];

  let selected = options?.[0]?.value;
  let active = false;

  $: selectedOption = options.find((option) => option.value === selected);

  const handleToggle = () => {
    active = !active;
  };

  const handleClick = (option: string) => {
    selected = option;
  };
</script>

<div class="dropdown" class:active on:click={handleToggle}>
  <div class="selected">{selectedOption.label}</div>
  <ul class="options">
    {#each options as option}
      <li class="option" on:click={() => handleClick(option.value)}>
        {option.label}
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .dropdown {
    position: relative;
    display: block;
    border: 1px solid #999;
    border-radius: 0.25rem;
    padding: 0.5rem;
    background: #333;
    cursor: pointer;

    &.active {
      .options {
        transform: scaleY(1);
      }
    }

    .options {
      transform-origin: top;
      transition: 250ms transform;
      list-style: none;
      margin: 0 -0.5rem -0.5rem;
      padding: 0.5rem 0 0;
      position: absolute;
      width: 100%;
      transform: scaleY(0);

      li {
        border-top: 1px solid #999;
        padding: 0.5rem;
        background: #333;
        color: #fff;
        border-left: 1px solid #999;
        border-right: 1px solid #999;
        margin-left: -1px;
        margin-right: -1px;
        transition: 250ms background;

        &:hover {
          background: #444;
        }

        &:last-child {
          margin-bottom: 0;
          border-radius: 0 0 0.25rem 0.25rem;
          border-bottom: 1px solid #999;
        }
      }
    }
  }
</style>

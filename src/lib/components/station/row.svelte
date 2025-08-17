<script lang="ts">
  export let first = false;
</script>

{#if !first}
  <div class="my-2 h-[1px] w-full bg-white"></div>
{/if}
<div class="flex w-full flex-nowrap items-center">
  <div class="flex flex-1 justify-start">
    <slot name="left" />
  </div>
  <slot />
  <div class="flex flex-1 justify-end">
    <slot name="right" />
  </div>
</div>

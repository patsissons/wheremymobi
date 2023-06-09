<script lang="ts">
  export let first = false;
</script>

{#if !first}
  <div class="w-full h-[1px] bg-white my-2" />
{/if}
<div class="flex flex-nowrap items-center w-full">
  <div class="flex-1 flex justify-start">
    <slot name="left" />
  </div>
  <slot />
  <div class="flex-1 flex justify-end">
    <slot name="right" />
  </div>
</div>

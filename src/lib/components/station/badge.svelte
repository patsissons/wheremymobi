<script lang="ts">
  export let status = false;
</script>

<p
  class="rounded-sm p-1.5 leading-none"
  class:bg-green-500={status}
  class:bg-orange-500={!status}
>
  <slot />
</p>

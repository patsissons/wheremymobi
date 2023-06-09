<script lang="ts">
  export let onUpdate: () => unknown;
  export let interval = 1000;

  let timeout: NodeJS.Timeout;

  $: {
    if (timeout) clearInterval(timeout);
    timeout = setInterval(onUpdate, interval);
  }
</script>

<slot />

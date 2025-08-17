<script lang="ts">
  import { RefreshIcon } from '$lib/icons';

  export let refreshing = false;

  let className = '';
  export { className as class };
</script>

<button
  class="flex w-full items-center justify-center gap-1 rounded-md border border-fuchsia-800 bg-fuchsia-500 px-2 py-1 leading-none shadow-lg hover:bg-fuchsia-600 disabled:border-slate-800 disabled:bg-slate-500 {className}"
  type="button"
  disabled={refreshing}
  {...$$restProps}
  on:click
>
  <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
  <RefreshIcon size="1.5em" />
</button>

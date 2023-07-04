<script lang="ts">
  import { RefreshIcon } from '$lib/icons';

  export let refreshing = false;

  let className = '';
  export { className as class };
</script>

<button
  class="bg-fuchsia-500 hover:bg-fuchsia-600 disabled:bg-slate-500 disabled:border-slate-800 px-2 py-1 rounded-md border border-fuchsia-800 leading-none shadow-lg flex items-center gap-1 {className}"
  type="button"
  disabled={refreshing}
  {...$$restProps}
  on:click
>
  <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
  <RefreshIcon size="1.5em" />
</button>

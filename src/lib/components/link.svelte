<script lang="ts">
  export let href: string;
  export let title = '';
  export let external = false;
  export let plain = false;

  let className = '';
  export { className as class };

  $: externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
</script>

<a
  class="text-[--link-color] hover:text-[--link-color-hover] {className}"
  class:underline={!plain}
  {href}
  {title}
  aria-label={title}
  {...externalProps}
  {...$$restProps}
>
  <slot />
</a>

<style lang="postcss">
  @reference "tailwindcss";
  :root {
    --link-color: theme('colors.white');
    --link-color-hover: theme('colors.slate.200');
  }
</style>

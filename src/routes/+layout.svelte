<script lang="ts">
  import '$lib/styles/global.scss';
</script>

<div class="fullscreen flex flex-col">
  <a
    class="flex items-center justify-center w-full h-20 bg-[#007fb3]"
    href="https://www.mobibikes.ca/en#the-map"
    target="_blank"
    rel="noreferrer"
  >
    <p class="text-3xl text-white uppercase font-bold">wheremymobi</p>
  </a>
  <div class="w-full h-full">
    <slot />
  </div>
</div>

<style lang="scss">
  .fullscreen {
    width: 100dvw;
    height: 100dvh;
  }
</style>

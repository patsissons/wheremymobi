<script lang="ts">
  import '$lib/styles/global.css';
  import '$lib/utils/dayjs';
  import Metadata from './metadata.svelte';
  import Summary from './summary.svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<main class="fullscreen flex flex-col min-w-[320px]">
  <section id="header" class="flex flex-col items-center gap-2 w-full bg-mobi">
    <div class="flex items-center gap-2 w-full h-20">
      <div class="flex-1 w-full h-full">
        <div class="flex items-center justify-start h-full px-2">
          <Summary
            stations={data.stations}
            bikes={data.bikes}
            timestamp={data.metadata.timestamp}
          />
        </div>
      </div>
      <div class="flex items-center justify-center">
        <p class="text-md xs:text-xl sm:text-3xl uppercase font-bold">
          wheremy<a
            class="underline"
            href="https://www.mobibikes.ca/en#the-map"
            target="_blank"
            rel="noreferrer"
          >
            mobi
          </a>
        </p>
      </div>
      <div class="flex-1 w-full h-full">
        <div class="flex items-center justify-end h-full px-2">
          <Metadata metadata={data.metadata} />
        </div>
      </div>
    </div>
  </section>
  <section id="content" class="w-full h-full">
    <slot />
  </section>
</main>

<style>
  .fullscreen {
    height: 100dvh;
    width: 100dvw;
  }
</style>

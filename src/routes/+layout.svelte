<script lang="ts">
  import '$lib/styles/global.css';
  import '$lib/utils/dayjs';
  import Metadata from './metadata.svelte';
  import Summary from './summary.svelte';
  import type { LayoutData } from './$types';
  import { GithubIcon, TwitterIcon } from '$lib/icons';
  import Link from '$lib/components/link.svelte';
  import { invalidateAll } from '$app/navigation';
  import RefreshButton from '$lib/components/refresh-button.svelte';

  export let data: LayoutData;

  let refreshing = false;

  async function handleRefresh() {
    try {
      refreshing = true;

      await invalidateAll();
    } catch (error) {
      console.log('Refresh error', error);
    } finally {
      refreshing = false;
    }
  }
</script>

<main class="fullscreen flex flex-col min-w-[320px]">
  <section id="header" class="w-full bg-mobi">
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
        <div class="flex flex-col items-center gap-1">
          <p class="text-md xs:text-xl sm:text-3xl uppercase font-bold">
            wheremy<Link href="https://www.mobibikes.ca/en#the-map" external>
              mobi
            </Link>
          </p>
          <RefreshButton
            class="text-sm"
            {refreshing}
            on:click={handleRefresh}
          />
        </div>
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
  <section id="footer" class="w-full bg-mobi">
    <div
      class="flex flex-col items-center justify-center gap-2 w-full font-mono text-xs px-4 py-2"
    >
      <p class="text-center">
        Built with <Link href="https://kit.svelte.dev/" external>SvelteKit</Link
        >
        hosted on <Link href="https://vercel.com/" external>Vercel</Link>
        using <Link href="https://github.com/MobilityData/gbfs" external
          >GBFS</Link
        >
        <Link href="https://vancouver-gbfs.smoove.pro/gbfs/2/gbfs.json" external
          >{'Smoove data'}</Link
        >.
      </p>
      <div class="flex items-center gap-1 text-lg">
        <Link
          href="https://github.com/patsissons/wheremymobi"
          title="Source code on GitHub"
          external
        >
          <GithubIcon />
        </Link>
        <Link
          href="https://twitter.com/wheremymobi"
          title="@wheremymobi on Twitter"
          external
        >
          <TwitterIcon />
        </Link>
      </div>
    </div>
  </section>
</main>

<style>
  .fullscreen {
    height: 100dvh;
    width: 100dvw;
  }
</style>

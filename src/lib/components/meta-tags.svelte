<script lang="ts">
  export let siteName = 'wheremymobi';
  export let title = siteName;
  export let author = 'Pat Sissons';
  export let description = 'Hassle free mobi bikes.';
  export let url = 'https://wheremymobi.com';
  export let twitterHandle = '@wheremymobi';
  export let image = 'images/twitter-card.png';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="author" content={author} />
  <meta name="description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:image" content="{url}/{image}" />
  <meta property="og:description" content={description} />
  <meta
    name="twitter:card"
    content={image ? 'summary_large_image' : 'summary'}
  />
  <meta name="twitter:site" content={twitterHandle} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="{url}/{image}" />
</svelte:head>

## Where My Mobi?

Better visibility for tracking [mobi bike stations](https://wheremymobi.com/)

## Data

Data for [mobi bike stations](https://www.mobibikes.ca/en#the-map) sourced from [Fifteen](https://gbfs.kappa.fifteen.eu/gbfs/2.2/mobi/en/station_status.json) via [GBFS](https://github.com/MobilityData/gbfs) (see [feeds](https://gbfs.kappa.fifteen.eu/gbfs/2.2/mobi/en/gbfs.json) for all available endpoints).

## svelte

### Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

### Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
